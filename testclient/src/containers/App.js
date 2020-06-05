import React from 'react';
import './App.css';
import axios from 'axios';
import Assemble from '../components/Assemble';
import CreateHero from './CreateHero';
import EditHero from './EditHero';

class App extends React.Component{
  state = {
    allHeros:[],
    route:'main',
    selectHero:{}
  }

  routeHandler = route =>{
    this.setState({route:route});
  }
  // Fn that fetches and updates heros state with all the recieved heros
  heroDisplayHandler = () =>{
    axios.get('http://localhost:3000/superheros')
    .then(resp=>{
      this.setState({allHeros:[...resp.data]})
    });
  }

  // Fn that filters out heros after deleting
  // This is a seprate fn just in case in future we might need it somewhere else as well
  newHeroDisplay = id =>{
    const filteredHeros = this.state.allHeros.filter(hero=>hero.id!=id);
    console.log(filteredHeros);
    this.setState({allHeros:[...filteredHeros]});
  }

  // Fn to delete a single hero from api when clicked 
  deleteHeroHandler = id =>{
    axios.delete(`http://localhost:3000/superheros/${id}`)
    .then(console.log);
  }

  // Fn to select a single hero on click of edit hero button
  selectHero = id =>{
    const heroToBeEdited = this.state.allHeros.filter(hero=>hero.id==id);
    this.setState({selectHero:{...heroToBeEdited[0]}});
    console.log(heroToBeEdited[0]);
  }

  render(){
    return(
      <React.Fragment>
      {/* ROUTING IS HANDLED B/W POST - MAIN - PUT ROUTE TO SHOW DIFFERENT VIEWS */}
      { this.state.route==='post'?<CreateHero routeHandler={this.routeHandler}/>
        :(this.state.route==='put'?<EditHero routeHandler={this.routeHandler} heroData={this.state.selectHero}/>
          :<div className="App">
          <h2>Test Application for superhero API</h2>
          <p>Test by using the buttons below</p>
          <p>Clicking a single hero card will delete the hero !!!(You might delete "Vision" if you don't like him</p>
          <div className="button-list">
            <button onClick={this.heroDisplayHandler}>Display all superheros</button>
            <button onClick={()=>this.routeHandler('post')}>Create a Hero</button>
          </div>
          <Assemble 
            heros={this.state.allHeros}
            routeHandler={this.routeHandler} 
            deleteHero={this.deleteHeroHandler} 
            updateHeros={this.newHeroDisplay}
            selectHero={this.selectHero}
          />
        </div>)}
      </React.Fragment>
    );
  }
}

export default App;
