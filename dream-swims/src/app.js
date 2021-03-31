import { Application } from 'pixi.js'
import { WIDTH, HEIGHT } from './config'
export function appFactory() {
  const app = new Application({
    width: WIDTH,
    height: HEIGHT,
    view: document.getElementById('canvas'),
    antialias: true,    // default: false 反锯齿
    transparent: false, // default: false 透明度
    resolution: 1       // default: 1 分辨率
  })
  
  app.view.oncontextmenu = (e) => {  e.preventDefault()}
  return app
}