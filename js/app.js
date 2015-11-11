var insertInstructors = document.querySelector('div #instructors')
var insertStudents = document.querySelector('div #students')

function insertPanel (name, imagePath) {
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
    // do your stuff here with `data`
    console.log(data)
    data.instructors.forEach(instructor => {
      console.log(instructor.name)
      insertInstructors.appendChild(insertPanel(instructor.name, instructor.imagePath))
    })
    data.students.forEach(student => {
      console.log(student.name)
      insertStudents.appendChild(insertPanel(student.name, student.imagePath))
    })
  })
  .catch(error => {
    // something went wrong, tell the user maybe?
    console.error(error)
  })
