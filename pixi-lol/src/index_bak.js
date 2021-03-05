import { Application, Loader, Sprite, Rectangle,Graphics, AnimatedSprite } from 'pixi.js'
import { Tween, Easing } from '@tweenjs/tween.js'

const app = new Application({
  width: 800,
  height: 800,
  antialias: true,    // default: false 反锯齿
  transparent: false, // default: false 透明度
  resolution: 1       // default: 1 分辨率
})

document.body.appendChild(app.view)

app.loader.add("images/1.png").add('images/2.png').load(setup)

function setup() {
  const mapTexture = app.loader.resources['images/1.png'].texture
  const rectangle = new Rectangle(0, 1080, 1550, 900)
  mapTexture.frame = rectangle
  const map = new Sprite(mapTexture)
  app.stage.addChild(map)
  


  const yaoji = app.loader.resources['images/2.png'].texture
  // const yaojiRec = new Rectangle(0,310,365,211)
  // yaoji.frame = yaojiRec


  const frames = [];
  const width = 356
  const height = 220
  for(let i=0; i < 4; i++) {
    const runPic = yaoji.clone()
    // const rect = new Rectangle(0 ,310 + i * height, width, height)
    const rect = new Rectangle(592 + width * i ,152 , width, height)
    runPic.frame = rect
    frames.push(runPic)
  }
  const yajiRun = new AnimatedSprite(frames)
  yajiRun.x = 400
  yajiRun.y = 400
  yajiRun.anchor.set(0.5,0.5)
  yajiRun.scale.set(0.3,0.3)
  yajiRun.animationSpeed = 0.1
  yajiRun.play()
  app.stage.addChild(yajiRun)
 
  // let move = false
  // const player = new Sprite(yaoji)
  // player.x = 400
  // player.y = 400
  // player.anchor.set(0.5,0.5)
  // player.scale.set(0.3,0.3)
  // app.stage.addChild(player)

  // player.interactive = true;
  // player.anchor.set(0.5, 0.5);
  // app.stage.interactive = true;
  // app.stage.addChild(player)
  // const speed = 4
  // let angle = 0
  // app.stage.on("click", (e) => {
  //   const { x ,y } = e.data.global
  //   console.log('x', x, 'y', y)
  //   console.log('player.y', player.y, 'player.x', player.x)
  //   const radians = Math.atan((y - player.y) / (x - player.x))
  //   angle = (radians * 180) / Math.PI;
  //   // angle -= 90
  //   console.log('angle',angle)
  //   move = true
  // })

  // app.ticker.add(() => {
  //   if(move) {
  //     // console.log('angle',angle)
  //     console.log('vx', Math.cos(angle))
  //     player.x = player.x + speed * Math.cos(angle)
  //     player.y = player.y + speed * Math.sin(angle)
  //     // console.log('移动', player.x, player.y)
  //   }
  // })

  let angle = 0
  let radian = 0
  let move = false
  const speed = 5
  let tween = null
  let playerAngle = 0
  let target = {
    x: 0,
    y: 0
  }
  // const player = new Graphics()
  // player.beginFill(0x9966FF);
  // player.drawCircle(0, 0, 32);
  // player.endFill();
  // player.x = 400;
  // player.y = 400;
  // app.stage.addChild(player)
  app.stage.interactive = true;
  app.stage.on("click", (e) => {

    const { x ,y } = e.data.global
    target.x = x
    target.y = y
    // radian = Math.atan2((y - player.y), (x - player.x))
    radian = Math.atan2((y - yajiRun.y), (x - yajiRun.x))
    angle = (radian * 180) / Math.PI;
    move = true
    // tween = new Tween(player).to({
    //   rotation: radian
    // }, 100).easing(Easing.Quadratic.Out)
    // tween.start()
  })

  function getRadom(max = 255, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  class Monster{
    constructor(stage, options) {
      this.graphics = new Graphics()
      this.graphics.beginFill(0x9966FF)
      this.graphics.drawCircle(0,0, options.size || 32);
      this.graphics.endFill();
      this.graphics.x = options.x
      this.graphics.y = options.y
      stage.addChild( this.graphics)
    }
  }

  function hit(obj, target) {
    let isHit = false
    let dx = obj.x - target.x
    let dy = obj.y - target.y
    // 两个大小的一半相加
    let combinedHalfWidths  = 53 + 16
    let combinedHalfHeights = 33 + 16
    if (Math.abs(dx) < combinedHalfWidths) {
      if (Math.abs(dy) < combinedHalfHeights) {
        isHit = true;
      }
    }
    return isHit
  }
  
  function monsterFactory(stage, number, time = 300) {
    const boundary = [
      [0, 800, 0, 0],
      [0, 0, 0, 800],
      [800, 800, 0, 800],
      [0, 800, 800, 800]
    ]
    let count = 0
    setInterval(function() {
      for(let i = 0; i < number; i++) {
        count++
        const randomRange = boundary[getRadom(4, 0)]
        const x = getRadom(randomRange[1], randomRange[0])
        const y = getRadom(randomRange[3], randomRange[2])
        const moster = new Monster(stage, {
          x,
          y
        })
        const a = Math.atan2((y - yajiRun.y), (x - yajiRun.x))
        // 求出和妖姬的妖姬的角度
        function run() {
          moster.graphics.x = moster.graphics.x - (speed -1) * Math.cos(a)
          moster.graphics.y = moster.graphics.y - (speed -1) * Math.sin(a)
          if (moster.graphics.x > 820 || moster.graphics.y > 820 || moster.graphics.x < -20 || moster.graphics.y < -20) {
            app.ticker.remove(run)
            app.stage.removeChild(moster.graphics)
          }
          // 碰撞检测
          const isHit = hit(yajiRun, moster.graphics)
          isHit && alert('gg') &&           app.ticker.stop()
        }
        app.ticker.add(run)
      }
    }, time)
  }

  setTimeout(() => {
    monsterFactory(app.stage, 3, 800)
  }, 6000)
  app.ticker.add(() => {
    // if (move) {
    //   const dx = player.x - target.x
    //   const dy = player.y - target.y
    //   const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    //   if(distance < speed) { // 距离小于一帧直接赋值
    //     player.x = target.x
    //     player.y = target.y
    //     move = false
    //   } else {
    //     player.x = player.x + speed * Math.cos(radian)
    //     player.y = player.y + speed * Math.sin(radian)
    //   }
    //   player.rotation = radian
    // }
    if (move) {
      const dx = yajiRun.x - target.x
      const dy = yajiRun.y - target.y
      const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
      if(distance < speed) { // 距离小于一帧直接赋值
        yajiRun.x = target.x
        yajiRun.y = target.y
        move = false
      } else {
        yajiRun.x = yajiRun.x + speed * Math.cos(radian)
        yajiRun.y = yajiRun.y + speed * Math.sin(radian)
      }
      yajiRun.rotation = radian
    }
  })
}