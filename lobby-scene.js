(()=>{
const c=document.getElementById("lobbyCanvas"),ctx=c.getContext("2d",{alpha:false});
let W=0,H=0,D=1,t=0,px=0,py=0;
const rand=(a,b)=>Math.random()*(b-a)+a;
const clouds=Array.from({length:9},(_,i)=>({x:rand(-200,1400),y:rand(.08,.32),s:rand(.55,1.2),v:rand(2,7)}));
const trees=Array.from({length:16},(_,i)=>({x:i/15,y:rand(.57,.73),s:rand(.55,1.05),tone:i%3}));
function resize(){D=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;c.width=W*D;c.height=H*D;c.style.width=W+"px";c.style.height=H+"px";ctx.setTransform(D,0,0,D,0,0);ctx.imageSmoothingEnabled=false}
addEventListener("resize",resize);resize();
addEventListener("pointermove",e=>{px=(e.clientX/W-.5);py=(e.clientY/H-.5)});
function rect(x,y,w,h,col){ctx.fillStyle=col;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function cloud(x,y,s){rect(x,y,82*s,12*s,"#eef4df");rect(x+15*s,y-13*s,34*s,17*s,"#eef4df");rect(x+48*s,y-8*s,27*s,12*s,"#eef4df");rect(x+8*s,y+10*s,68*s,6*s,"#c8ddd0")}
function tree(x,y,s,tone){const dark=tone===0?"#204b3b":tone===1?"#295c43":"#1b4438",light=tone===0?"#367451":tone===1?"#3f7c4e":"#326b48";rect(x-6*s,y,12*s,58*s,"#5b432e");rect(x-35*s,y+4*s,70*s,12*s,dark);rect(x-27*s,y-12*s,54*s,20*s,light);rect(x-18*s,y-28*s,36*s,20*s,light);rect(x-8*s,y-42*s,16*s,19*s,light);rect(x-31*s,y+18*s,62*s,10*s,dark)}
function mountain(x,y,s,col){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+150*s,y-145*s);ctx.lineTo(x+245*s,y-55*s);ctx.lineTo(x+340*s,y-190*s);ctx.lineTo(x+520*s,y);ctx.closePath();ctx.fill();rect(x+205*s,y-58*s,38*s,7*s,"#7ca18b");rect(x+335*s,y-151*s,30*s,7*s,"#87ab91")}
function draw(){
t+=.016;
ctx.clearRect(0,0,W,H);
rect(0,0,W,H,"#70b9d2");
for(let y=0;y<H*.52;y+=8)rect(0,y,W,1,"#ffffff08");
rect(0,H*.48,W,H*.24,"#6b9b79");
mountain(-W*.25,H*.72,Math.max(1,W/800),"#628b79");
mountain(W*.35,H*.73,Math.max(1,W/900),"#507b6b");
rect(0,H*.69,W,H*.31,"#4f8949");
for(let y=H*.71;y<H;y+=16)rect(0,y,W,3,"#376e3e");
for(let x=0;x<W;x+=32)if((x/32|0)%2===0)rect(x,H*.75,7,5,"#6da44d");
clouds.forEach(o=>{o.x+=o.v*.016;if(o.x>W+160)o.x=-180;cloud(o.x,o.y*H,o.s)});
const sunX=W*.78+px*18,sunY=H*.18+py*8;rect(sunX-42,sunY-42,84,84,"#ffe58a");rect(sunX-30,sunY-50,60,100,"#ffe58a");rect(sunX-50,sunY-30,100,60,"#ffe58a");
trees.forEach(o=>tree(o.x*W+px*20,o.y*H,o.s,o.tone));
const pW=Math.min(520,W*.52),pX=W/2-pW/2,pY=H*.82;
rect(pX+10,pY+10,pW,46,"#2b3f2e");rect(pX,pY,pW,46,"#6d482e");rect(pX+5,pY+7,pW-10,7,"#a06d45");rect(pX+5,pY+32,pW-10,6,"#4b321f");
for(let x=pX+28;x<pX+pW-20;x+=58)rect(x,pY+8,4,30,"#563822");
const sparkle=3+Math.sin(t*2)*2;rect(W*.24,H*.22,3,3,"#fff1a1");rect(W*.24+sparkle,H*.22,3,3,"#fff1a1");rect(W*.82,H*.38,3,3,"#fff1a1");
requestAnimationFrame(draw)
}
draw();
})();