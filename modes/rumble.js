export const label="TEAM RUMBLE";export const objective="FIRST TEAM TO 10 KOs";
let s,api;
export function init(state,helpers){s=state;s.score=0;s.player.x=700;s.player.y=1200;for(let i=0;i<4;i++){helpers.spawnEnemy("ally");s.enemies[s.enemies.length-1].x=450;s.enemies[s.enemies.length-1].y=850+i*120}for(let i=0;i<5;i++){helpers.spawnEnemy("enemy");s.enemies[s.enemies.length-1].x=1750;s.enemies[s.enemies.length-1].y=850+i*120}}
export function tick(){if(s.score>=10)api.end(true)}
export function draw(ctx,cx,cy){ctx.fillStyle="#4e9dff22";ctx.fillRect(260-cx,500-cy,700,1400);ctx.fillStyle="#e35b6722";ctx.fillRect(1440-cx,500-cy,700,1400)}