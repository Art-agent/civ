import * as PIXI from "pixi.js";
import type {
  Agent,
  AgentRole,
  AgentActivity,
  AgentInclination,
} from "#shared/types/Agent";
import type {
  Country,
  CountryChoice,
  Position,
  House,
  GameActivity,
} from "#shared/types/Game";
import { useAgents } from "./useAgents";
import { useGroq } from "./useGroq";
import { useAtlas } from "./useAtlas";
import { showThought } from "./useThoughtBubble";
import { useDatabase } from "./useDatabase";


export const useGameLoop = () => {
  const app = shallowRef<PIXI.Application | null>(null);
  // const { agents, spawnInitialAgents, createAgent, updateAgentBehavior } = useAgents();
  const { createAgent, getAllAgents, updateAgentPosition, getAllBuildings, storeConversation, getAllCountries, subscribeToAgents } = useDatabase();
  const { createSpriteSheetData, createTreeSpritesheet, createBuildingSpritesheet } = useAtlas();
  const houses = useState<House[]>("houses", () => []);
  const countries = useState<Country[]>("countries", () => []);
  const event = useState<GameActivity[]>("gameactivity", () => []);
  const selectedAgent = useState<Agent | null>("selectedagent", () => null);
  const isPaused = useState("isPaused", () => false);
  
  const conversationCooldowns = new Map<string, number>();
  const CONVERSATION_COOLDOWN = 30000 // 30 seconds between conversations
  const CONVERSATION_DISTANCE = 50 // Distance to trigger conversation
  const CONVERSATION_PROBABILITY = 0.5 // Probability that two agents will talk or converse
  
  
  const { getAgentDecision } = useGroq();
  const AI_CALL_INTERVAL = 20000; // Stands for 8 seconds
  var lastAiUpdate = 0;

  // We will store agent sprites via agentId
  let agentSprites = new Map<string, any>();
  
  
  const initGame = async (canvas: HTMLCanvasElement, userWallet?: string, username?: string) => {
    // Create the pixi Application
    app.value = new PIXI.Application();
    await app.value.init({
      canvas,
      width: 1200,
      height: 1200,
      backgroundColor: 0x4084e2,
      antialias: true,
      preference: "webgl",
    });
    
    await drawTerritories();
    await renderBuildingsAndObjects();
    const spritesheet = await useHumanSpriteSheet();

    // const person1 = createAnimatedPerson(spritesheet, 150, 150, 1.5);
    // const person2 = createAnimatedPerson(spritesheet, 200, 200, 1.5);
    
    // We will eventually get the user agent to load first but for now lets render some agents
    const allAgents = await getAllAgents();
    allAgents.forEach((agent) => {
      if (agent) {
        const entity = createAnimatedPerson(
          spritesheet,
          agent.position.x,
          agent.position.y,
          agent.id,
          agent,
          1.5
        )
        agentSprites.set(agent.id, { ...entity, agent });
        const angle1 = Math.random() * Math.PI * 2;
        entity.velocityX = Math.cos(angle1) * entity.speed;
        app.value!.stage.addChild(entity.sprite);
      }
    });
    //16116376
    subscribeToAgents((updatedAgents) => {
      syncAgents(updatedAgents, spritesheet);
    });
    
    const allMadeCountries = await getAllCountries()
    
    app.value.ticker.add(() => gameLoop(allMadeCountries));
  };

  const drawTerritories = async () => {
    if (!app.value) return;
    const countries = await getAllCountries();
    console.log("---COUNTRIES---")
    console.log(countries)
    

    const country_graphics = new PIXI.Graphics();

    countries.forEach((country) => {
      const country_size_x = country.territory_x2 - country.territory_x1;
      const country_size_y = country.territory_y2 - country.territory_y1;
      country_graphics.rect(
        country.territory_x1,
        country.territory_y1,
        country_size_x,
        country_size_y,
      );
      country_graphics.fill(country.color);
    });

    app.value.stage.addChild(country_graphics);
  };
  
  const renderBuildingsAndObjects = async () => {
    if (!app.value) return
    const building_and_objects = await getAllBuildings();
    console.log(building_and_objects);
    // const bao = new PIXI.Graphics();
    building_and_objects.forEach(async (builds) => {
      if (builds.type === 'tree') {
        const treeData = createTreeSpritesheet();
        const tree_texture = await PIXI.Assets.load(treeData.meta.image)
        const spritesheet = new PIXI.Spritesheet(tree_texture.source, treeData);
        await spritesheet.parse();
        const sprite = new PIXI.AnimatedSprite(spritesheet.animations.tree);
        sprite.position.set(builds.x, builds.y);
        sprite.anchor.set(0.5);
        sprite.scale.set(1.5);
        app.value!.stage.addChild(sprite);
      }
      else if (builds.type === 'capitol') {
        const buildData = createBuildingSpritesheet();
        const build_texture = await PIXI.Assets.load(buildData.meta.image)
        const spritesheet = new PIXI.Spritesheet(build_texture.source, buildData);
        await spritesheet.parse();
        const sprite = new PIXI.AnimatedSprite(spritesheet.animations.capitol);
        sprite.position.set(builds.x, builds.y);
        sprite.anchor.set(0.5);
        sprite.scale.set(1);
        app.value!.stage.addChild(sprite);
      }
      else if (builds.type === 'court') {
        const buildData = createBuildingSpritesheet();
        const build_texture = await PIXI.Assets.load(buildData.meta.image)
        const spritesheet = new PIXI.Spritesheet(build_texture.source, buildData);
        await spritesheet.parse();
        const sprite = new PIXI.AnimatedSprite(spritesheet.animations.court);
        sprite.position.set(builds.x, builds.y);
        sprite.anchor.set(0.5);
        sprite.scale.set(1);
        app.value!.stage.addChild(sprite);
      }
      else if (builds.type === 'bank') {
        const buildData = createBuildingSpritesheet();
        const build_texture = await PIXI.Assets.load(buildData.meta.image)
        const spritesheet = new PIXI.Spritesheet(build_texture.source, buildData);
        await spritesheet.parse();
        const sprite = new PIXI.AnimatedSprite(spritesheet.animations.bank);
        sprite.position.set(builds.x, builds.y);
        sprite.anchor.set(0.5);
        sprite.scale.set(1);
        app.value!.stage.addChild(sprite);
      }
    })
  }
  
  const makeAgentClickable = (entity: PIXI.Sprite, agent: Agent) => {
    entity.eventMode = 'static';
    entity.cursor = 'pointer';
    
    entity.on('pointerdown', () => {
      selectedAgent.value = agent;
      console.log(`Selected Agent:`, agent.name)
    })
  }
  
  const checkAgentProximity = async () => {
    const agentArray = Array.from(agentSprites.values())
    for (let i = 0; i < agentArray.length; i++) {
      for (let j = i+1; j < agentArray.length; j++) {
        const entity1 = agentArray[i];
        const entity2 = agentArray[j];
        
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < CONVERSATION_DISTANCE) {
          const pairId = [entity1.agentId, entity2.agentId].sort().join('-');
          //check cooldown
          const lastConversation = conversationCooldowns.get(pairId) || 0;
          const now = Date.now();
          if (now - lastConversation < CONVERSATION_COOLDOWN) {
            continue; // Still on cooldown
          }
                  
          // Roll probability
          if (Math.random() > CONVERSATION_PROBABILITY) {
            continue; // Failed probability check
          }
                  
          // Trigger conversation!
          await initiateConversation(entity1, entity2);
          conversationCooldowns.set(pairId, now);
        }
      }
    }
  }
  
  const initiateConversation = async (entity1: any, entity2: any) => {
    if (!app.value) return
    const agent1 = entity1.agent;
    const agent2 = entity2.agent;
    
    console.log(`${agent1.name} meets ${agent2.name} and starts a conversation`);
    
    try {
      const response = await $fetch('/api/conversation', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent1: {
            name: agent1.name,
            role: agent1.role,
            inclination: agent1.inclination
          },
          agent2: {
            name: agent1.name,
            role: agent1.role,
            inclination: agent2.inclination
          }
        }),
      })
      const conversation = await response;
          
      // Show speech bubbles
      showThought(app.value, conversation.agent1_message, entity1.x, entity1.y, 8000, entity1);
          
      // Delay second message slightly
      setTimeout(() => {
        showThought(app.value!, conversation.agent2_message, entity2.x, entity2.y, 8000, entity2);
      }, 2000);
          
      // Store in database
      await storeConversation(
        agent1.id,
        agent2.id,
        conversation.agent1_message,
        conversation.agent2_message,
        { x: (entity1.x + entity2.x) / 2, y: (entity1.y + entity2.y) / 2 }
      );
    } catch (error) {
      console.log("Error occured while starting conversation: ", error);
    }
    
  }

  const useHumanSpriteSheet = async () => {
    const atlasData = createSpriteSheetData();
    try {
      const sheet = await PIXI.Assets.load(atlasData.meta.image);

      const spritesheet = new PIXI.Spritesheet(sheet.source, atlasData);

      await spritesheet.parse();

      // console.log("Spritesheet parsed:", spritesheet);
      // console.log("Available textures:", Object.keys(spritesheet.textures));

      return spritesheet;
    } catch (error) {
      console.error("Failed to load spritesheet:", error);
      throw error;
    }
  };

  const createAnimatedPerson = (
    spritesheet: PIXI.Spritesheet,
    x: number,
    y: number,
    agentId: string,
    agent: Agent,
    scale: number = 2,
  ) => {
    // console.log("Spritesheet in createAnimatedPerson:", spritesheet);
    // console.log("Textures available:", spritesheet.textures);
    const sprite = new PIXI.AnimatedSprite(spritesheet.animations.idle_down); // Edit the spritesheet type

    sprite.x = x;
    sprite.y = y;
    sprite.anchor.set(0.5, 0.5);
    sprite.scale.set(scale);
    sprite.animationSpeed = 0.5;
    sprite.play();

    const entity =  {
      agentId,
      sprite: sprite,
      spritesheet: spritesheet,
      x: x,
      y: y,
      velocityX: 0,
      velocityY: 0,
      speed: 1,
      currentAnimation: "idle_down",
      direction: "down",
      targetX: null as number | null,
      targetY: null as number | null,
      currentThought: "",

      moveToTarget() {
        if (this.targetX === null && this.targetY === null) {
          this.velocityX = 0;
          this.velocityY = 0;
          return;
        }

        const dx = this.targetX! - this.x;
        const dy = this.targetY! - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If close enough to target, stop
        if (distance < 5) {
          this.targetX = null;
          this.targetY = null;
          this.velocityX = 0;
          this.velocityY = 0;
          return;
        }

        // Move towards target
        this.velocityX = (dx / distance) * this.speed;
        this.velocityY = (dy / distance) * this.speed;
      },

      //change Animation
      setAnimation(animationName: string) {
        if (this.currentAnimation == animationName) return;
        const textures = this.spritesheet.animations[animationName];
        if (!textures) {
          console.warn(`Animation ${animationName} not found`);
          return;
        }
        this.sprite.textures = textures;
        this.sprite.play();
        this.currentAnimation = animationName;

        // Flip horizontally for left direction
        if (animationName.includes("left")) {
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
        const isMoving =
          Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1;
        if (isMoving) {
          if (Math.abs(this.velocityX) > Math.abs(this.velocityY)) {
            this.direction = this.velocityX > 0 ? "right" : "left";
          } else {
            this.direction = this.velocityY > 0 ? "down" : "up";
          }
          this.setAnimation(`walk_${this.direction}`);
        } else {
          this.setAnimation(`idle_${this.direction}`);
        }
        // Update database position
        updateAgentPosition(this.agentId, { x: this.x, y: this.y });
      },
    };
    makeAgentClickable(entity.sprite, agent);
    return entity
  };
  
  const syncAgents = (updatedAgents: Agent[], spritesheet: PIXI.Spritesheet) => {
    // Add new agents that don't have sprites yet
    updatedAgents.forEach(agent => {
      if (!agentSprites.has(agent.id)) {
        const entity = createAnimatedPerson(
          spritesheet,
          agent.position.x,
          agent.position.y,
          agent.id,
          agent,
          1.5
        );
        agentSprites.set(agent.id, { ...entity, agent });
        app.value!.stage.addChild(entity.sprite);
      }
    });
  
    // Remove agents that no longer exist
    agentSprites.forEach((entity, agentId) => {
      if (!updatedAgents.find(a => a.id === agentId)) {
        app.value!.stage.removeChild(entity.sprite);
        agentSprites.delete(agentId);
      }
    });
  };


  const gameLoop = async (countriesParam: any[]) => {
    if (isPaused.value) return;
    if (!app.value) return;

    const country = countriesParam[0];
    if (!country) return;
    const bounds = {
      minX: country.territory_x1 + 20,
      maxX: country.territory_x2 - 20,
      minY: country.territory_y1 + 20,
      maxY: country.territory_y2 - 20,
    };

    // Check if it is time for ai to update position
    const currentTime = Date.now();
    if (currentTime - lastAiUpdate > AI_CALL_INTERVAL) {
      lastAiUpdate = currentTime;

      // Ask AI for decisions for each entity
      for (const [agentId, entity] of agentSprites.entries()) {
        const worldContext = { bounds };

        try {
          const decision = await getAgentDecision(entity, worldContext)
          console.log("---DECISION---")
          console.log(decision)

          // Execute AI decision
          if (decision.action === "move" && decision.target) {
            entity.targetX = decision.target.x;
            entity.targetY = decision.target.y;
          } else if (decision.action === "idle") {
            entity.targetX = null;
            entity.targetY = null;
          }

          // Show thought bubble
          if (decision.thought) {
            entity.currentThought = decision.thought;
            showThought(app.value, decision.thought, entity.x, entity.y, 5000, entity);
          }
        } catch (error) {
          console.error("Error getting AI decision:", error);
        }
      }
    }

    agentSprites.forEach((entity) => {
      // Move towards AI-set target
      entity.moveToTarget();
            
      // Boundary collision - stop at edges
      if (entity.x < bounds.minX) {
        entity.x = bounds.minX;
        entity.targetX = null;
        entity.velocityX = 0;
      }
      if (entity.x > bounds.maxX) {
        entity.x = bounds.maxX;
        entity.targetX = null;
        entity.velocityX = 0;
      }
      if (entity.y < bounds.minY) {
        entity.y = bounds.minY;
        entity.targetY = null;
        entity.velocityY = 0;
      }
      if (entity.y > bounds.maxY) {
        entity.y = bounds.maxY;
        entity.targetY = null;
        entity.velocityY = 0;
      }

      // Update entity (position and animation)
      entity.update();
    });
  };

  const addEvent = (message: string, type: GameActivity["type"]) => {};

  const togglePause = () => {
    isPaused.value = !isPaused.value;
  };

  return {
    selectedAgent,
    isPaused,
    initGame,
    togglePause,
    addEvent,
  };
};
