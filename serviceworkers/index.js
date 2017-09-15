if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {scope: '/serviceworkers/'})
  .then(function(reg) {
    console.log('registration suceeeded')
  })
  .catch(function(error) {
    console.log('registration failed', error)
  })
}

//, '/serviceworkers/img/alpaca.png'
// , '/serviceworkers/img/alpaca-looking-the-other-way.png'
const headers = new Headers();
headers.append('Cache-Control', 'no-cache')
fetch ('/serviceworkers/img/alpaca.png', {headers: headers})
  .then(function(response){
    return response.blob()
  })
  .then(function(blob){
    const objectUrl = URL.createObjectURL(blob);
    const img = document.createElement('img')
    img.src = objectUrl;
    document.getElementById('content').appendChild(img);
  })
  .catch(function(error){
    console.log('alpaca fetch failed', error)
  })

  fetch ('/serviceworkers/img/alpaca-looking-the-other-way.png')
    .then(function(response){})
    .catch(function(error){
      console.log('other alpaca fetch failed', error)
    })
