// var source = $('#instructor-template').html()
// var template = Handlebars.compile(source)

var insertInstructors = document.querySelector('div #instructors')
var insertStudents = document.querySelector('div #students')

function insertPanel (name, imagePath, faceData) {
  // create elements
  var divCol = document.createElement('div')
  var divPanel = document.createElement('div')
  var divPanelHead = document.createElement('div')
  var divPanelBody = document.createElement('div')
  var h3 = document.createElement('h3')
  var img = document.createElement('img')
  // create classes
  divCol.className = 'col-md-6'
  divPanel.className = 'panel panel-default'
  divPanelHead.className = 'panel-heading'
  divPanelBody.className = 'panel-body'
  h3.className = 'panel-title'
  img.className = 'profile-photo img-rounded'
  // insert data
  h3.textContent = name
  img.src = imagePath
  // reposition image if there is faceData
  if (faceData) {
    var face = faceData.faces[0]
    var imgHeight = faceData.image.height
    var imgWidth = faceData.image.width
    // reposition only if a face was detected in the image and image is not in square format.
    if (face && imgHeight !== imgWidth) {
      var adjust
      if (imgHeight > imgWidth) {
        // vertical adjust
        adjust = calculateAdjustment(imgHeight, imgWidth, face.y, face.height)
        img.style.objectPosition = '0 ' + adjust + 'px'
      } else {
        // horizontal adjust
        adjust = calculateAdjustment(imgWidth, imgHeight, face.x, face.width)
        img.style.objectPosition = adjust + 'px' + ' 0'
      }
    }
  }

  // append elements
  divPanelHead.appendChild(h3)
  divPanelBody.appendChild(img)
  divPanel.appendChild(divPanelHead)
  divPanel.appendChild(divPanelBody)
  divCol.appendChild(divPanel)

  return divCol
}

fetch('js/data.json')
  .then(response => response.json())
  .then(data => {
    data.instructors.forEach(instructor => {
      console.log(instructor.name)
      insertInstructors.appendChild(insertPanel(instructor.name, instructor.imagePath, instructor.faceData))
    })
  })
  .catch(error => {
    // something went wrong, tell the user maybe?
    console.error(error)
  })

fetch('js/dataWithFace.json')
  .then(response => response.json())
  .then(data => {
    var sortedStudents = _.sortBy(data, 'name')
    sortedStudents.forEach(student => {
      insertStudents.appendChild(insertPanel(student.name, student.imagePath, student.faceData))
    })
  })
  .catch(error => {
    // something went wrong, tell the user maybe?
    console.error(error)
  })

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
