// This script reads data.json file then detects faces in each person's image and saves the facial data into data.json
require('es6-promise').polyfill()
require('isomorphic-fetch')
var fs = require('fs')
var FormData = require('form-data')

var apiKey = process.env.MASHAPE_TOKEN || require('./config.js')

var persons
fs.readFile('js/data.json', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    persons = JSON.parse(data)

    // Works for students only, not instructors.
    Promise.all(persons.students
      .map(student => {
        return detectFace(student)
      })).then(faces => {
        saveJSON(faces, 'js/dataWithFace.json')
      })

    // Feeble attempt at handling multiple promises for both instructors and students
    // var buffer = {}
    // var instructorsFaces = {}
    // var studentsFaces = {}
    // Promise.all(
    //   Promise.all(persons.instructors
    //     .map(instructor => {
    //       return detectFace(instructor)
    //     })).then(faces => {
    //       instructorsFaces = faces
    //       console.log(instructorsFaces)
    //       // console.log(personsWithFaces)
    //       // return result
    //     }),
    //   Promise.all(persons.students
    //     .map(student => {
    //       return detectFace(student)
    //     })).then(faces => {
    //       studentsFaces = faces
    //       console.log(studentsFaces)
    //       // return result
    //     })
    // ).then(function () {
    //   buffer = {
    //     'instructors': instructorsFaces,
    //     'students': studentsFaces
    //   }
    //   console.log(buffer)
    // })

    // async function await -- suggested by seb
    //
    // async function getCoordinate (user) {
    //   return await fetch(... + user, init)
    //     .then(response => response.json())
    // }
    //
    // async function getAllTheThings () {
    //   var coordinates = await * users.map(getCoordinate)
    //   ... write coordinates to disk...
    // }

  }
})

// save into data.json
function saveJSON (data, file) {
  fs.writeFile(file, JSON.stringify(data, null, ' '), function (err) {
    if (err) throw err
    console.log('It\'s saved into ' + file)
  })
}

// function to call face recognition API
function detectFace (object) {
  var apiURL = 'https://apicloud-facerect.p.mashape.com/process-file.json'
  var init = {
    method: 'POST',
    headers: {
      'X-Mashape-Key': apiKey,
      'Accept': 'application/json'
    }
  }
  var formData = new FormData()

  if (object.imagePath.slice(0, 4) === 'http') return object // ignore images from other websites as they will cause unhandled createReadStream error
  var imageStream = fs.createReadStream(object.imagePath)
  formData.append('image', imageStream)
  init.body = formData

  return fetch(apiURL, init).then(function (response) {
    return response.json()
  }).then(function (data) {
    // store data into JSON object
    object.faceData = data
    return object
  }).catch(error => {
    console.error(error)
  })
}
