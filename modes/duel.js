export const label="1V1 DUEL";export const objective="ELIMINATE THE ENEMY";
let s,api;
export function init(state,helpers){s=state;api=helpers;s.player.x=550;s.player.y=1200;helpers.spawnEnemy("enemy");s.enemies[0].x=1850;s.enemies[0].y=1200}
export function tick(){if(s.enemies.filter(e=>!e.dead).length===0)api.end(true)}
export function draw(ctx,cx,cy){ctx.strokeStyle="#ffffff22";ctx.lineWidth=6;ctx.strokeRect(360-cx,560-cy,1680,1280)}