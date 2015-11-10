var fs = require('fs')
var apiKey = require('./config')
// script to position images such that the faces are at the centre of the photo
var photos = Array.from(document.querySelectorAll('.profile-photo'))

photos.forEach(function (photo, index) {
  // call API only if an img src is present
  if (photo.src) {
    detectFace(photo.src, index)
  }
})

// function to call face recognition API
// it should take the URL of the photo, send to the API
// receive the x, y coordinate of the photo
function detectFace (photoURL, index) {
  var apiURL = 'https://apicloud-facerect.p.mashape.com/process-url.json?url=' + encodeURIComponent(photoURL)

  // call API using fetch()
  var headers = new Headers()
  headers.append('X-Mashape-Key', apiKey)
  headers.append('Accept', 'application/json')
  var init = {
    method: 'GET',
    headers: headers
  }
  var request = new Request(apiURL)
  fetch(request, init).then(function (response) {
    return response.json()
  }).then(function (data) {
    var face = data.faces[0]
    var image = data.image
    // reposition only if a face was detected and image is not in square format.
    if (face && image.height !== image.width) {
      repositionFace(face, image, index)
    }
  }).catch(error => {
    console.error(error)
  })
}

// reposition face
function repositionFace (face, image, index) {
  var adjust
  console.log(photos[index])
  if (image.height > image.width) {
    // vertical adjust
    adjust = calculateAdjustment(image.height, image.width, face.y, face.height)
    photos[index].style.objectPosition = '0 ' + adjust + 'px'
  } else {
    // horizontal adjust
    adjust = calculateAdjustment(image.width, image.height, face.x, face.width)
    photos[index].style.objectPosition = adjust + 'px' + ' 0'
  }
}

function calculateAdjustment (length, width, faceCoord, faceDim) {
  var scale = 256 / width
  var scaleCenter = scale * (faceCoord + faceDim / 2)
  var scaleLength = scale * length
  var adjust
  if (scaleCenter < 128) {
    // if face center < 128 ===> do not adjust
    adjust = 0
  } else if (scaleCenter > scaleLength - 128) {
    // if face center > length - 128 ==> adjust by length - 128
    adjust = 128 - scaleLength
  } else {
    adjust = Math.floor(128 - scaleCenter)
  }
  return adjust
}
