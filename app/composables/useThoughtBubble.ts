import * as PIXI from "pixi.js";

export const createThoughtBubble = (text: string, x: number, y: number) => {
  const container = new PIXI.Container();
  container.x = x;
  container.y = y - 20; //positioned above the agent
  
  const bubble = new PIXI.Graphics();
  const padding = 8;
  const maxWidth = 150;
  
  const thoughtText = new PIXI.Text({
    text: text,
    style: {
      fontFamily: 'Arial',
      fontSize: 12,
      fill: 0x000000,
      wordWrap: true,
      wordWrapWidth: maxWidth - padding * 2,
      align: 'center',
    }
  });
  
  thoughtText.anchor.set(0.5, 0.5);
  
  const bubbleWidth = Math.min(thoughtText.width + padding * 2, maxWidth);
  const bubbleHeight = thoughtText.height + padding * 2;
  
  bubble.fill({ color: 0xFFFFFF, alpha: 0.9 });
  bubble.setStrokeStyle({ width: 2, color: 0x000000, alpha: 1});
  bubble.drawRoundedRect(
    -bubbleWidth / 2,
    -bubbleHeight / 2,
    bubbleWidth,
    bubbleHeight,
    8
  );
  
  //small tail for the bubble
  bubble.fill({ color: 0xFFFFFF, alpha: 0.9 });
  bubble.setStrokeStyle({ width: 2, color: 0x000000, alpha: 1});
  bubble.moveTo(-5, bubbleHeight / 2);
  bubble.lineTo(0, bubbleHeight / 2 + 8);
  bubble.lineTo(0, bubbleHeight / 2);
  bubble.closePath()
  
  container.addChild(bubble);
  container.addChild(thoughtText);
  return container;
}

export const showThought = (
  app: PIXI.Application,
  text: string,
  x: number,
  y: number,
  duration: number = 5000
) => {
  const bubble = createThoughtBubble(text, x, y);
  app.stage.addChild(bubble);
  
  // Fade in
  bubble.alpha = 0;
  const fadeIn = setInterval(() => {
    bubble.alpha += 0.1;
    if (bubble.alpha >= 1) {
      clearInterval(fadeIn);
      
      // Fade out after duration
      setTimeout(() => {
        const fadeOut = setInterval(() => {
          bubble.alpha -= 0.1;
          if (bubble.alpha <= 0) {
            clearInterval(fadeOut);
            app.stage.removeChild(bubble);
          }
        }, 50);
      }, duration);
    }
  }, 50);
};