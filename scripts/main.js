import Router from './router.js'

// TODO:
// Header
// Menu
// License info

let manageDOM = () => {
  // Router
  // Should load routes from static file
  // Each route should contain content from static file
  let route = Router.loadRoute()
  
  // Plant
  console.log(`route: ${route}`)
  if (route === '' || route === '#home') {
    let canvas = document.getElementsByClassName('main_canvas')[0]
    if (typeof canvas !== 'undefined') {
      Plant.init(canvas)
      Plant.draw()
    } else {
      console.warn(`Couldn't find a canvas...`, canvas)
    }
  } else {
    console.log('show project header')
  }
}

let manageSite = () => {

}


// Site loader:
let loadCheck = () => {
  switch (document.readyState) {
    case 'loading':
      console.log('loadCheck: loading')
      break
    case 'interactive':
      // Time to add some DOM nodes...
      console.log('loadCheck: interaative')
      manageDOM()
      break
    case 'complete':
      // Time to run some code...
      console.log('loadCheck: complete')
      manageSite()
      break
  }
}

// Entry point:
document.onreadystatechange = loadCheck
loadCheck() // in case our event wasn't bound in time...


