console.log('service worker js');
self.addEventListener('install', function(event) {
  console.log('install');
  event.waitUntil(
    caches.open('v1')
      .then(function(cache){
        return cache.addAll([
          '/serviceworkers/'
          , '/serviceworkers/index.html'
          , '/serviceworkers/index.js'
          //, '/serviceworkers/img/alpaca.png'
          , '/serviceworkers/img/alpaca-looking-the-other-way.png'
        ])
      })
  )
});

self.addEventListener('fetch', function(event) {
  console.log('requested resource: ', event.request.url)

  const requestedResource  = event.request.url;

  event.respondWith(
    //caches.match(event.request)
    caches.open('v1')
    .then(function(cache){
      // cache.keys().then(function(keys){
      //   keys.forEach(function(key) {
      //     console.log('key: ', key.url)
      //   })
      // })

      return cache.match(event.request)
    })
    .then(function(response) {
      if (response !== undefined) {
        console.log(requestedResource + ' found item in cache')
        return response
      } else {
        console.log(requestedResource + ' not found in cache fetching...')
        return fetch(event.request)
        .then(function (response) {
          console.log('fetch ' + event.request.url + ' success.')
          // const responseClone = response.clone();
          // console.log("huh? ", requestedResource.endsWith('alpaca.png'))
          // if (!requestedResource.endsWith('alpaca.png')) {
          //   //console.log('fetching ' + requestedResource + ' from cache')
          //   caches.open('v1')
          //     .then(function(cache) {
          //       console.log('opened cache saving cloned response for ' + requestedResource)
          //       cache.put(event.request, responseClone)
          //     })
          // } else {
          //   // throw('no alpachas for you')
          // }
          return response
        })
        .catch(function(error) {
          console.log('fetch failed for ' + requestedResource + ' pulling default from cache', error)
          return caches.match('/serviceworkers/img/alpaca-looking-the-other-way.png')
        })
      }
  }));
});
