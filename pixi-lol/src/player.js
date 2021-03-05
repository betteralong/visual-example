import { AnimatedSprite } from 'pixi.js'
import { PLAYER_OPTIONS } from './config'
export class Player extends AnimatedSprite{

  constructor(frames, options) {
    super(frames)
    this.options = {}
    Object.assign(this.options, options, PLAYER_OPTIONS)
    this.radian = 0
    this.anchor.set(0.5, 0.5)
    this.targetX = this.options.x
    this.targetY = this.options.y
    this.position.set(this.options.x, this.options.y)
    this.animationSpeed = this.options.animationSpeed
    this.scale.set(this.options.scale, this.options.scale)
  }

  goto(x , y) {
    this.targetX = x
    this.targetY = y
    this.radian = Math.atan2((y - this.y), (x - this.x))
    this.rotation = this.radian
  }

  walk() {
    if(this.targetX === this.x && this.targetY === this.y) return
    const dx = this.x - this.targetX
    const dy = this.y - this.targetY
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    if(distance < this.options.speed) { // 距离小于一帧直接赋值
        this.x = this.targetX
        this.y = this.targetY
    } else {
      this.x = this.x + this.options.speed * Math.cos(this.radian)
      this.y = this.y + this.options.speed * Math.sin(this.radian)
    }
  }
  
  reset() {
    this.radian = 0
    this.x = this.options.x
    this.y = this.options.y
    this.targetX = this.options.x
    this.targetY = this.options.y
  }
}