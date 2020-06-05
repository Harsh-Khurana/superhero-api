import React from 'react';
import axios from 'axios';

// This comp handles the editing of heros 
// Note- making req will not update the hero input feilds but will update cards when allherodisplay is requested again
export default class CreateHero extends React.Component{
	state={
		id:'',
		name:'',
		color:'',
		quality:'',
		superpower:''
	}

	// To fill in the orignal fields of hero data
	componentDidMount(){
		this.setState({...this.props.heroData});
	}

	submitHeroHandler=()=>{
		if(this.state.id&&this.state.name.length>0&&this.state.color.length>0&&this.state.quality.length>0&&this.state.superpower.length>0){
			axios.put(`http://localhost:3000/superheros/${this.state.id}`,this.state)
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
					<label htmlFor="heroId">Id : </label>
					<input type="text" value={this.state.id} placeholder="Id can be found in hero list" id="heroId" onChange={(event)=>{this.setState({id:event.target.value})}}/>
				</div>
				<div className="form-element">
					<label htmlFor="name">Name : </label>
					<input type="text" value={this.state.name} id="name" onChange={(event)=>{this.setState({name:event.target.value})}}/>
				</div>
				<div className="form-element">
					<label htmlFor="color">Color : </label>
					<input type="text" value={this.state.color} id="color" onChange={(event)=>{this.setState({color:event.target.value})}}/>
				</div>
				<div className="form-element">
					<label htmlFor="quality">Quality : </label>
					<input type="text" value={this.state.quality} id="quality" onChange={(event)=>{this.setState({quality:event.target.value})}}/>
				</div>
				<div className="form-element">
					<label htmlFor="superpower">Super Power : </label>
					<input type="text" value={this.state.superpower} id="superpower" onChange={(event)=>{this.setState({superpower:event.target.value})}}/>
				</div>
				<button onClick={this.submitHeroHandler}>Create My Hero</button>
				<button onClick={()=>this.props.routeHandler('main')}>Go to main page</button>
			</div>
		);
	}
}