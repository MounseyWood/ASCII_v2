export function paintMask(ctx, color) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.2;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;
}
