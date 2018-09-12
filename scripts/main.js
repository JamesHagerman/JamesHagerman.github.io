let canvas = document.getElementsByClassName('main_canvas')[0]

if (typeof canvas !== 'undefined') {
  Plant.init(canvas)
  Plant.draw()
} else {
  console.warn(`Couldn't find a canvas...`, canvas)
}
