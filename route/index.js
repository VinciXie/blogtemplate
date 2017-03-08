
var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data){
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

var index = {
    path: '/',
    method: 'get',
    func: function(request, response) {
        var path = 'index.html'
        sendHtml(path, response)
    }
}

var blog_index = {
    path: '/blog',
    method: 'get',
    func: function(request, response) {
        var path = 'blog_index.html'
        sendHtml(path, response)
    }
}


var login = {
    path: '/login',
    method: 'get',
    func: function(request, response) {
        var path = 'login.html'
        sendHtml(path, response)
    }
}


var demo = {
    path: '/demo',
    method: 'get',
    func: function(request, response) {
        var path = 'demo.html'
        sendHtml(path, response)
    }
}

var routes = [
    index,
    blog_index,
    login,
    demo,
]

module.exports.routes = routes
