### 个人网站第二版

之前第一版写的页面简陋，于是重新搭建，同时加了一些新的东西，主要有：
- 博客部分单页方法的说明
- 爬虫和可视化的页面 [demo](xiewenqi.cc/demo)


文件分布如下
- appBlog.js          后端程序主文件
- /template           样板文件夹
  - index.html        个人网站主页
  - resume.html       个人简历
  - blog_index.html   博客主页的 html 文件
  - demo.html         demo 页面 html 文件
- /static             静态文件夹
  - /css
  - /js
  - /img
  - /font
- /route              路由文件夹
  - index.js          
  - blog.js          
  - demo.js    
- /model
  - blog.js           处理 blog 数据存取的文件
  - blog.js           处理 demo 的文件
- /db
  - blog.json         存储 blog 数据的文件(相当于数据库)

  主页面 bootstrap 框架搭建的响应式页面
  博客页面 SPA 效果
