
import rough  from 'roughjs'
import { Tween, Easing, getAll, remove } from '@tweenjs/tween.js'

const svg = document.getElementById('svg')
const rc = rough.svg(svg);
let mouth, timer
let tear = {height :0}
let dash = {offset: 200}

function getTear(x, y, width = 20, height = 60, radian = 15) {
  return `M${x} ${y} L${x + width} ${y} L${x + width} ${y + height} Q${x + width / 2} ${y + height + radian} ${x} ${y+height} L${x} ${y}`
}

function getMouth() {
  let m = rc.curve([[200, 360], [280, 380], [340, 360]])
  m.style['strokeDasharray'] = 200
  m.style['strokeDashoffset'] = dash.offset
  return m
}

function stage() {
  svg.appendChild(rc.circle(300, 300, 300, {
    fill: 'yellow'
  }))
  svg.appendChild(rc.rectangle(160, 220, 60, 40, {
    fill: 'white'
  }))
  svg.appendChild(rc.rectangle(300, 220, 60, 40, {
    fill: 'white'
  }))
  svg.appendChild(rc.circle(180, 240, 15, {
    fill: 'black'
  }))
  svg.appendChild(rc.circle(326, 240, 15, {
    fill: 'black'
  }))
  let tear1 = rc.path(getTear(176, 255, 20, tear.height), {
    stroke: 'blue',
    strokeWidth: '1',
    fill: 'blue'
  })
  let tear2 = rc.path(getTear(316, 255, 20, tear.height), {
    stroke: 'blue',
    strokeWidth: '1',
    fill: 'blue'
  })
  mouth = getMouth()
  svg.appendChild(tear1)
  svg.appendChild(tear2)
  svg.appendChild(mouth)
}
const mouthTween = new Tween(dash).to({offset: 0}, 2000).easing(Easing.Quadratic.In).onUpdate(() => {
  mouth.style['strokeDashoffset'] = dash.offset
}).onComplete(() => {
  remove(mouthTween)
}).start()
const tearTween = new Tween(tear).to({height: 60}, 2000).easing(Easing.Quadratic.In).onComplete(() => {
  remove(tearTween)
}).start()
stage()


function animate() {
	timer = requestAnimationFrame(animate)
	getAll().forEach((t) => {
    t.update()
  })
}

animate()
setInterval(() => {
  svg.innerHTML = ''
  stage()
}, 400)

// function animation() {
//   svg.innerHTML = ''
//   stage()
//   requestAnimationFrame(animation)
// }
// animation()
