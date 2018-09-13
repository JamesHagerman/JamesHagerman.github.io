
let Router = {
  mockRoutes: [
    {
      path: '#home',
      loader: () => {
        console.log(`home`)
      }
    },
    {
      path: '#projects',
      loader: () => {
        console.log(`projects`)
      }
    }
  ],
  init: () => {

  },
  loadRoute: function() {
    let self = this

    // Determine path:
    let path = this.getPathFromURL()
    
    // Attempt to load path
    let matchingRoutes = this.mockRoutes.filter((ele) => {
      return ele.path === path
    })

    if (matchingRoutes.length > 0) {
      let routeLoad = matchingRoutes[0]
      
      if (typeof routeLoader === 'function') {
        console.log('loading route')
        routeLoader()
      } else {
        console.log(`route ${path} not found`)
      }
    } else {
      console.log('loading default route...')
    }
    return path
  },
  getPathFromURL: () => {
    return window.location.hash
  }
}


export default Router
