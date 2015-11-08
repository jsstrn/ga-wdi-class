// script to position images such that the faces are at the centre of the photo
var photos = Array.from(document.querySelectorAll('.profile-photo'))
var faces = []

photos.forEach(function (photo, index) {
  detectFace(photo.src, index)
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
  var xhr = new XMLHttpRequest()

  var xhrURL = 'https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=' + encodeURIComponent(photoURL)
  xhr.open('GET', xhrURL, false)
  xhr.setRequestHeader('X-Mashape-Key', 'AW9rHKeDMemshWrWBkNDqtKTdoTNp147i4QjsnJw7e9nDu5Mez')
  xhr.setRequestHeader('Accept', 'application/json')

  // xhr.onload = function (e) {
  //   if (xhr.readyState === 4) {
  //     if (xhr.status === 200) {
  //       console.log(xhr.responseText)
  //       faces[index] = responseText
  //     } else {
  //       console.error(xhr.statusText)
  //     }
  //   }
  // }
  // xhr.onerror = function (e) {
  //   console.error(xhr.statusText)
  // }

  xhr.send()
  return JSON.parse(xhr.response)
}

// function to position face at the center of the photo container
// arguments:
//  photo - photo object
//  faceX - x coordinate of the face
//  faceY - y coordinate of the face
// apply CSS styling to position image according the the coordinates

function repositionPhoto (photo, faceX, faceY) {
  // body...
}


// sample data - steve
// center x 58.308605
// center y 29.25
