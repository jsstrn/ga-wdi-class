// script to position images such that the faces are at the centre of the photo
var body = document.querySelector('body')
var photos = Array.from(document.querySelectorAll('.profile-photo'))
var faces = []
faces = photos.map(function (photo) {
  detectFace(photo.src)
})
// photos.forEach(function (photo) {
//   var face = detectFace(photo.src)
//   var faceX = face.face[0].position.center.x
//   var faceY = face.face[0].position.center.y
// })

// function to call face recognition API
// it should take the URL of the photo, send to the API
// receive the x, y coordinate of the photo
function detectFace (photoURL) {
  var req = new XMLHttpRequest()

  var reqURL = 'https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=' + encodeURIComponent(photoURL)
  req.open('GET', reqURL)
  req.setRequestHeader('X-Mashape-Key', 'AW9rHKeDMemshWrWBkNDqtKTdoTNp147i4QjsnJw7e9nDu5Mez')
  req.setRequestHeader('Accept', 'application/json')
  req.send()
  return JSON.parse(req.response)
}


// function to position face at the center of the photo container
// arguments:
//  photo - photo object
//  faceX - x coordinate of the face
//  faceY - y coordinate of the face
// apply CSS styling to position image according the the coordinates
function repositionPhoto(photo, faceX, faceY) {
  // body...
}
