import {randomBytes, randomInt} from 'node:crypto';
import * as engine from './engine.js';
import {ai} from './ai.js';
export const fail=(message,status=400)=>Object.assign(new Error(message),{status});
const hex=n=>randomBytes(n).toString('hex').toUpperCase();
export function nameOf(name) {
  if(typeof name!=='string'||!name.trim()) throw fail('Enter your name to continue');
  return name.trim().replace(/[\u0000-\u001f\u007f]/g,'').slice(0,24) || (()=>{throw fail('Enter your name to continue')})();
}
export class Room {
  constructor(options,now=Date.now) {
    if(!Number.isInteger(options.count)||options.count<2||options.count>6)throw fail('Choose 2 to 6 players.');
    this.now=now; this.code=options.code; this.hostSeat=0;
    this.rules=options.rules==='trump'?engine.trump:engine.classic;
    this.difficulty=['Easy','Medium','Hard','Expert'].includes(options.difficulty)?options.difficulty:'Medium';
    this.seats=Array.from({length:options.count},(_,i)=>({name:i?'Open seat':nameOf(options.name),type:i?'open':'human'}));
    this.members=[{seat:0,token:hex(24),lastSeen:now()}];
    this.game=null;this.chat=[];this.nextStep=0;this.revision=0;this.lastActive=now();this.receipts={};
  }
  snapshot(m,token=false) {
    return {code:this.code,seat:m.seat,...(token?{token:m.token}:{}),hostSeat:this.hostSeat,revision:this.revision,
      lobby:{seats:this.seats.map((s,i)=>({...s,connected:this.members.some(p=>p.seat===i&&this.now()-p.lastSeen<15000)}))},
      chat:this.chat,game:this.game?engine.view(this.game,m.seat):null};
  }
  member(token){const m=this.members.find(p=>p.token===token);if(!m)throw fail('Your seat has expired. Join a new room.',403);return m;}
  handle(r) {
    if(r.code!==this.code)throw fail('Room not found.',404);
    const receiptKey=r.token+':'+r.requestId;
    if(r.requestId&&this.receipts[receiptKey])return structuredClone(this.receipts[receiptKey]);
    this.lastActive=this.now();
    let m;
    if(r.op==='join') {
      m=r.token?this.member(r.token):null;
      if(!m){
        const name=nameOf(r.name);
        if(this.game)throw fail('This game has already started.',409);
        const seat=this.seats.findIndex(s=>s.type==='open');if(seat<0)throw fail('This room is full.',409);
        m={seat,token:hex(24),lastSeen:this.now()};this.members.push(m);this.seats[seat]={name,type:'human'};this.revision++;
      }
    }else m=this.member(r.token);
    m.lastSeen=this.now();
    switch(r.op){
      case 'poll':case 'join':break;
      case 'start':case 'rematch':
        if(m.seat!==this.hostSeat)throw fail('Only the host can start the game.',403);
        if(this.game&&this.game.status==='playing')throw fail('The game has already started.',409);
        if(r.op==='start'&&this.game)throw fail('Use Rematch to start another game.',409);
        if(r.op==='rematch'&&r.expectedGameId!==this.game?.id)throw fail('The table changed. Refresh before starting.',409);
        this.seats=this.seats.map((s,i)=>s.type==='open'?{name:'AI '+(i+1),type:'ai'}:s);
        this.game=engine.create(this.seats,this.rules,0,()=>randomInt(0,2**32)/2**32);
        this.game.id=hex(24);delete this.game.seed;this.nextStep=this.now()+850;this.revision++;break;
      case 'play':
        if(!this.game||r.expectedGameId!==this.game.id||r.expectedMoves!==this.game.moves)throw fail('The table changed. Check your hand and play again.',409);
        if(this.game.players[m.seat].type!=='human')throw fail('This seat is no longer active.',403);
        this.game=engine.play(this.game,m.seat,r.card);this.nextStep=this.now()+(this.game.result?1200:700);this.revision++;break;
      case 'chat':{
        const text=typeof r.text==='string'?r.text.trim().slice(0,180):'';if(!text)throw fail('Enter a message.');
        if(m.lastChat&&this.now()-m.lastChat<700)throw fail('Please wait a moment.');m.lastChat=this.now();
        this.chat.push({id:hex(8),seat:m.seat,name:this.seats[m.seat].name,text,time:this.now()});this.chat=this.chat.slice(-60);this.revision++;break;}
      case 'replace':{
        if(m.seat!==this.hostSeat)throw fail('Only the host can replace a disconnected player.',403);
        const guest=this.members.find(p=>p.seat===r.seat);
        if(!guest||guest===m)throw fail('Invalid seat.');
        if(this.now()-guest.lastSeen<30000)throw fail('This player is still connected. Wait 30 seconds.');
        this.remove(guest);break;}
      case 'leave':this.remove(m);break;
      default:throw fail('Unknown room action.');
    }
    const out=r.op==='leave'?{ok:true,closed:!this.members.length}:this.snapshot(m,r.op==='join');
    if(r.requestId){this.receipts[receiptKey]=structuredClone(out);const keys=Object.keys(this.receipts);if(keys.length>160)delete this.receipts[keys[0]];}
    return out;
  }
  remove(m){
    this.members=this.members.filter(p=>p!==m);
    // Mid-game seats keep their cards; an explicitly labelled bot completes them.
    // Human membership/token is removed immediately, preventing a ghost/rejoin.
    this.seats[m.seat]=this.game?{name:'AI '+(m.seat+1),type:'ai'}:{name:'Open seat',type:'open'};
    if(this.game)this.game.players[m.seat]={...this.game.players[m.seat],...this.seats[m.seat]};
    if(this.hostSeat===m.seat)this.hostSeat=this.members[0]?.seat??-1;
    this.revision++;
  }
  tick(){
    if(!this.members.length||!this.game||this.game.status!=='playing'||this.now()<this.nextStep)return false;
    if(this.game.result)this.game=engine.resolve(this.game);
    else if(this.game.players[this.game.currentPlayer].type==='ai'){
      const choice=ai(engine.view(this.game,this.game.currentPlayer),this.difficulty);
      this.game=engine.play(this.game,this.game.currentPlayer,choice.card.id);
    }else return false;
    this.nextStep=this.now()+(this.game.result?1200:700);this.revision++;return true;
  }
}
export class RoomService {
  constructor(now=Date.now){this.now=now;this.rooms=new Map();this.creates=new Map();}
  request(r){
    if(!r||typeof r!=='object')throw fail('Invalid request.');
    if(r.requestId&&(!/^[\w:-]{8,100}$/.test(r.requestId)))throw fail('Invalid request ID.');
    if(r.op==='create'){
      if(!r.requestId)throw fail('A request ID is required. Update the app.');
      const previous=this.creates.get(r.requestId);
      if(previous){const room=this.rooms.get(previous.code);if(room)return room.snapshot(room.member(previous.token),true);}
      if(this.rooms.size>=1000)throw fail('The server is busy. Try again shortly.',503);
      let code;do{code='KZH-'+hex(3)}while(this.rooms.has(code));
      const room=new Room({...r,code},this.now);this.rooms.set(code,room);
      const out=room.snapshot(room.members[0],true);this.creates.set(r.requestId,{code,token:out.token});return out;
    }
    if(!/^KZH-[A-F0-9]{6}$/.test(r.code||''))throw fail('Enter a room code such as KZH-A1B2C3.');
    const room=this.rooms.get(r.code);if(!room)throw fail('Room expired or not found. Create a new room.',404);
    return room.handle(r);
  }
  tick(){let changed=false;for(const [code,room] of this.rooms){
    if(this.now()-room.lastActive>86400000||(!room.members.length&&this.now()-room.lastActive>60000)){this.rooms.delete(code);changed=true;}
    else changed=room.tick()||changed;
  }for(const [id,c] of this.creates)if(!this.rooms.has(c.code))this.creates.delete(id);return changed;}
  serialize(){return JSON.stringify({rooms:[...this.rooms],creates:[...this.creates]});}
  restore(text){const saved=JSON.parse(text);this.creates=new Map(saved.creates);this.rooms=new Map(saved.rooms.map(([c,r])=>[c,Object.assign(Object.create(Room.prototype),r,{now:this.now})]));this.tick();}
}
