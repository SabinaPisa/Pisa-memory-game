const emojis = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼"];
let cards = [...emojis,...emojis].sort(()=>Math.random()-0.5);
const grid = document.getElementById('grid');
const movesEl = document.getElementById('moves');
const winEl = document.getElementById('win');
let first=null,second=null,lock=false,moves=0,matched=0;

function createBoard(){
  grid.innerHTML=""; 
  cards.forEach((e)=>{
    const div=document.createElement('div');
    div.className="card hidden-card"; 
    div.dataset.emoji=e;
    div.innerHTML="❓"; 
    div.onclick=()=>flip(div);
    grid.appendChild(div);
  });
}
function flip(card){
  if(lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
  card.classList.remove('hidden-card'); card.classList.add('flipped'); card.innerHTML=card.dataset.emoji;
  if(!first){first=card;return;}
  second=card; moves++; movesEl.textContent=`Urinish: ${moves}`; lock=true;
  if(first.dataset.emoji===second.dataset.emoji){
    first.classList.add('matched'); second.classList.add('matched');
    matched+=2; first=null; second=null; lock=false;
    if(matched===16){winEl.classList.remove('hidden')}
  }else{
    setTimeout(()=>{
      first.classList.remove('flipped'); first.classList.add('hidden-card'); first.innerHTML="❓";
      second.classList.remove('flipped'); second.classList.add('hidden-card'); second.innerHTML="❓";
      first=null; second=null; lock=false;
    },800);
  }
}
document.getElementById('restart').onclick=()=>{
  cards=[...emojis,...emojis].sort(()=>Math.random()-0.5);
  first=null;second=null;lock=false;moves=0;matched=0;
  movesEl.textContent="Urinish: 0"; winEl.classList.add('hidden'); createBoard();
}
createBoard();
