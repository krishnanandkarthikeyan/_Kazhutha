var m5 = ["S", "H", "C", "D"],
    ei = {
        S: "\u2660",
        H: "\u2665",
        C: "\u2663",
        D: "\u2666"
    },
    po = t => ({
        11: "J",
        12: "Q",
        13: "K",
        14: "A"
    })[t] || String(t),
    nh = t => `${po(t.rank)}${ei[t.suit]}`,
    Lc = {
        name: "Classic Kerala",
        aceStart: !0,
        firstTrump: !1,
        cutEnds: !0,
        trumpWins: !1,
        forceTrump: !1,
        winnerLeads: !0,
        collectCutter: !1,
        allow2: !0,
        allow3: !0
    },
    wb = {
        ...Lc,
        name: "Trump-on-First-Vettu",
        firstTrump: !0,
        cutEnds: !1,
        trumpWins: !0,
        forceTrump: !0
    };

function Ab(t) {
    let e = t >>> 0;
    return () => {
        e += 1831565813;
        let n = e;
        return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296
    }
}

function Lb() {
    return m5.flatMap(t => Array.from({
        length: 13
    }, (e, n) => ({
        id: `${t}${n+2}`,
        rank: n + 2,
        suit: t
    })))
}

function R2(t, e = Lc, n = Date.now(), shuffleRandom = null) {
    if (t.some(p => p.type === "human" && (typeof p.name !== "string" || !p.name.trim()))) throw Error("Enter your name to continue");
    if (t.length < 2 || t.length > 6) throw Error("Choose 2\u20136 players.");
    if (t.length === 2 && !e.allow2 || t.length === 3 && !e.allow3) throw Error("This player count is disabled by your family rules.");
    let a = shuffleRandom || Ab(n),
        i = Lb();
    for (let o = 51; o > 0; o--) {
        let l = Math.floor(a() * (o + 1));
        [i[o], i[l]] = [i[l], i[o]]
    }
    let r = t.map(() => []);
    i.forEach((o, l) => r[l % t.length].push(o));
    let s = e.aceStart ? r.findIndex(o => o.some(l => l.id === "S14")) : Math.floor(a() * t.length);
    return {
        id: `${n}-${Math.floor(a()*1e8)}`,
        seed: n,
        players: t.map((o, l) => ({
            ...o,
            id: l
        })),
        hands: r,
        rules: {
            ...e
        },
        currentPlayer: s,
        leader: s,
        activePlayers: t.map((o, l) => l),
        safePlayers: [],
        trick: [],
        leadSuit: null,
        trumpSuit: null,
        discarded: [],
        history: [],
        voids: t.map(() => []),
        known: t.map(() => []),
        opening: !0,
        round: 1,
        moves: 0,
        status: "playing",
        loser: null,
        result: null,
        playedCounts: t.map(() => 0),
        vettuCounts: t.map(() => 0),
        repetitions: {},
        lastEvent: {
            type: "start",
            text: "The Ace of Spades holder opens the table and may play any card."
        }
    }
}

function ah(t, e = t.currentPlayer) {
    let n = t.hands ? t.hands[e] : t.hand;
    if (t.status !== "playing" || t.result || e !== t.currentPlayer) return [];
    if (t.opening && t.rules.aceStart) return n.some(a => a.id === "S14") ? n : [];
    if (t.leadSuit) {
        let a = n.filter(i => i.suit === t.leadSuit);
        if (a.length) return a;
        if (t.round > 1 && t.rules.forceTrump && t.trumpSuit) {
            let i = n.filter(r => r.suit === t.trumpSuit);
            if (i.length) return i
        }
    }
    return n
}

function Ex(t, e, n, a) {
    let i = a.trumpWins && n ? t.filter(r => r.card.suit === n) : [];
    return (i.length ? i : t.filter(r => r.card.suit === e)).reduce((r, s) => !r || s.card.rank > r.card.rank ? s : r, null)
}
var Cb = (t, e, n = []) => {
    for (let a = 1; a <= t.players.length; a++) {
        let i = (e + a) % t.players.length;
        if (t.activePlayers.includes(i) && !n.includes(i)) return i
    }
    return -1
};

