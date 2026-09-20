export const label="BUILD FIGHT";export const objective="BUILD • EDIT • ELIMINATE";
let s,api;
export function init(state,helpers){s=state;s.wood=150;s.player.x=600;s.player.y=1200;for(let i=0;i<2;i++){helpers.spawnEnemy("enemy");s.enemies[s.enemies.length-1].x=1800+i*120;s.enemies[s.enemies.length-1].y=1100+i*180}}
export function tick(){if(s.enemies.filter(e=>!e.dead).length===0)api.end(true)}
export function draw(ctx,cx,cy){ctx.strokeStyle="#ffffff18";ctx.lineWidth=2;for(let x=400;x<2000;x+=64)for(let y=500;y<1900;y+=64)ctx.strokeRect(x-cx,y-cy,64,64)}