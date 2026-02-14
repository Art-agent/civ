import * as PIXI from "pixi.js";

export const createThoughtBubble = (text: string, x: number, y: number) => {
  const container = new PIXI.Container();
  container.x = x;
  container.y = y - 20; //positioned above the agent
  
  const bubble = new PIXI.Graphics();
  const padding = 8;
  const maxWidth = 150;
  
  const text_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fill: '#000000',
    wordWrap: true,
    wordWrapWidth: maxWidth - padding * 2,
    align: 'center',
  });
  
  
  const thoughtText = new PIXI.Text({
    text: text,
    style: text_style
  });
  
  thoughtText.anchor.set(0.5, 0.5);
  
  const bubbleWidth = Math.min(thoughtText.width + padding * 2, maxWidth);
  const bubbleHeight = thoughtText.height + padding * 2;
  
  bubble.roundRect(
    -bubbleWidth / 2,
    -bubbleHeight / 2,
    bubbleWidth,
    bubbleHeight,
    8
  ).fill({ color: 0xffffff, alpha: 0.9 });
  bubble.setStrokeStyle({ width: 2, color: 0x000000, alpha: 1});
  
  //small tail for the bubble
  // bubble.fill({ color: 0xFFFFFF, alpha: 0.9 });
  // bubble.setStrokeStyle({ width: 2, color: 0x000000, alpha: 1});
  // bubble.moveTo(-5, bubbleHeight / 2);
  // bubble.lineTo(0, bubbleHeight / 2 + 8);
  // bubble.lineTo(5, bubbleHeight / 2);
  // bubble.closePath()
  
  container.addChild(bubble);
  container.addChild(thoughtText);
  return container;
}

export const showThought = (
  app: PIXI.Application,
  text: string,
  x: number,
  y: number,
  duration: number = 5000,
  followEntity?: any // This is the entity it is meant to follow
) => {
  const bubble = createThoughtBubble(text, x, y);
    
  // Set initial alpha
  bubble.alpha = 0;
  // Add to stage
  app.stage.addChild(bubble);
    
  // Fade in using PixiJS ticker (better than setInterval)
  let fadeInAlpha = 0;
  const fadeInTicker = () => {
    fadeInAlpha += 0.05; // Slower fade
    bubble.alpha = Math.min(fadeInAlpha, 1);
    
    // Update bubble position to follow entity
    if (followEntity) {
      bubble.x = followEntity.x;
      bubble.y = followEntity.y - 30;
    } //3450

      
    if (bubble.alpha >= 1) {
      app.ticker.remove(fadeInTicker);
        
      // Schedule fade out
      setTimeout(() => {
        let fadeOutAlpha = 1;
        const fadeOutTicker = () => {
          fadeOutAlpha -= 0.05;
          bubble.alpha = Math.max(fadeOutAlpha, 0);
          
          // Keep following entity during fade out
          if (followEntity) {
            bubble.x = followEntity.x;
            bubble.y = followEntity.y - 30;
          }
            
          if (bubble.alpha <= 0) {
            app.ticker.remove(fadeOutTicker);
            app.stage.removeChild(bubble);
            bubble.destroy(); // Clean up memory
          }
        };
        app.ticker.add(fadeOutTicker);
      }, duration);
    }
  };
    
  app.ticker.add(fadeInTicker);
};