function Tb(t, e, n) {
    if (t.status !== "playing" || t.result) throw Error("Wait for the next trick.");
    if (e !== t.currentPlayer) throw Error("It is not your turn.");
    if (!ah(t, e).some(o => o.id === n)) throw Error("You must follow suit when you can.");
    let a = structuredClone(t),
        i = a.hands[e],
        r = i.splice(i.findIndex(o => o.id === n), 1)[0],
        s = !!a.leadSuit && r.suit !== a.leadSuit,
        u = s && a.round > 1;
    if (s && (a.voids[e].includes(a.leadSuit) || a.voids[e].push(a.leadSuit)), u && (a.rules.firstTrump && !a.trumpSuit && (a.trumpSuit = r.suit), a.vettuCounts[e]++), a.leadSuit || (a.leadSuit = r.suit), a.known[e] = a.known[e].filter(o => o.id !== n), a.opening = !1, a.trick.push({
            player: e,
            card: r,
            cut: u
        }), a.history.push({
            player: e,
            card: r,
            cut: u,
            round: a.round,
            leadSuit: a.leadSuit
        }), a.moves++, a.playedCounts[e]++, a.lastEvent = {
            type: u ? "vettu" : "play",
            player: e,
            text: u ? `${a.players[e].name} plays Vettu!` : `${a.players[e].name} plays ${nh(r)}`
        }, u && a.rules.cutEnds || a.trick.length === a.activePlayers.length) {
        let o = Ex(a.trick, a.leadSuit, a.trumpSuit, a.rules),
            l = a.trick.some(d => d.cut),
            u = a.trick.find(d => d.cut)?.player,
            f = l ? a.rules.collectCutter ? u : o.player : null;
        f === null && a.activePlayers.every(d => a.hands[d].length === 0) && (f = o.player), a.result = {
            winner: o.player,
            collector: f,
            cut: l,
            cards: a.trick.map(d => d.card)
        }
    } else a.currentPlayer = Cb(a, e, a.trick.map(o => o.player));
    return a
}

function I2(t) {
    if (!t.result) throw Error("The trick is not complete.");
    let e = structuredClone(t),
        n = e.result,
        a = e.trick[e.trick.length - 1].player;
    n.collector !== null ? (e.hands[n.collector].push(...n.cards), e.known[n.collector].push(...n.cards), e.voids[n.collector] = e.voids[n.collector].filter(o => !n.cards.some(l => l.suit === o))) : e.discarded.push(...n.cards);
    let i = e.activePlayers.filter(o => !e.hands[o].length);
    if (e.safePlayers.push(...i), e.activePlayers = e.activePlayers.filter(o => e.hands[o].length), e.lastEvent = {
            type: n.collector !== null ? "collect" : "clear",
            player: n.collector ?? n.winner,
            safe: i,
            text: n.collector !== null ? `${e.players[n.collector].name} collects ${n.cards.length} cards.` : `${e.players[n.winner].name} takes the lead. The pile is out.`
        }, e.trick = [], e.leadSuit = null, e.result = null, e.round++, e.activePlayers.length === 1) return e.loser = e.activePlayers[0], e.status = "finished", e.currentPlayer = e.loser, e.lastEvent = {
        type: "finish",
        player: e.loser,
        text: `${e.players[e.loser].name} is the Kazhutha!`
    }, e;
    let r = e.rules.winnerLeads ? n.collector ?? n.winner : Cb(e, a);
    e.activePlayers.includes(r) || (r = Cb(e, r)), e.currentPlayer = r, e.leader = r;
    let s = e.hands.map(o => o.map(l => l.id).sort().join(",")).join("|") + `:${r}:${e.trumpSuit}`;
    return e.repetitions[s] = (e.repetitions[s] || 0) + 1, (e.repetitions[s] >= 3 || e.moves >= 12e3) && (e.status = "stalemate", e.lastEvent = {
        type: "stalemate",
        text: "The same position repeated. Redeal to keep the game moving; no loss is recorded."
    }), e
}

function Eb(t, e) {
    return {
        id: t.id,
        players: t.players.map(n => ({
            id: n.id,
            name: n.name,
            type: n.type
        })),
        hand: structuredClone(t.hands[e]),
        counts: t.hands.map(n => n.length),
        currentPlayer: t.currentPlayer,
        activePlayers: [...t.activePlayers],
        safePlayers: [...t.safePlayers],
        rules: {
            ...t.rules
        },
        trick: structuredClone(t.trick),
        leadSuit: t.leadSuit,
        trumpSuit: t.trumpSuit,
        discarded: structuredClone(t.discarded),
        history: structuredClone(t.history),
        voids: structuredClone(t.voids),
        known: structuredClone(t.known),
        opening: t.opening,
        round: t.round,
        moves: t.moves,
        status: t.status,
        loser: t.loser,
        result: structuredClone(t.result),
        lastEvent: structuredClone(t.lastEvent),
        playedCounts: [...t.playedCounts],
        vettuCounts: [...t.vettuCounts],
        viewer: e
    }
}
export {R2 as create, ah as legal, Tb as play, I2 as resolve, Eb as view, Lc as classic, wb as trump, Lb as deck, Ex as winner, Ab as random};
