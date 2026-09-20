const SAVE_KEY="riftSave";
const skins=[
 {id:"default",name:"RIFT DEFAULT",price:0,cls:"",icon:"🧑"},
 {id:"neon",name:"NEON RUNNER",price:250,cls:"skin-neon",icon:"🟣"},
 {id:"shadow",name:"SHADOWBYTE",price:350,cls:"skin-shadow",icon:"🌑"},
 {id:"sunset",name:"SUNSET PIXEL",price:450,cls:"skin-sunset",icon:"🌅"}
];
const shopItems=[
 {id:"medkit",name:"MINI MED",icon:"🩹",rarity:"Common",price:75},
 {id:"shield",name:"SHIELD CELL",icon:"🛡️",rarity:"Rare",price:100},
 {id:"slurp",name:"SLURP JUICE",icon:"🧪",rarity:"Epic",price:150}
];
let save=loadSave();
let mode="royale";

function loadSave(){
 try{
  const data=JSON.parse(localStorage.getItem(SAVE_KEY)||"{}");
  return {coins:Number.isFinite(+data.coins)?+data.coins:500,level:Number.isFinite(+data.level)?+data.level:1,
   skins:Array.isArray(data.skins)&&data.skins.length?data.skins:["default"],items:Array.isArray(data.items)?data.items:[],selectedSkin:data.selectedSkin||"default"};
 }catch{return {coins:500,level:1,skins:["default"],items:[],selectedSkin:"default"}}
}
function persist(){localStorage.setItem(SAVE_KEY,JSON.stringify(save))}
function avatar(id,el){el.className="pixel-avatar "+(skins.find(s=>s.id===id)?.cls||"")}
function render(){
 document.getElementById("coins").textContent="🪙 "+save.coins;
 document.getElementById("level").textContent="LVL "+save.level;
 avatar(save.selectedSkin,document.getElementById("lobbyAvatar"));
}
function renderLocker(){
 avatar(save.selectedSkin,document.getElementById("lockerAvatar"));
 document.getElementById("skinName").textContent=skins.find(s=>s.id===save.selectedSkin)?.name||"RIFT DEFAULT";
 document.getElementById("skinGrid").innerHTML=skins.map(s=>`<button class="item ${save.selectedSkin===s.id?"selected":""}" data-skin="${s.id}">
 <div class="icon">${s.icon}</div><b>${s.name}</b><small>${save.skins.includes(s.id)?"OWNED":s.price+" coins"}</small></button>`).join("");
 document.querySelectorAll("[data-skin]").forEach(btn=>btn.onclick=()=>{
  const s=skins.find(v=>v.id===btn.dataset.skin);
  if(!s)return;
  if(!save.skins.includes(s.id)){
   if(save.coins<s.price)return toast("Not enough coins");
   save.coins-=s.price;save.skins.push(s.id);
  }
  save.selectedSkin=s.id;persist();renderLocker();render();
 });
}
function renderShop(){
 document.getElementById("shopCoins").textContent=save.coins;
 document.getElementById("shopGrid").innerHTML=shopItems.map(i=>`<button class="item" data-item="${i.id}">
 <div class="icon">${i.icon}</div><b>${i.name}</b><small>${i.rarity} • ${i.price} coins</small></button>`).join("");
 document.querySelectorAll("[data-item]").forEach(btn=>btn.onclick=()=>{
  const item=shopItems.find(v=>v.id===btn.dataset.item);
  if(!item)return;
  if(save.coins<item.price)return toast("Not enough coins");
  save.coins-=item.price;save.items.push(item.id);persist();renderShop();render();toast(item.name+" purchased");
 });
}
function toast(message){
 let el=document.getElementById("lobbyToast");
 if(!el){el=document.createElement("div");el.id="lobbyToast";el.className="toast";document.body.appendChild(el)}
 el.textContent=message;el.classList.add("show");clearTimeout(window.__riftToast);
 window.__riftToast=setTimeout(()=>el.classList.remove("show"),1400);
}
function openScreen(id){
 document.querySelectorAll(".screen").forEach(e=>e.classList.add("hidden"));
 document.getElementById(id).classList.remove("hidden");
 if(id==="locker")renderLocker();
 if(id==="shop")renderShop();
}
document.querySelectorAll(".mode-card").forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll(".mode-card").forEach(v=>v.classList.remove("active"));
 btn.classList.add("active");mode=btn.dataset.mode;
});
document.querySelectorAll("[data-screen]").forEach(btn=>btn.onclick=()=>openScreen(btn.dataset.screen));
document.querySelectorAll(".back").forEach(btn=>btn.onclick=()=>{openScreen("lobby");render()});
document.getElementById("playBtn").onclick=()=>location.href="game.html?mode="+encodeURIComponent(mode);
document.querySelectorAll(".toggle").forEach(btn=>btn.onclick=()=>{
 btn.classList.toggle("on");btn.querySelector("b").textContent=btn.classList.contains("on")?"ON":"OFF";
});
document.getElementById("resetData").onclick=()=>{
 localStorage.removeItem(SAVE_KEY);save=loadSave();render();toast("Progress reset");
};
render();