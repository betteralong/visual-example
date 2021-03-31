import { Sprite } from 'pixi.js'
import { appFactory } from './app'
import { IMAGES, MAP_OBSTACLES } from './config.js'
import { MapGuide } from './mapGuide'
import { Player } from './player'
const app = appFactory()
app.loader.add(IMAGES).load(setup)
let mapGuide, jianxiake

function setup() {
  initScene()
}

function initScene() {
  const mapTexture = app.loader.resources['background'].texture
  const map = new Sprite(mapTexture)
  app.stage.addChild(map)

  jianxiake = new Player(
    [ 
      app.loader.resources['player1'].texture,
      app.loader.resources['player2'].texture,
      app.loader.resources['player3'].texture,
      app.loader.resources['player4'].texture,
      app.loader.resources['player5'].texture
    ]
  )
  mapGuide = new MapGuide(MAP_OBSTACLES, jianxiake, app.stage)
  mapGuide.drawObstacles()
  app.stage.addChild(jianxiake)
  app.stage.interactive = true
  app.stage.on('click', e => {
    const { x ,y } = e.data.global
    mapGuide.pathTo({x,y})
  })
}