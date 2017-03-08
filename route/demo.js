const demo = require('../model/demo')


var aqi = {
  path: '/api/demo/aqi',
  method: 'get',
  func: function(request, response) {
    var data = demo.aqi()
    response.send(data)
  }
}

var update = {
  path: '/api/demo/update',
  method: 'get',
  func: function(request, response) {
    var data = demo.update()
    response.send(data)
  }
}

var routes = [
  update,
  aqi,
]

module.exports.routes = routes
