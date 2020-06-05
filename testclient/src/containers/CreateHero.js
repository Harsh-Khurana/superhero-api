import React from 'react';
import axios from 'axios';

// This is used to create a new hero
export default class CreateHero extends React.Component{
	state={
		name:'',
		color:'',
		quality:'',
		superpower:''
	}

	// This handles the submit request 
	submitHeroHandler=()=>{
		// If the feilds are not empty then only request is made
		if(this.state.name.length>0&&this.state.color.length>0&&this.state.quality.length>0&&this.state.superpower.length>0){
			axios.post('http://localhost:3000/superheros',this.state)
			.then(console.log);
		}else{
			alert("Form fields can't be empty :)");
		}
	}

	render(){
		return(
			<div className="App">
				<h2>Tell us about your hero</h2>
				<div className="form-element">
					<label htmlFor="name">Name : </label>
					<input type="text" placeholder="eg. superman" id="name" onChange={(event)=>{this.setState({name:event.target.value})}}/>
				</div>
				<div className="form-element">
					<label htmlFor="color">Color : </label>
					<input type="text" placeholder="eg. red" id="color" onChange={(event)=>{this.setState({color:event.target.value})}}/>
				</div>
				<div className="form-element">
					<label htmlFor="quality">Quality : </label>
					<input type="text" placeholder="eg. tough" id="quality" onChange={(event)=>{this.setState({quality:event.target.value})}}/>
				</div>
				<div className="form-element">
					<label htmlFor="superpower">Super Power : </label>
					<input type="text" placeholder="eg. super strength" id="superpower" onChange={(event)=>{this.setState({superpower:event.target.value})}}/>
				</div>
				<button onClick={this.submitHeroHandler}>Create My Hero</button>
				<button onClick={()=>this.props.routeHandler('main')}>Go to main page</button>
			</div>
		);
	}
}