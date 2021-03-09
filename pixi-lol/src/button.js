import { Graphics, Text } from 'pixi.js'
export function getButton(text) {
  const button = new Graphics()
  button.lineStyle(2, 0x000, 0.3)
  button.beginFill(0xF5E817)
  button.drawPolygon([
    0, 0,
    180, 0,
    150, 48,
    0, 48,
  ])
  button.endFill();
  button.interactive = true;
  if(text) {
    const message = new Text(text)
    message.x = 28
    message.y = 12
    message.style = { fill: "black", fontSize: 24 }
    button.addChild(message)
    button.on('mouseover', () => {
      message.style.fill = 'white'
    })
    button.on('mouseout', () => {
      message.style.fill = 'black'
    })
  }
  return button
}