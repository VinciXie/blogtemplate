const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const aqiModel = function(name, value) {
  this.name = name
  this.value = value
}

const aqiFromLi = function(body) {
  let $ = cheerio.load(body)
  let $rank = $('.rank_box')
  writeTheFile($rank.html(), 'aqi.json')
  console.log($rank.find('li').length);// 361 正确
  // 对每个 li 标签调用 aqiFromLi 函数
  var data = []
  $rank.find('li').each(function(i, element){
    let a = new aqiModel()
    a.name = $(this).find('.pjadt_location').text()
    a.value = Number($(this).find('.pjadt_pm25').text().split(' ')[0])
    data[i] = a
  })
  writeTheFile(data, 'data.json')
}

var writeTheFile = function(s, fileName) {
  var s = JSON.stringify(s, null, 1)
  fs.writeFile(fileName, s, function(err) {
    if (!err) {
      console.log('缓存成功', fileName);

    } else {
      log('缓存失败，err：', err)
    }
  })
}

var paqu = function() {
  var url = 'http://www.pm25.com/rank.html'
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      aqiFromLi(body)
    }
  })
}

paqu()

setInterval(paqu(), 43200000)
