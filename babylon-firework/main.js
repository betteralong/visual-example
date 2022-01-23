import { Scene, Engine, ArcRotateCamera,Vector3,Color3 } from "@babylonjs/core"
import { Button,AdvancedDynamicTexture,Control } from '@babylonjs/gui'
import { artifice } from './artfice'

const getRandomBetween = (Min, Max) =>{
  let Range = Max - Min;
  let Rand = Math.random();
  let num = Min + Math.round(Rand * Range);
  return num;
}

class App {
  _scene
  _canvas
  _engine

  constructor() {
      this._canvas = this._createCanvas();
      this._engine = new Engine(this._canvas, true);
      this._scene = new Scene(this._engine);
      this._scene.clearColor = Color3.Black;
      const camera = new ArcRotateCamera("ArcRotateCamera", -1, 1, 100, new Vector3(0, 0, 0), this._scene);
	    camera.attachControl(this._canvas, true);
      this._createPlayButton()


      this._engine.runRenderLoop(() => {
          this._scene.render();
      })  
    }

    _createPlayButton() {
      const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
      const button = Button.CreateSimpleButton("playButton", "发射");
      button.width = "150px"
      button.height = "40px";
      button.color = "white";
      button.posi
      button.cornerRadius = 20;
      button.background = "red";
      button.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
      button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
      button.onPointerUpObservable.add(()=> {
        const x = getRandomBetween(-20,20)
        this.play(x)
      });
      advancedTexture.addControl(button);
    }

    play(x) {
      const firework = new artifice(this._scene)
      firework.shoot(x)
    }

    _createCanvas(id = 'babylon') {
      document.documentElement.style["overflow"] = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.width = "100%";
      document.documentElement.style.height = "100%";
      document.documentElement.style.margin = "0";
      document.documentElement.style.padding = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.margin = "0";
      document.body.style.padding = "0";

      this._canvas = document.createElement("canvas");
      this._canvas.style.width = "100%";
      this._canvas.style.height = "100%";
      this._canvas.id = id;
      document.body.appendChild(this._canvas);

      return this._canvas;
    }
  }
const app = new App();

app.play()
