// script to position images such that the faces are at the centre of the photo
var photos = Array.from(document.querySelectorAll('.profile-photo'))

photos.forEach(function (photo, index) {
  // call API only if an img src is present
  if (photo.src) {
    console.log(photo.src)
    // faces[index] = detectFace(photo.src)
    detectFace(photo.src, index)
  }
})

// reposition face
function repositionFace (face, index) {
  // calculate the center of face
  var faceX = face.faces[0].x + face.faces[0].width / 2
  var faceY = face.faces[0].y + face.faces[0].height / 2
  // reposition face
  var posX = 256 / 2 - faceX
  var posY = 256 / 2 - faceY
  // apply css style to corresponding img
  photos[index].style.objectFit = 'none'
  photos[index].style.objectPosition = posX + 'px ' + posY + 'px'

  // NEED TO SCALE THE IMAGE -- HOW TO???
  // var scale = 256 / face.faces[0].width
}

// function to call face recognition API
// it should take the URL of the photo, send to the API
// receive the x, y coordinate of the photo
function detectFace (photoURL, index) {
  var xhr = new XMLHttpRequest()

  var xhrURL = 'https://apicloud-facerect.p.mashape.com/process-url.json?url=' + encodeURIComponent(photoURL)
  xhr.open('GET', xhrURL, true)

  xhr.setRequestHeader('X-Mashape-Key', apiKey)
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var face = JSON.parse(xhr.response)
        if (face.faces[0]) {
          repositionFace(face, index)
        }
      } else {
        console.error(xhr.statusText)
      }
    }
  }
  xhr.onerror = function (e) {
    console.error(xhr.statusText)
  }

  xhr.send()
}
