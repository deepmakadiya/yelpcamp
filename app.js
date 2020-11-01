var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var partials = require('partials');
var mongoose = require('mongoose');


var campgrounds = [
	{name: "Salmon Greek", image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
	{name: "Skyper ", image: "https://images.unsplash.com/photo-1490452322586-70484206da38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
	{name: "Granite hill", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
]

mongoose.connect("mongodb://localhost:27018/yelpcamp",
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR:',err.message);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
	{
		name: "Salmon Greek",
		image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
	}, function(err, campground){
		if(err){
			console.log(err);
		} else {
			console.log("New campground created");
			console.log(campground);
		}
	}
)




app.get('/', function(req, res) {
	res.render("landing");
});

app.get('/campgrounds', function(req, res) {
	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
	res.render("new")
})


app.listen(3000 , ()=>{
    console.log("Server has started!");
});