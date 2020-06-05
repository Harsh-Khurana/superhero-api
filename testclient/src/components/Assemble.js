import React from 'react';

// This component displays all heros in cards
const Assemble = props =>{
	const heroDisplay = props.heros.map(hero=>{
		return (
			<div className="hero-card" key={hero.id}>
				<p>Id : {hero.id}</p>
				<p>Name : {hero.name}</p>
				<p>Color : {hero.color}</p>
				<p>Quality : {hero.quality}</p>
				<p>Super Power : {hero.superpower}</p>
				<div>
					<button onClick={()=>{props.deleteHero(hero.id);props.updateHeros(hero.id);}}>Delete SuperHero</button>
					<button onClick={()=>{props.routeHandler('put');props.selectHero(hero.id);}}>Edit SuperHero</button>
				</div>
			</div>
		);
	})
	return(
		<div className="cards-container">
			{heroDisplay}
		</div>
	);
}

export default Assemble;