import { Container, Graphics, Rectangle, Sprite, Text, filters, SCALE_MODES } from 'pixi.js'
import { Tween, Easing } from '@tweenjs/tween.js'
import { WIDTH, HEIGHT, IMAGES } from './config'
import { appFactory } from './app'
import { playerFactory, monsterFactory} from './factory'
import { getButton } from './button'
const app = appFactory()

app.loader.add(IMAGES).load(setup)
let startScene, playScene, overScene, yaoji, timer, currentScene, score, scoreText
function setup() { 
  // 初始化场景
  initScene()
  app.ticker.add(() => {
    if (currentScene === 'play') {
      scoreText.text  = `${++score}`  // 更新得分
      yaoji.walk()
      playScene.children.forEach(c => {
        if (c.name !== 'yaoji' && c.name !== 'map') {
          c.walk()
          if(hit(yaoji, c)) { // 碰撞检测
            changeScene('over')
          }
        }
      })
    }
  })
}

// 开场动画
function beginAnimation() {
  if (startScene) {
    // 圆的内半径
    const radius = 100;
    // 模糊量
    const blurSize = 32;
    const circle = new Graphics()
      .beginFill(0xFF0000)
      .drawCircle(radius + blurSize, radius + blurSize, radius)
      .endFill()
    circle.filters = [new filters.BlurFilter(blurSize)];
    const bounds = new Rectangle(0, 0, WIDTH, HEIGHT);
    const texture = app.renderer.generateTexture(circle, SCALE_MODES.NEAREST, 1, bounds);
    const focus = new Sprite(texture);
    app.stage.addChild(focus);
    const backgroundImage = startScene.getChildByName('background')
    backgroundImage.mask = focus
    let animateTimer = null
    const tween = new Tween(focus.scale).to({
      x: 5,
      y: 5,
    }, 1500).easing(Easing.Quadratic.In).onComplete((() => {
      if(animateTimer) {
        cancelAnimationFrame(animateTimer)
        animateTimer = null
      }
    })).start()

    function animate() {
      animateTimer = requestAnimationFrame(animate)
      tween.update()
    }
    requestAnimationFrame(animate)
  }
}

function initScene() {
  /********************* 场景一  ******************/
  startScene = new Container()
  startScene.name = 'start'
  const backgroundImage = new Sprite(app.loader.resources['starBackground'].texture)
  backgroundImage.name = 'background'
  const scareX = WIDTH / backgroundImage.width
  const scareY = HEIGHT / backgroundImage.height
  backgroundImage.scale.set(scareX, scareY)
  startScene.addChild(backgroundImage)
  // 添加按钮
  const startButton = getButton('开始游戏')
  startButton.position.set(24, 240)
  startScene.addChild(startButton)
  startButton.on('click', () => {
    changeScene('play')
  })
  const otherButton = getButton('其他功能')
  otherButton.position.set(24, 320)
  startScene.addChild(otherButton)
  app.stage.addChild(startScene)
  startScene.visible = true
  beginAnimation()
  /********************* 场景二  ******************/
  playScene = new Container()
  playScene.name = 'play'
  const mapTexture = app.loader.resources['background'].texture
  const rectangle = new Rectangle(0, 1080, 1550, 900)
  mapTexture.frame = rectangle
  const map = new Sprite(mapTexture)
  map.name = 'map'
  const mapScareX = WIDTH / map.width
  const mapScareY = HEIGHT / map.height
  map.scale.set(mapScareX, mapScareY)
  playScene.addChild(map)

  // 添加妖姬
  yaoji = playerFactory(app.loader.resources['player'])
  yaoji.name = 'yaoji'
  playScene.addChild(yaoji)
  playScene.interactive = true;
  playScene.on("click", (e) => {
    const { x ,y } = e.data.global
    yaoji.goto(x, y)
  })
  app.stage.addChild(playScene)
  playScene.visible = false
  /********************* 场景三  ******************/
  overScene = new Container()
  overScene.name = 'over'
  const playButton = getButton('重新开始')
  playButton.position.set(24, 320)
  playButton.on('click', () => {
    changeScene('start')
  })
  overScene.addChild(playButton)
  const overText = new Text('加油，再来一次，你是下一个Faker')
  overText.x = 300
  overText.y = HEIGHT / 2
  overText.align = 'center'
  overText.style = { fill: "white", fontSize: 32 }
  overScene.visible = false
  overScene.addChild(overText)
  score = 0
  scoreText = new Text(`${score}`)
  scoreText.style = { fill: "red", fontSize: 32 }
  scoreText.position.set(WIDTH / 2, HEIGHT / 3)
  scoreText.visible = false
  app.stage.addChild(scoreText)
  app.stage.addChild(overScene)
}

function changeScene(sceneName) {
  const scenes = [startScene, playScene, overScene ]
  scenes.forEach((scene) => {
    currentScene = sceneName
    if (sceneName === scene.name) {
      scene.visible = true
      if (sceneName === 'start') {
        scoreText.visible = false
      }
      if (sceneName === 'play') {
        scoreText.visible = true
        score = 0
        yaoji.reset()
        timer = monsterFactory(playScene, yaoji, 1, 800)
      } else {
        if (timer) {
          clearInterval(timer)
          timer = null
        }
      }
    } else {
      scene.visible = false
    }
    if(sceneName === 'start') {
      playScene.children.forEach((c) => {
        if (c.name !== 'yaoji' && c.name !== 'map') {
          playScene.removeChild(c)
        }
      })
    }
  })
}

function hit(obj1, obj2) {
  let isHit = false
  const dx = obj1.x - obj2.x
  const dy = obj1.y - obj2.y
  const combinedHalfWidths = (obj1.width + obj2.width) / 2
  const combinedHalfHeights = (obj1.height + obj2.height) / 2
  if (Math.abs(dx) < combinedHalfWidths) {
    if (Math.abs(dy) < combinedHalfHeights) {
      isHit = true;
    }
  }
  return isHit
}

window.onbeforeload = () => {
  clearInterval(timer)
}

