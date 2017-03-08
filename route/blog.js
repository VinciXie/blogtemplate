const blog = require('../model/blog')


var all = {
    path: '/api/blog/all',
    method: 'get',
    func: function(request, response) {
        var blogs = blog.all()
        var r = JSON.stringify(blogs)
        response.send(r)
    }
}

var add = {
    path: '/api/blog/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // console.log('后端接收到的 form', form)
        // 插入新数据并返回
        // 验证密码
        if(form.mima == 'xei') {
            // console.log('密码为空');
            var b = blog.new(form)
            var r = JSON.stringify(b)
        } else {
            var r = JSON.stringify("请输入正确的密码！")
        }
        response.send(r)
        // 这句会在控制台出现
    }
}

/*
route/blog.js 中增加一个一个路由处理函数
请求 POST /api/blog/delete 来删除一个博客
ajax 传的参数是下面这个对象的 JSON 字符串
{
    id: 1
}
*/
var del = {
    path: '/api/blog/del',
    method: 'post',
    func: function(request, response) {
        // console.log('request.body', request.body);
        var form = request.body
        // 抄上面的
        var b = blog.del(form)
        var r = JSON.stringify(b)
        // if(form.mima == '') {
        // } else {
        //     var r = JSON.stringify({
        //
        //     })
        // }
        response.send(r)
    }
}

// 选中某篇博客的时候，将博客的 id 发过来，取得该博客，传回前端
var select = {
  path: '/api/blog/:id',
  method: 'get',
  func: function(request, response) {
    var blog_id = request.params.id;
    var blog_item = blog.select(blog_id)
    response.send(blog_item)
    // console.log('blog_item', blog_item);
    // {"title":"吃瓜",
    // "author":"gua",
    // "tag":"首页",
    // "content":"测试内容测试内容测试内容测试内容",
    // "created_time":1483600648,"id":1,
    // "comments":[]
    // }

  }
}


var routes = [
    all,
    add,
    del,
    select,
]

module.exports.routes = routes
