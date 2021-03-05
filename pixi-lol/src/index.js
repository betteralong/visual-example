import { Container, Graphics, Rectangle, Sprite, Text } from 'pixi.js'
import { Tween, Easing } from '@tweenjs/tween.js'
import { WIDTH, HEIGHT, IMAGES } from './config'
import { appFactory } from './app'
import { playerFactory, monsterFactory} from './factory'
import { getButton } from './button'
const app = appFactory()
app.loader.add(IMAGES).load(setup)
let starScene, playScene, overScene, yaoji, timer, currentScene, score, scoreText
function setup() { 
  // 初始化场景
  initScene()
  app.ticker.add(() => {
    if (currentScene === 'play') { // 碰撞检测
      score++
      yaoji.walk()
      playScene.children.forEach(c => {
        if (c.name !== 'yaoji' && c.name !== 'map') {
          c.walk()
          if(hit(yaoji, c)) {
            changeScene('over')
          }
        }
      })
    }
    // 更新得分
    if (scoreText) {
      if (currentScene === 'start') {
        scoreText.visible = false
      } else {
        scoreText.visible = true
        if (currentScene === 'play') {
          scoreText.text  = `${++score}`
        }
      }
    }
  })
}

function initScene() {
  /********************* 场景一  ******************/
  starScene = new Container()
  starScene.name = 'start'
  const backgroundImage = new Sprite(app.loader.resources['starBackground'].texture)
  const scareX = WIDTH / backgroundImage.width
  const scareY = HEIGHT / backgroundImage.height
  backgroundImage.scale.set(scareX, scareY)
  starScene.addChild(backgroundImage)
  // 添加按钮
  const startButton = getButton('开始游戏')
  startButton.position.set(24, 240)
  starScene.addChild(startButton)
  startButton.on('click', () => {
    changeScene('play')
  })
  const otherButton = getButton('其他功能')
  otherButton.position.set(24, 320)
  starScene.addChild(otherButton)
  app.stage.addChild(starScene)
  starScene.visible = true
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
  const overText = new Text('加油，再来一次，你是下一个fake')
  overText.x = 300
  overText.y = HEIGHT / 2
  overText.align = 'center'
  overText.visible = false
  overText.style = { fill: "white", fontSize: 32 }
  overScene.visible = false
  overScene.addChild(overText)
  score = 0
  scoreText = new Text(`${score}`)
  scoreText.style = { fill: "red", fontSize: 32 }
  scoreText.position.set(WIDTH / 2, HEIGHT / 3)
  app.stage.addChild(scoreText)
  app.stage.addChild(overScene)
}

function changeScene(sceneName) {
  const scenes = [starScene, playScene, overScene ]
  scenes.forEach((scene) => {
    currentScene = sceneName
    if (sceneName === scene.name) {
      scene.visible = true
      if (sceneName === 'play') {
        score = 0
        yaoji.reset()
        timer = monsterFactory(playScene, yaoji, 2, 1000)
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

