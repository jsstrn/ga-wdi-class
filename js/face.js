// script to position images such that the faces are at the centre of the photo
var photos = Array.from(document.querySelectorAll('.profile-photo'))
var faces = []

photos.forEach(function (photo) {
  var face = detectFace(photo.src)
  if (face) {
    // center of face
    var faceX = face[0].x + face[0].width / 2
    var faceY = face[0].y + face[0].height / 2
    // reposition face
    var posX = 256 / 2 - faceX
    var posY = 256 / 2 - faceY
    // apply css style to photos[index]
    photo.style.objectFit = 'none'
    photo.style.objectPosition = posX + 'px ' + posY + 'px'
  }
})

// function to call face recognition API
// it should take the URL of the photo, send to the API
// receive the x, y coordinate of the photo
function detectFace (photoURL) {
  var xhr = new XMLHttpRequest()

  var xhrURL = 'https://apicloud-facerect.p.mashape.com/process-url.json?url=' + encodeURIComponent(photoURL)
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

// sample data - steve
// {
//   "faces": [
//     {
//       "orientation": "frontal",
//       "x": 199,
//       "y": 154,
//       "width": 186,
//       "height": 186
//     }
//   ],
//   "image": {
//     "width": 500,
//     "height": 889
//   }
// }
// center of face
// centerx = x + width/2
// centery = y + width/2
  // centerx = 199 + 186/2 = 292
  // centery = 154 + 186/2 = 247
// posX = 256/2 - centerx
// posY = 256/2 - centery
  // posX = 256/2 - 292 = -164
  // posY = 256/2 - 247 = -119
// Irvin
// {
//   "faces": [
//     {
//       "orientation": "frontal",
//       "x": 22,
//       "y": 59,
//       "width": 124,
//       "height": 124
//     }
//   ],
//   "image": {
//     "width": 272,
//     "height": 234
//   }
// }
// posX = 256/2 - (22 + 124/2) = 44
// posY = 256/2 - (59 + 124/2) = 7
