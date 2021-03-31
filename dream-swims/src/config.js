export const WIDTH = 500
export const HEIGHT = 500
export const CELLS_IZE = 5
export const MAP_WIDTH = WIDTH / CELLS_IZE
export const MAP_HEIGHT = HEIGHT / CELLS_IZE

export const IMAGES = [{
  name: 'background',
  url: 'background/bg.jpg'
}, {
  name: 'player',
  url: 'player/0.png'
},{
  name: 'player1',
  url: 'player/1.png'
}, {
  name: 'player2',
  url: 'player/2.png'
}, {
  name: 'player3',
  url: 'player/3.png'
},{
  name: 'player4',
  url: 'player/4.png'
},{
  name: 'player5',
  url: 'player/5.png'
}]

// 假定50 50 到 60  70有障碍
const MAP_OBSTACLES = new Array(MAP_WIDTH * MAP_HEIGHT).fill(0)
for(let x = 50; x < 60; x++) {
  for(let y = 50; y < 70; y++) {
    MAP_OBSTACLES[x + y * MAP_WIDTH]  = 1
  }
}

export {
  MAP_OBSTACLES
}