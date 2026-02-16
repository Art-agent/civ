export const useAtlas = () => {
  const SPRITE_SHEET = 32;
  const createSpriteSheetData = () => {
    // Why cant this be in types so i can import it here. will do that soon
    
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
          frame: {
            x: SPRITE_SHEET,
            y: SPRITE_SHEET,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        idle_up_0: {
          frame: {
            x: 0,
            y: SPRITE_SHEET * 2,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        idle_up_1: {
          frame: {
            x: SPRITE_SHEET,
            y: SPRITE_SHEET * 2,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_0: {
          frame: {
            x: 0,
            y: SPRITE_SHEET * 3,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_1: {
          frame: {
            x: SPRITE_SHEET,
            y: SPRITE_SHEET * 3,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_2: {
          frame: {
            x: SPRITE_SHEET * 1,
            y: SPRITE_SHEET * 3,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_down_3: {
          frame: {
            x: SPRITE_SHEET * 2,
            y: SPRITE_SHEET * 3,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },

        //Walk right
        walk_right_0: {
          frame: {
            x: 0,
            y: SPRITE_SHEET * 4,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_right_1: {
          frame: {
            x: SPRITE_SHEET,
            y: SPRITE_SHEET * 4,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_right_2: {
          frame: {
            x: SPRITE_SHEET * 1,
            y: SPRITE_SHEET * 4,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_right_3: {
          frame: {
            x: SPRITE_SHEET * 2,
            y: SPRITE_SHEET * 4,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },

        //Walk up
        walk_up_0: {
          frame: {
            x: 0,
            y: SPRITE_SHEET * 5,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_up_1: {
          frame: {
            x: SPRITE_SHEET,
            y: SPRITE_SHEET * 5,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_up_2: {
          frame: {
            x: SPRITE_SHEET * 1,
            y: SPRITE_SHEET * 5,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
        walk_up_3: {
          frame: {
            x: SPRITE_SHEET * 2,
            y: SPRITE_SHEET * 5,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        },
      },
      animations: {
        idle_down: ["idle_down_0", "idle_down_1"],
        idle_right: ["idle_right_0", "idle_right_1"],
        idle_up: ["idle_up_0", "idle_up_1"],
        idle_left: ["idle_right_0", "idle_right_1"],
        walk_down: ["walk_down_0", "walk_down_1", "walk_down_2", "walk_down_3"],
        walk_right: [
          "walk_right_0",
          "walk_right_1",
          "walk_right_2",
          "walk_right_3",
        ],
        walk_up: ["walk_up_0", "walk_up_1", "walk_up_2", "walk_up_3"],
        walk_left: [
          "walk_right_0",
          "walk_right_1",
          "walk_right_2",
          "walk_right_3",
        ],
      },

      meta: {
        image: "../../sprites/humans/citizens/human_peasant.png",
        format: "RGBA8888",
        size: { w: 64, h: 192 },
        scale: 1,
      },
    };
    return atlasData;
  };
  
  const createTreeSpritesheet = () => {
    const treeData = {
      frames: {
        tree_one: {
          frame: {
            x: SPRITE_SHEET,
            y: 0,
            w: SPRITE_SHEET,
            h: SPRITE_SHEET,
          },
          sourceSize: { w: SPRITE_SHEET, h: SPRITE_SHEET },
          spriteSourceSize: { x: 0, y: 0, w: SPRITE_SHEET, h: SPRITE_SHEET },
        }
      },
      animations: {
        tree: ['tree_one']
      },
      meta: {
        image: "../../sprites/objects/1.png",
        format: "RGBA8888",
        size: { w: 128, h: 160 },
        scale: 1,
      },
    }
    return treeData
  }
  
  const createBuildingSpritesheet = () => {
    const buildingData = {
      frames: {
        capitol: {
          frame: {
            x: 144,
            y: 144,
            w: 144,
            h: 144,
          },
          sourceSize: { w: 144, h: 144 },
          spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 },
        },
        court: {
          frame: {
            x: 0,
            y: 144,
            w: 144,
            h: 144,
          },
          sourceSize: { w: 144, h: 144 },
          spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 },
        },
        bank: {
          frame: {
            x: 288,
            y: 144,
            w: 144,
            h: 144,
          },
          sourceSize: { w: 144, h: 144 },
          spriteSourceSize: { x: 0, y: 0, w: 144, h: 144 },
        },
      },
      animations: {
        capitol: ['capitol'],
        court: ['court'],
        bank: ['bank'],
      },
      meta: {
        image: "../../sprites/buildings/Buildings-Batch-1.png",
        format: "RGBA8888",
        size: { w: 432, h: 288 },
        scale: 1,
      },
    }
    return buildingData
  }
  
  
  return {
    createSpriteSheetData,
    createTreeSpritesheet,
    createBuildingSpritesheet,
  }
}