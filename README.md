基本上每一个`Http`服务器的编程框架都是对`request`和`response`的处理。即处理浏览器对服务器的请求（`request`）和服务器对浏览器的响应（`response`）。

`request`是浏览器给服务器的请求，一般用到的是两种方法：`Post`和`Get`（Express也支持其它方法，如`put`）。两种方法都会指定路由，除此之外，`Get`方法的使用场景是浏览器向服务器请求数据，比如访问首页，即向浏览器请求首页内容，可以带参数指定需要哪些内容，所以我们需要既能获取路由还能获取参数；`Post`指的是向服务器推送内容，然后获得一个反馈，所以我们需要能获取`Post`的内容。

`request`提供了三种方法来获取参数和内容：`request.params`,`request.query`,`request.body`。

### request.params方法

`params`方法用于从express路由器获取参数，示例如下：
```
app.get('/find/:id', function(req,res){
	console.log(req.params.id);
	res.send(req.params.id);
})
```

然后在浏览器访问 http://localhost:3000/find/1

即可以看到控制台输出了1，同时界面上也显示1.

如果有多个参数，可以这样设置：`/find/:group/:name`，示例：
```
// params example2
app.get('/find/:group/:name', function(req, res) {
	console.log(req.params.group+" "+req.params.name);
	res.send(req.params.group+" "+req.params.name);
})
```
在浏览器访问：http://localhost:3000/find/a/b

### request.query方法
`request.query`获取`?`后的查询参数，很简单，示例如下：
```
app.get('/search', function(req, res){
	console.log(req.query.id)
	res.send(req.query.id)
})
```
访问示例：http://localhost:3000/search?id=1&name=a

### request.body
上述两个都是获取的get参数，下面获取一下Post的内容。目前，常见使用Post提交的场景有两个，表单提交和Ajax。下面以Ajax为例，介绍如何使用获取Post中的参数。

构造一个Ajax Post：
```
$.post("/add", {sid:sid});
```
向服务器提交sid。

后端代码如下：
```
var bodyParser = require("body-parser")
...
app.use(bodyParser.urlencoded({extended:true}))
...
app.post('/add', function(req, res) {
	var sid = req.body.sid;
	console.log(sid)
});
```
这里出现了一个新东西，`bodyParser`，在express 4.x中，我们需要单独引入`bodyParser`作为`post body`的解析器。在https://github.com/expressjs/body-parser 有这个模块的详细介绍。

如果是`json`数据提交，需要使用`bodyParser.json()`，文本则需`bodyParser.text()`（此时req.body的类型变成了字符串）。

