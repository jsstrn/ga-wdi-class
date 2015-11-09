require('config')

// script to position images such that the faces are at the centre of the photo
var photos = Array.from(document.querySelectorAll('.profile-photo'))
var faces = []

photos.forEach(function (photo, index) {
  // call API only if an img src is present
  if (photo.src) {
    faces[index] = detectFace(photo.src)
  }
})

// reposition faces
faces.forEach(function (face, index) {
  // reposition only if the API found a face in the photo
  if (face.faces[0]) {
    // calculate the center of face
    var faceX = face.faces[0].x + face.faces[0].width / 2
    var faceY = face.faces[0].y + face.faces[0].height / 2
    // reposition face
    var posX = 256 / 2 - faceX
    var posY = 256 / 2 - faceY
    // apply css style to corresponding img
    photos[index].style.objectFit = 'none'
    photos[index].style.objectPosition = posX + 'px ' + posY + 'px'

    // NEED TO SCALE THE IMAGE
  }
})

// function to call face recognition API
// it should take the URL of the photo, send to the API
// receive the x, y coordinate of the photo
function detectFace (photoURL) {
  var xhr = new XMLHttpRequest()

  var xhrURL = 'https://apicloud-facerect.p.mashape.com/process-url.json?url=' + encodeURIComponent(photoURL)
  xhr.open('GET', xhrURL, false) // need to change to asynchronous request
  // COMPROMISED KEY
  // xhr.setRequestHeader('X-Mashape-Key', 'AW9rHKeDMemshWrWBkNDqtKTdoTNp147i4QjsnJw7e9nDu5Mez')

  xhr.setRequestHeader('X-Mashape-Key', api-key)
  xhr.setRequestHeader('Accept', 'application/json')

  // Synchronous XMLHttpRequest on the main thread is deprecated because of
  // its detrimental effects to the end user's experience.
  // For more help, check http://xhr.spec.whatwg.org/.

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
