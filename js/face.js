// script to position images such that the faces are at the centre of the photo
var photos = Array.from(document.querySelectorAll('.profile-photo'))
var faces = []

photos.forEach(function (photo, index) {
  console.log(photo.src)
  if (photo.src) {
    faces[index] = detectFace(photo.src)
  }
})

// reposition faces
faces.forEach(function (face, index) {
  if (face.faces[0]) {
    // calculate the center of face
    console.log(face.faces[0].x);
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
