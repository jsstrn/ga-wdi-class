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
  var xhr = new XMLHttpRequest()

  var xhrURL = 'https://apicloud-facerect.p.mashape.com/process-url.json?url=' + encodeURIComponent(photoURL)
  xhr.open('GET', xhrURL, true)
  xhr.setRequestHeader('X-Mashape-Key', apiKey)
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var res = JSON.parse(xhr.response)
        var face = res.faces[0]
        var image = res.image
        // reposition only if a face was detected and image is not in square format.
        if (face && image.height !== image.width) {
          repositionFace(face, image, index)
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
