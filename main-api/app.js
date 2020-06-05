const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	SuperHero = require('./Modal/Modal');

// middlewares to manipulate the req,res before actual use
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

////// SETTING ENV VARIABLES ///////
const {
	PORT = 3000,
	databaseURL = 'mongodb://localhost:27017/superheros'
} = process.env;

// currently using local database but mongoDB Atlas can be used if required
mongoose.connect(databaseURL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
// URL for the deployed website or dev URL
const productionURL = 'http://localhost:3000/';

/////// ROUTES ////////

// HOME ROUTE(intro to api)
app.get('/',(req,res)=>{
	res.render('home.ejs',{url:productionURL});
})

// INDEX ROUTE
app.get('/superheros',(req,res)=>{
	let heros =[];
	// This finds all the heros in database
	SuperHero.find({},(err,allHeros)=>{
		// This will return us all the heros without mongo.id or _v property
		// which are not of any use to the user
		count = allHeros.length;
		heros = allHeros.map((hero,i)=>{
			return ({
				id:hero._id,
				name:hero.name,
				color:hero.color,
				quality:hero.quality,
				superpower:hero.superpower
			});
		});
		res.json(heros);
	})
})

// CREATE ROUTE
app.post('/superheros',(req,res)=>{
	SuperHero.create({
		name:req.body.name,
		color:req.body.color,
		quality:req.body.quality,
		superpower:req.body.superpower
	},(err,myHero)=>{
		if(err) console.log("oh my there's an error : ",err);
		else console.log(myHero);
	})
})

// SHOW ROUTE
app.get('/superheros/:id',(req,res)=>{
	// Searching superheros based on id recieved
	SuperHero.find({_id:req.params.id},(err,hero)=>{
		if(err) res.send('No hero with this id found');
		else res.json({
				name:hero[0].name,
				color:hero[0].color,
				quality:hero[0].quality,
				superpower:hero[0].superpower
			});
	})
})

// UPDATE ROUTE
app.put('/superheros/:id',(req,res)=>{
	let updatedHero = {
		name:req.body.name,
		color:req.body.color,
		quality:req.body.quality,
		superpower:req.body.superpower
	}
	
	SuperHero.findByIdAndUpdate(req.params.id,updatedHero,(err,hero)=>{
		if(err) res.send('No hero with this id found');
		else res.json(hero);
	})
})

// DELETE ROUTE
app.delete('/superheros/:id',(req,res)=>{
	SuperHero.findByIdAndRemove(req.params.id,(err,hero)=>{
		if(err) res.send("Can't delete");
		else res.send("hero deleted successfully ");
	})
})
app.listen(PORT,()=>{
	console.log("Api is working!!");
})