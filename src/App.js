import React, {useEffect, useState} from "react";
import Recipe from "./recipe";
import './App.css';


const App = () => {

const APP_ID = 'aa7e430e';
const APP_KEY = '3f410c5eb2a4a26c06750d6efaced8cb';

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query,setQuery] = useState('query');




useEffect(()=> {
  getRecipes();
  
}, [query]);


 const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=aa7e430e&app_key=3f410c5eb2a4a26c06750d6efaced8cb`);
  const data = await response.json();
  setRecipes(data.hits);
 };

const updateSearch = e => {
  setSearch(e.target.value);
}
 
const getSearch = e => {
  e.preventDefault();
  setQuery(search)
}


  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit"> Search </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
    </div>
  );
};

export default App;
