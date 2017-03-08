var ajax = function(request) {
    /*
    request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function
    */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

var e = function(selector) {
  return document.querySelector(selector)
}

var blogNew = function(form) {
    // var form = {
    //     title: "测试标题",
    //     author: "gua",
    //     tag:"代码",
    //     content: "测试内容",
    //     mima: "xxx",
    // }
    var data = JSON.stringify(form,null,1)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('blogNew响应', response)
            var res = JSON.parse(response)
            if (typeof res == String) {
              alert(res)
            }
        }
    }
    ajax(request)
}


var blogDel = function(num) {
    // var form = {
    //     title: "测试标题",
    //     author: "gua",
    //     content: "测试内容",
    // }
    var form = {
      id: num
    }
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/del',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            // console.log('响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}


// 绑定发表新博客事件
var buttonA = e('#id-button-submit')
buttonA.addEventListener('click', function(event){
    // console.log('click new')
    // 得到用户填写的数据
    var form = {
        title: e('#id-input-title').value,
        author: e('#id-input-author').value,
        tag: e('#id-input-tag').value,
        content: e('#id-input-content').value,
        mima: e('#id-input-mima').value
    }
    // console.log('获取的form：', form)
    // 用这个数据调用 blogNew 来创建一篇新博客
    blogNew(form)
})
