import { Rectangle } from 'pixi.js'
import { Player } from './player'
import { Monster } from './monster'
import { WIDTH, HEIGHT, PLAYER_OPTIONS } from './config'
export function playerFactory(resources) {
  if (!resources) { 
    console.warn('请先加载图片资源')
    return null
  }
  let frames = []
  const playerTexture = resources.texture
  const { width, height } = PLAYER_OPTIONS
  for (let i = 0; i < 4; i++) {
    const sprite = playerTexture.clone()
    const rect = new Rectangle(592 + width * i ,152 , width, height)
    sprite.frame = rect
    frames.push(sprite)
  }
  return new Player(frames)
}

function getRadom(max = 255, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function monsterFactory(scene, target ,number, time = 300) {
  const boundary = [
    [0, WIDTH, 0, 0],
    [0, 0, 0, HEIGHT],
    [WIDTH, WIDTH, 0, HEIGHT],
    [0, WIDTH, HEIGHT, HEIGHT]
  ]
  const timer = setInterval(() => {
    for(let i = 0; i < number; i++) {
      const randomRange = boundary[getRadom(number, 0)]
      const x = getRadom(randomRange[1], randomRange[0])
      const y = getRadom(randomRange[3], randomRange[2])
      const monster = new Monster({
        x,
        y
      })
      monster.goto(target.x, target.y)
      scene.addChild(monster)
    }
  }, time);
  return timer
}