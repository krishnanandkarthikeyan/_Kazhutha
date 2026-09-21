/* Fair AI: this module accepts only a redacted view, never the actual deal. */
import {legal, deck, winner, random, play, resolve, view} from './engine.js';

export function infer(v) {
  if ('hands' in v || 'seed' in v) throw Error('AI requires a public view.');
  const visible = new Set([...v.hand, ...v.discarded, ...v.trick.map(x => x.card), ...v.known.flat()].map(c => c.id));
  const unknown = deck().filter(c => !visible.has(c.id));
  return v.players.map((p, seat) => ({
    seat, known: seat === v.viewer ? v.hand : v.known[seat],
    possible: seat === v.viewer ? v.hand : [...v.known[seat], ...unknown.filter(c => !v.voids[seat].includes(c.suit))],
    impossible: deck().filter(c => seat === v.viewer ? !v.hand.some(h => h.id === c.id) :
      !v.known[seat].some(k => k.id === c.id) && (visible.has(c.id) || v.voids[seat].includes(c.suit))),
  }));
}

function heuristic(v, c, fullMemory = false) {
  const own = v.hand, opponents = v.activePlayers.filter(p => p !== v.viewer);
  const suitCount = own.filter(x => x.suit === c.suit).length;
  const recent = (v.history || []).filter(x => x.round >= v.round - 2);
  const voidFor = p => fullMemory ? v.voids[p] : v.voids[p].filter(s => recent.some(x => x.player === p && x.leadSuit === s && x.card.suit !== s));
  let risk = -c.rank * .22 + suitCount * .2;
  if (!v.leadSuit) {
    const voids = opponents.filter(p => voidFor(p).includes(c.suit)).length;
    const higherKnown = opponents.some(p => v.known[p].some(k => k.suit === c.suit && k.rank > c.rank));
    risk += c.rank * (voids && v.round > 1 ? 1.1 : .08) - suitCount * .7 - (higherKnown ? 2 : 0);
    for (const p of opponents) if (v.counts[p] <= 2) {
      // Leading a suit they cannot follow can prevent them finishing a clean trick.
      risk += voidFor(p).includes(c.suit) ? -.6 : .5;
    }
  } else {
    const cut = c.suit !== v.leadSuit && v.round > 1;
    const trump = v.trumpSuit || (cut && v.rules.firstTrump ? c.suit : null);
    const w = winner([...v.trick, {player: v.viewer, card:c}], v.leadSuit, trump, v.rules);
    if (w.player === v.viewer && v.round > 1) risk += cut ? 9 : c.rank * .3;
    else risk -= c.rank * .55;
    if (cut && v.rules.collectCutter) risk += 12;
  }
  if (suitCount === 1) risk -= 1.8;
  return risk;
}

function sampleDeal(v, rng, knowledge) {
  const hands = v.players.map((_, p) => p === v.viewer ? [...v.hand] : [...v.known[p]]);
  const used = new Set([...hands.flat(), ...v.discarded, ...v.trick.map(x=>x.card)].map(c=>c.id));
  const rest = deck().filter(c=>!used.has(c.id));
  const need = hands.map((h,p)=>v.counts[p]-h.length);
  if (need.some(n=>n<0) || need.reduce((a,b)=>a+b,0)!==rest.length) return null;
  const possible = knowledge.map(k=>new Set(k.possible.map(c=>c.id)));
  // Most-constrained cards first; retry independently if a capacity choice gets stuck.
  const cards = rest.map(c=>({c, tie:rng(), seats:need.map((n,p)=>n>0&&possible[p].has(c.id)?p:-1).filter(p=>p>=0)}))
    .sort((a,b)=>a.seats.length-b.seats.length || a.tie-b.tie);
  for (const {c,seats} of cards) {
    const choices = seats.filter(p=>need[p]>0);
    const total = choices.reduce((n,p)=>n+need[p],0);
    if (!total) return null;
    let r=rng()*total, seat=choices[choices.length-1];
    for (const p of choices) { r-=need[p]; if(r<0){seat=p;break;} }
    hands[seat].push(c); need[seat]--;
  }
  return hands;
}

function rollout(v, hands, card, depth) {
  // These are sampled hypothetical cards consistent with public observations.
  let g={...structuredClone(v), hands:structuredClone(hands), history:[], repetitions:{}, leader:v.currentPlayer};
  g=play(g,v.viewer,card.id);
  const endRound=v.round+depth;
  let steps=0;
  while(g.status==='playing' && g.round<endRound && steps++<24) {
    if(g.result){g=resolve(g);continue;}
    const p=g.currentPlayer, pv=view(g,p);
    const observed=(v.history||[]).filter(x=>x.player===p);
    const tendency=observed.length>=3 ? observed.reduce((n,x)=>n+x.card.rank,0)/observed.length-8 : 0;
    const c=legal(pv).map(c=>({c,s:heuristic(pv,c,true)-c.rank*tendency*.07})).sort((a,b)=>a.s-b.s)[0].c;
    g=play(g,p,c.id);
  }
  const me=v.viewer;
  if(g.safePlayers.includes(me)) return -65;
  if(g.status==='finished') return g.loser===me?100:-65;
  const remaining=g.hands[me];
  let score=(remaining.length-v.hand.length)*8;
  for(const p of v.activePlayers) if(p!==me) {
    if(g.safePlayers.includes(p)) score+=v.counts[p]<=3?10:4;
    else if(v.counts[p]<=3) score-=(g.hands[p].length-v.counts[p])*1.2;
  }
  const suits=new Set(remaining.map(c=>c.suit));
  score+=suits.size*1.1;
  if(g.currentPlayer===me) for(const s of suits) {
    const low=Math.min(...remaining.filter(c=>c.suit===s).map(c=>c.rank));
    score+=g.activePlayers.filter(p=>p!==me&&g.voids[p].includes(s)).length*low*.1;
  }
  return score;
}

export function ai(v, difficulty='Medium', seed) {
  if ('hands' in v || 'seed' in v) throw Error('AI requires a public view.');
  const rng=seed===undefined?Math.random:random(seed), moves=legal(v);
  if(!moves.length) throw Error('No legal moves.');
  if(difficulty==='Easy' && rng()<.8) return {card:moves[Math.floor(rng()*moves.length)],reason:'An immediate legal choice; earlier plays may be forgotten.'};
  const hard=difficulty==='Hard'||difficulty==='Expert';
  let samples=[];
  if(hard){
    const knowledge=infer(v), count=difficulty==='Expert'?28:16;
    for(let i=0;i<count*5 && samples.length<count;i++) {const h=sampleDeal(v,rng,knowledge);if(h)samples.push(h);}
  }
  const ranked=moves.map(card=>{
    let risk=heuristic(v,card,hard);
    if(samples.length) risk=risk*.3+samples.reduce((sum,h)=>sum+rollout(v,h,card,2),0)/samples.length;
    return {card,risk,reason:hard?`Evaluated ${samples.length} possible deals and the next two tricks using public cards, void suits and hand counts.`:'Consider the current pile, recent void suits, and retain a useful low card.'};
  }).sort((a,b)=>a.risk-b.risk);
  const tolerance=hard?.65:2.2;
  const close=ranked.filter(x=>x.risk<=ranked[0].risk+tolerance);
  return close[Math.floor(rng()*close.length)];
}
