import { Graphics } from 'pixi.js'
export class Monster extends Graphics {
  constructor(options) {
    super()
    this.beginFill(0x9966FF)
    this.drawCircle(0,0, options.size || 32);
    this.endFill();
    this.x = options.x
    this.y = options.y
  }

  goto(x , y) {
    this.targetX = x
    this.targetY = y
    this.radian = Math.atan2((y - this.y), (x - this.x))
    this.rotation = this.radian
  }

  walk() {
    this.x = this.x + 3 * Math.cos(this.radian)
    this.y = this.y + 3 * Math.sin(this.radian)
  }
}