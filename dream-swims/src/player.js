import { AnimatedSprite } from 'pixi.js'
export class Player extends AnimatedSprite{
  
  constructor(textures) {
    super(textures)
    this.anchor.set(0.5, 0.85)
    this.position.set(100, 100)
    this.animationSpeed = 0.1
    this.play()
  }
  
  goto(x, y) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.position.set(x, y)
        resolve()
      }, 60)
    })
  }
}