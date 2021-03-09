export const WIDTH = 1000
export const HEIGHT = 600
export const IMAGES = [{
  name: 'player',
  url: 'images/1.png'
}, {
  name: 'background',
  url: 'images/2.png'
}, {
  name: 'starBackground',
  url: 'images/lol-bg.jpg'
}]

export const PLAYER_OPTIONS = {
  x: WIDTH / 2,
  y: HEIGHT / 2,
  scale: 0.3,
  width: 356,
  height: 220,
  speed: 3
}

export const MONSTER_OPTIONS = {
  number: 1, // 每次生产数量
  time: 800 // 每次生产时间
}