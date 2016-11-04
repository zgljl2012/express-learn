
var express = require("express")
var bodyParser = require("body-parser")
var app = express()

// static files
app.use(express.static('public'))

// use bodyParser-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

// use bodyParser-json
app.use(bodyParser.json())

// use bodyParser-text
app.use(bodyParser.text({type:"txt"}))

// params example 1 
app.get('/find/:id', function(req,res){
	console.log(req.params.id);
	res.send("success");
})

// params example 2
app.get('/find/:group/:name', function(req, res) {
	console.log(req.params.group+" "+req.params.name);
	res.send(req.params.group+" "+req.params.name);
})

// query example 1
app.get('/search', function(req, res){
	console.log(req.query.id)
	console.log(req.query.name)
	res.send(req.query.id+" "+req.query.name)
})

// get
app.get('/', function(req, res){
	res.redirect('/index.html')
});

// add 
app.post('/add', function(req, res) {
	var sid = req.body.sid;
	console.log(sid)
});

// json
app.post("/json", function(req, res){
	console.log(req.body)
})

// text text
app.post("/text", function(req, res){
	console.log(req.body)
})

// create server listening at 3000
var server = app.listen(3000, function(){
	console.log("App listening at 3000...")
});
