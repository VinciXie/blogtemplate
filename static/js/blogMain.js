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
var es = function(selector) {
    return document.querySelectorAll(selector)
}

var blogListTemplate = function({id, title, author, created_time}) {
  // 博客列表的模板
  // blogAll 方法会调用此函数，将博客列表插入页面
    // var id = blog.id
    // var title = blog.title
    // var author = blog.author
    // 用解构的方法改写
    // let {id, title, author, created_time} = blog
    var d = new Date(created_time * 1000)
    var time = d.toLocaleString()
    var t = `
    <div class="blog-list-item">
      <div data-id="${id}">${title}</div>
      <time>${time}</time>
    </div>
    `
    return t
}

var blogTemplate = function({title, author, created_time, content}) {
  // 这个是博客文章页面的模板
  // 当点击具体的博客的时候，会执行 insertSelectedBlog 方法
  // insertSelectedBlog 方法调用此函数生成博客文章内容，插入页面之中
    // var title = blog.title
    // var author = blog.author
    var d = new Date(created_time * 1000)
    var time = d.toLocaleString()
    // var content = blog.content
    var t = `
        <div class="author-info">
            <span>${author}</span> @ <time>${time}</time>
        </div>
        <div class="blog-content">
          ${content}
        </div>
    `
    return t
}

// <div class="blog-comments">
//     <div class='new-comment'>
//         <input class='comment-blog-id' type=hidden value="${id}">
//         <input class='comment-author' value="">
//         <input class='comment-content' value="">
//         <button class='comment-add'>添加评论</button>
//     </div>
// </div>

var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = blogs.length-1; i >= 0 ; i--) {
        var b = blogs[i]
        if (i == blogs.length-1) {
          let asideList = document.querySelector('.aside-list')
          asideList.innerText = b.title
        }
        var t = blogListTemplate(b)
        html += t
    }
    // 把数据写入 .blog-list 中, 直接用覆盖式写入
    var div = document.querySelector('.blog-list')
    div.innerHTML = html
}

var insertSelectedBlog = function(blog) {
    var html = ''
    // {"title":"吃瓜",
    // "author":"gua",
    // "tag":"首页",
    // "content":"测试内容测试内容测试内容测试内容",
    // "created_time":1483600648,"id":1,
    // "comments":[]
    // }
    html = blogTemplate(blog)
    // 把数据写入 .gua-blogs 中, 直接用覆盖式写入
    var blogList = e('.blog-list')
    blogList.classList.add('none')
    var header = e('header')
    header.innerHTML = blog.title
    var article = e('article')
    article.classList.remove('none')
    article.innerHTML = html
    var md = new Remarkable()
    var content = e('.blog-content')
    content.innerHTML = md.render(blog.content)
}

var bom = function(blog) {
  let state = {
    num: blog.id
  }
  var title = blog.title
  // console.log('pushState 里面的 title', title);
  let path = "#" + state.num
  history.pushState(state, title, path)
  var htmlTitle = e('title')
  htmlTitle.innerText = title
}

var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            sessionStorage.response = response
            var blogs = JSON.parse(response)
            console.log('响应blogs', blogs)
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

var blogSelect = function(num) {
    var request = {
        method: 'GET',
        url: '/api/blog/' + num,
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            // console.log('响应', response)
            var blog = JSON.parse(response)
            insertSelectedBlog(blog)
            // {"title":"吃瓜",
            // "author":"gua",
            // "tag":"首页",
            // "content":"测试内容测试内容测试内容测试内容",
            // "created_time":1483600648,"id":1,
            // "comments":[]
            // }
        }
    }
    ajax(request)
}

var bindEvents = function() {

    // 选择一个博客类别
    // var tags = e('nav > ul')
    // tags.addEventListener('click', function() {
    //   let target = event.target
    //   var active = e('.active')
    //   active.classList.remove('active')
    //   target.classList.add('active')
    //   let tagName = target.innerText
    //   if (tagName == "代码") {
    //
    //   }
    //   var article = e('article')
    //   article.classList.add('none')
    //   var blogList = e('.blog-list')
    //   blogList.classList.remove('none')
    //   var header = e('header')
    //   header.innerHTML = tagName
    //   var htmlTitle = e('title')
    //   htmlTitle.innerText = '谢文奇的个人博客'
    // })

    // 删除一篇博文
    // var blogsDiv = e('.blog-list')
    // blogsDiv.addEventListener('click', function(event){
    //     var target = event.target
    //     console.log('click事件委托',  target)
    //     if (target.innerHTML == "删除博文") {
    //       let num = target.dataset.id
    //       console.log('num', num)
    //       blogDel(num)
    //     }
    // })

    // 选择一篇博文
    var blogsDiv = e('.blog-list')
    // 给父元素绑定事件，事件委托
    blogsDiv.addEventListener('click', function(event){
        var target = event.target
        // 如果有 dataset.id 存在，则执行下面语句
        // console.log('click事件委托',  target)
        if (target.dataset.id) {
          let num = target.dataset.id
          // console.log('num', num)
          blogSelect(num)
          // 接着 BOM 操作
          let blogs = JSON.parse(sessionStorage.response)
          let blog = blogs[num-1]
          bom(blog)
        }
    })

    // 当地址栏输入带 # 的 url，要能够跳转到响应的页面
    var hash = window.location.hash
    console.log('hash', hash);
    if (hash) {
      // 如果 hash 存在
      let num = hash.slice(1)
      blogSelect(num)
      // 接着 BOM 操作
      let blogs = JSON.parse(sessionStorage.response)
      let blog = blogs[num-1]
      bom(blog)
    }

    // 用户点击 前进 后退 按钮的时候, 会触发 window 的 popstate 事件
    // 于是可以在这里操作
    window.addEventListener("popstate", function(e) {
        var state = e.state;
        // state 就是 pushState 的第一个参数
        console.log('pop state', state)
        if (state == null) {
          location.reload()
        } else {
          blogSelect(state.num)
        }
    })

}

var __main = function() {
    // 载入博客列表
    blogAll()
    // 绑定事件
    bindEvents()
}

__main()
