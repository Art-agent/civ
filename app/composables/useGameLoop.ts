import * as PIXI from 'pixi.js';
import type { Agent, AgentRole, AgentActivity, AgentInclination } from '#shared/types/Agent';
import type { Country, CountryChoice, Position, House, GameActivity } from '#shared/types/Game';
import { useAgents } from "./useAgents";
import { useGroq } from "./useGroq";


// Right now the Agent type isn't hooked to the sprite being rendered.
// This will change as soon as we get thought bubble working

// 1. Right now we want to call the AI for thoughts at certain intervals
// 2. Then we want to use the worldcontext and agent position to feed to the AI
// 3. Then we can test to see if bubbles work
// 4. Then we can port over to main Agent type instead of premade type
//

export const useGameLoop = () => {
  const app = ref<PIXI.Application | null>(null);
  const { agents, spawnInitialAgents, createAgent, updateAgentBehavior } = useAgents();
  const houses = useState<House[]>('houses', () => []);
  const countries = useState<Country[]>('countries', () => []);
  const event = useState<GameActivity[]>('gameactivity', () => []);
  const selectedAgent = useState<Agent | null>('selectedagent', () => null);
  const isPaused = useState('isPaused', () => false);
  const entities = useState<any[]>('entities', () => []);
  const SPRITE_SIZE = 16
  
  let agentSprites = new Map<string, PIXI.Graphics>()
  let houseSprites = new Map<string, PIXI.Graphics>()
  let agentLabels = new Map<string, PIXI.Text>()

  const initGame = async (canvas: HTMLCanvasElement) => {
    // Create the pixi Application
    app.value = new PIXI.Application();
    await app.value.init({
      canvas,
      width: 1200,
      height: 1200,
      backgroundColor: 0x4084E2,
      antialias: true,
      preference: 'webgl',
    })
    // Render one country we can track for now
    countries.value = [
      {
        id: 'Aurelia',
        name: 'Aurelia',
        color: 0xF7E898,
        agentCount: 2,
        leader: '',
        territory: [{x: 100, y: 100}, {x: 800, y: 800}], // This will dictate starting position and size of the map
        atWar: false,
        laws: [],
        treasury: 1000
      },
    ]
    
    drawTerritories(countries.value);
    
    const spritesheet = await useHumanSpriteSheet();
    
    const person1 = createAnimatedPerson(spritesheet, 150, 150, 1.5);
    const person2 = createAnimatedPerson(spritesheet, 200, 200, 1.5);
    
    const angle1 = Math.random() * Math.PI * 2;
    person1.velocityX = Math.cos(angle1) * person1.speed;
    person1.velocityY = Math.sin(angle1) * person1.speed;
        
    const angle2 = Math.random() * Math.PI * 2;
    person2.velocityX = Math.cos(angle2) * person2.speed;
    person2.velocityY = Math.sin(angle2) * person2.speed;
        
    // Store entities (for updating in game loop)
    entities.value = [person1, person2];
    
    app.value.stage.addChild(person1.sprite)
    app.value.stage.addChild(person2.sprite)
    
    // Start game loop with entities
    app.value.ticker.add(() => gameLoop(entities.value, countries.value));
    
  }
  
  
  const drawTerritories = (countries_to_be_drawn: Country[]) => {
    if (!app.value) return
    if (!countries.value) return
    
    const country_graphics = new PIXI.Graphics()
    
    countries_to_be_drawn.forEach((country) => {
      const country_size_x = country.territory[1]!.x - country.territory[0]!.x;
      const country_size_y = country.territory[1]!.y - country.territory[0]!.y;
      country_graphics.rect(country.territory[0]!.x, country.territory[0]!.x, country_size_x, country_size_y);
      country_graphics.fill(country.color);
    })
    
    app.value.stage.addChild(country_graphics)
  }
  
  
  const createSpriteSheetData = () => {
    // Why cant this be in types so i can import it here. will do that soon
    const SPRITE_SHEET = 32;
    const atlasData = {
      frames: {
        idle_down_0: {
          frame: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        idle_down_1: {
          frame: { x: SPRITE_SHEET, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        idle_right_0: {
          frame: { x: 0, y: SPRITE_SHEET, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        idle_right_1: {
          frame: { x: SPRITE_SHEET, y: SPRITE_SHEET, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        idle_up_0: {
          frame: { x: 0, y: SPRITE_SHEET*2, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        idle_up_1: {
          frame: { x: SPRITE_SHEET, y: SPRITE_SHEET*2, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_0: {
          frame: { x: 0, y: SPRITE_SHEET * 3, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_1: {
          frame: { x: SPRITE_SHEET, y: SPRITE_SHEET * 3, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_2: {
          frame: { x: SPRITE_SHEET * 1, y: SPRITE_SHEET * 3, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_3: {
          frame: { x: SPRITE_SHEET * 2, y: SPRITE_SHEET * 3, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        
        //Walk right
        walk_right_0: {
          frame: { x: 0, y: SPRITE_SHEET * 4, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_right_1: {
          frame: { x: SPRITE_SHEET, y: SPRITE_SHEET * 4, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_right_2: {
          frame: { x: SPRITE_SHEET * 1, y: SPRITE_SHEET * 4, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_right_3: {
          frame: { x: SPRITE_SHEET * 2, y: SPRITE_SHEET * 4, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        
        //Walk up
        walk_up_0: {
          frame: { x: 0, y: SPRITE_SHEET * 5, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_up_1: {
          frame: { x: SPRITE_SHEET, y: SPRITE_SHEET * 5, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_up_2: {
          frame: { x: SPRITE_SHEET * 1, y: SPRITE_SHEET * 5, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_up_3: {
          frame: { x: SPRITE_SHEET * 2, y: SPRITE_SHEET * 5, w: SPRITE_SHEET, h: SPRITE_SHEET },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
      },
      animations: {
        idle_down: ['idle_down_0', 'idle_down_1'],
        idle_right: ['idle_right_0', 'idle_right_1'],
        idle_up: ['idle_up_0', 'idle_up_1'],
        idle_left: ['idle_right_0', 'idle_right_1'],
        walk_down: ['walk_down_0', 'walk_down_1', 'walk_down_2', 'walk_down_3'],
        walk_right: ['walk_right_0', 'walk_right_1', 'walk_right_2', 'walk_right_3'],
        walk_up: ['walk_up_0', 'walk_up_1', 'walk_up_2', 'walk_up_3'],
        walk_left: ['walk_right_0', 'walk_right_1', 'walk_right_2', 'walk_right_3'],
      },
      
      meta: {
        image: "sprites/humans/base/human_base.png",
        format: 'RGBA8888',
        size: { w: 64, h: 192 },
        scale: 1
      },
    }
    
    return atlasData;
  }
  
  const useHumanSpriteSheet = async () => {
    const atlasData = createSpriteSheetData();
    try {
      const sheet = await PIXI.Assets.load(atlasData.meta.image);
      console.log('Loaded base texture:', sheet);
          
      const spritesheet = new PIXI.Spritesheet(sheet.source, atlasData);
        
      await spritesheet.parse();
          
      console.log('Spritesheet parsed:', spritesheet);
      console.log('Available textures:', Object.keys(spritesheet.textures));
          
      return spritesheet;
    } catch (error) {
      console.error('Failed to load spritesheet:', error);
      throw error;
    }
  }
  
  const createAnimatedPerson = (spritesheet: PIXI.Spritesheet, x: number, y: number, scale: number = 2) => {
    console.log('Spritesheet in createAnimatedPerson:', spritesheet);
    console.log('Textures available:', spritesheet.textures);
    const sprite = new PIXI.AnimatedSprite(spritesheet.animations.idle_down); // Edit the spritesheet type
        
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.set(0.5, 0.5);
    sprite.scale.set(scale);
    sprite.animationSpeed = 0.1;
    sprite.play(); 
    
    return {
      sprite: sprite,
      spritesheet: spritesheet,
      x: x,
      y: y,
      velocityX: 0,
      velocityY: 0,
      speed: 1,
      currentAnimation: 'idle_down',
      direction: 'down',
      
      //change Animation
      setAnimation(animationName: string) {
        if (this.currentAnimation == animationName) return;
        const textures = this.spritesheet.animations[animationName];
        if (!textures) {
          console.warn(`Animation ${animationName} not found`)
          return;
        }
        this.sprite.textures = textures;
        this.sprite.play()
        this.currentAnimation = animationName;
        
        // Flip horizontally for left direction
        if (animationName.includes('left')) {
          this.sprite.scale.x = -Math.abs(this.sprite.scale.x);
        } else {
          this.sprite.scale.x = Math.abs(this.sprite.scale.x);
        }
      },
      // Update position and animation based on velocity
      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        const isMoving = Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1;
        if (isMoving) {
          if (Math.abs(this.velocityX) > Math.abs(this.velocityY)) {
            this.direction = this.velocityX > 0 ? 'right' : 'left';
          } else {
            this.direction = this.velocityY > 0 ? 'down' : 'up';
          }
          this.setAnimation(`walk_${this.direction}`)
        } else {
          this.setAnimation(`idle_${this.direction}`)
        }
      }
    }
  }
  
  
  const gameLoop = (entitiesParam: any[], countriesParam: Country[]) => {
    if (isPaused.value) return
    
    const country = countriesParam[0];
    if (!country) return
    const bounds = {
      minX: country.territory[0]!.x + 20,
      maxX: country.territory[1]!.x - 20,
      minY: country.territory[0]!.y + 20,
      maxY: country.territory[1]!.y - 20,
    }
    
    entitiesParam.forEach(entity => {
      // Random direction change (2% chance per frame)
      if (Math.random() < 0.02) {
        const angle = Math.random() * Math.PI * 2;
        entity.velocityX = Math.cos(angle) * entity.speed;
        entity.velocityY = Math.sin(angle) * entity.speed;
      }
          
      // Boundary collision - bounce off edges
      if (entity.x < bounds.minX || entity.x > bounds.maxX) {
        entity.velocityX *= -1;
        entity.x = Math.max(bounds.minX, Math.min(bounds.maxX, entity.x));
      }
      if (entity.y < bounds.minY || entity.y > bounds.maxY) {
        entity.velocityY *= -1;
        entity.y = Math.max(bounds.minY, Math.min(bounds.maxY, entity.y));
      }
          
      // Update entity (position and animation)
      entity.update();
    });
  }
    
  const addEvent = (message: string, type: GameActivity['type']) => {
  }
    
  const togglePause = () => {
    isPaused.value = !isPaused.value
  }
    
  return {
    app,
    agents,
    houses,
    countries,
    event,
    selectedAgent,
    isPaused,
    initGame,
    togglePause,
    addEvent
  }
}