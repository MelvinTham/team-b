import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import Food from './Food';
import Home from './Home';
import List from './List';
import Recipe from './Recipe';
import Search from './Search';
import Result from './Result';
import axios from 'axios';
import * as firebase from 'firebase';


class Main extends Component {

	constructor(props) {
        super(props);
        this.state = {
           listOfIngredients: [],
           currentIngredient: '',
           currentResults: [],
           searchStatus: 'selectIngredient',
           currentRecipeResults: '',
           listOfRecipes: [],
            
        };

    this.addIngredients = this.addIngredients.bind(this);
    this.apiSearchIngredients = this.apiSearchIngredients.bind(this);
    // this.addRecipes = this.addRecipes.bind(this);
    this.apiSearchRecipe = this.apiSearchRecipe.bind(this);
  }
    

	addIngredients(ingredient) {
		const currentIngredient = ingredient.ingredients;
	  	const listOfIngredients = this.state.listOfIngredients.concat(ingredient);
	  	this.setState({listOfIngredients: listOfIngredients, currentIngredient: currentIngredient});
	  	this.apiSearchIngredients(ingredient);
	  }

	/*addRecipes(id) {
	  	this.apiSearchRecipe(id).then(() => console.log('done too'));
	  	console.log('done');
	  	<Redirect from= '/food' to='/recipe' />
	  	console.log('done2');
	}*/

	apiSearchIngredients(ingredient){
		var config ={
	    headers: {'X-Mashape-Key': 'INSERT KEY'},
	    params: {
	        fillIngredients: ingredient.fillIngredients,
	        ingredients: ingredient.ingredients,
	        number: ingredient.number,
	        ranking: ingredient.ranking
	      }
		}
	    
	    axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients", config
	    ).then((response) => {
	      const currentResults = response.data;
	      console.log(currentResults);
	      this.setState({
	      	currentResults: currentResults,
	      	searchStatus: 'ingredientSubmitted' 
	      });
		});
	}

	apiSearchRecipe(id){
        var config ={
            headers: {'X-Mashape-Key': 'INSERT KEY'},
        }
            axios.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + id +"/information", config
            ).then((response) => {
              const currentRecipeResults = response.data;
              const listOfRecipes = this.state.listOfRecipes.concat(currentRecipeResults);
              console.log(currentRecipeResults);
              this.setState({
                  currentRecipeResults: currentRecipeResults,
                  listOfRecipes: listOfRecipes,   
              });
              }).catch(function (error) {
                console.log(error);
              });
        
  	}

	render() {
		return (
			<Switch>
				<Route exact path='/' render={ ()=> <Home addIngredients= {this.addIngredients} />} />
				<Route exact path='/list' render={ ()=> <List />} />
				<Route exact path='/search' render={ ()=> <Search addIngredients= {this.addIngredients} />} />
				<Route exact path='/result' render={ ()=> <Result Data= {this.state.currentResults} apiSearchRecipe= {this.apiSearchRecipe} />} />
				<Route exact path='/recipe' render={ ()=> <Recipe Data= {this.state.currentRecipeResults} />} />
			</Switch>
		)
	}
}



export default Main;