import { PriorityQueue } from './priorityQueue'
import { MAP_WIDTH, MAP_HEIGHT, CELLS_IZE } from './config.js'
import { Graphics } from 'pixi.js'
export class MapGuide{
  mapObstacles
  target = [0,0]
  guide = false
  constructor(mapObstacles, player, container) {
    this.mapObstacles = mapObstacles
    this.player = player
    this.container = container
  }
  bindPlayer(player) {
    this.player = player
  }

  drawObstacles() {
    for(let i= 0; i< MAP_WIDTH; i++) {
      for(let j = 0; j < MAP_HEIGHT; j++) {
        if (this.mapObstacles[i + MAP_WIDTH * j]) {
          const rectangle = new Graphics()
          rectangle.beginFill(0x66CCFF)
          rectangle.drawRect(i* CELLS_IZE,j * CELLS_IZE,CELLS_IZE, CELLS_IZE)
          this.container.addChild(rectangle)
        }
      }
    }
  }

  pathTo(to) {
    const that = this
    const path = this.findPath(to)
    if (!path) return
    return new Promise((resolve, reject) => {
      const index = path.length -1
      playerStep(index)
      function playerStep(index) {
        that.player.goto(path[index][0] * CELLS_IZE, path[index][1] * CELLS_IZE ).then(() => {
          if (index <= 0) {
            resolve()
          } else {
            playerStep(index -1)
          }
        }).catch((e)=> {
          console.log(e)
          reject()
        })
      }
    })
  }

  findPath(to) {
    let map =  [].concat(this.mapObstacles)
    let from = {
      x: this.player.x / CELLS_IZE,
      y: this.player.y / CELLS_IZE
    }
    this.target[0] = parseInt(to.x / CELLS_IZE)
    this.target[1] = parseInt(to.y / CELLS_IZE)
    if (this.mapObstacles[this.target[0] + this.target[1] * MAP_WIDTH]) {
      return
    }
    console.log(`从(${from.x}，${from.y})移动到${this.target[0]}，${this.target[1]})移动到`)
    const queue = new PriorityQueue(this.distance.bind(this))
    queue.enqueue([from.x, from.y])
    function tryGo(x, y, pre) {
      // 边界判断
      if(x < 0 || x>= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return
      // 地图障碍
      if(map[x + y * MAP_WIDTH]) return
      // 存储上一步位置
      map[x + y * MAP_WIDTH] = pre
      // 如果该点位可以正常行走，入栈
      queue.enqueue([x, y])
    }
    while(queue.length) {
      let [x, y] = queue.dequeue()
      if (x === this.target[0] && y === this.target[1]) {
        console.log('找到路了')
        // 找到路线 倒序回去
        let finalPath = [];
        while(x!= from.x || y!= from.y) {
          finalPath.push(map[x + MAP_WIDTH * y])
          let oX = x
          let oY = y
          x = map[oX + MAP_WIDTH * oY][0]
          y = map[oX + MAP_WIDTH * oY][1]
        }
        return finalPath
      }
      const direction =  [
        [1, 0], [0, 1], [-1, 0], [0, -1], // 四个正方向
        [1, 1], [-1, 1], [1, -1], [-1, -1] // 四个斜角方向
      ]
      direction.forEach(dir => {
        tryGo(x + dir[0], y + dir[1], [x, y])
      })
    }
    return 
  }

  distance(point1, point2) {
    // 求出和终点距离较近的点位
    const dis1 = Math.pow(point1[0] - this.target[0], 2) + Math.pow(point1[1] - this.target[1], 2)
    const dis2 = Math.pow(point2[0] - this.target[0], 2) + Math.pow(point2[1] - this.target[1], 2)
    return dis1 - dis2
  }
}