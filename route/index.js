
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

var index1 = {
    path: '/index1',
    method: 'get',
    func: function(request, response) {
        var path = 'index1.html'
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


var resume = {
    path: '/resume',
    method: 'get',
    func: function(request, response) {
        var path = 'resume.html'
        sendHtml(path, response)
    }
}

var acheng = {
    path: '/acheng',
    method: 'get',
    func: function(request, response) {
        var path = 'acheng.html'
        sendHtml(path, response)
    }
}



var routes = [
    index,
    index1,
    blog_index,
    login,
    demo,
    resume,
    acheng
]

module.exports.routes = routes
