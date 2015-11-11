// This script reads data.json file then detects faces in each person's image and store the facial data into data.json


var apiKey = $MASHAPE_TOKEN

// fetch data from data.json
fetch('js/data.json')
  .then(response => response.json())
  .then(data => {
    // do your stuff here with `data`
    data.instructors.forEach(instructor => {
      detectFace(instructor)
    })
    data.students.forEach(student => {
      detectFace(student)
    })
  })
  .catch(error => {
    // something went wrong, tell the user maybe?
    console.error(error)
  })

// NEED TO SAVE INTO data.json


// function to call face recognition API
function detectFace (object) {
  var photoURL = document.baseURI + instructor.imagePath
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
    // store data into JSON object
    console.log(data)
    object.faceData = data
  }).catch(error => {
    console.error(error)
  })
}
