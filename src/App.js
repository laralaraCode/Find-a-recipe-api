
import './App.css';
import { useEffect, useState } from "react";
import video from './food.mp4';
import MyRecipesComponent from './MyRecipesComponent';
import Button from './Button';


function App() {

//const MY_ID = "8348900c";
//const MY_KEY = "706e87784c5a31f37a5e8ef1cf8ef47a";

const [mySearch, setMySearch] = useState('')
const [myRecipes, setMyRecipes] = useState([])
const [wordSubmitted, setWordSubmitted] = useState('')
const [myFiltred, setMyFiltred] = useState([])

useEffect( () => {
  const getApi = async() => {
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=8348900c&app_key=706e87784c5a31f37a5e8ef1cf8ef47a`)
  const data = await response.json();
  console.log(data.hits)
  setMyRecipes(data.hits)
  setMyFiltred(data.hits)
}
getApi()
}, [wordSubmitted])

const myRecipeSearch =(e)=> {
  console.log(e.target.value)
  setMySearch(e.target.value)
}

const finalSearch =(e)=> {
  e.preventDefault()
  setWordSubmitted(mySearch)
}


const ChosenMeals = (dishType) => {
  const newMeals = myRecipes.filter(item => item.recipe.dishType[0] === dishType)
  setMyFiltred(newMeals)
}

  return (
  <div className="App">
    <div className="container">
      <video autoPlay muted loop>
      <source src={video} type="video/mp4" />
      </video>
      <h1>Find a Recipe</h1>
    </div>

    <div className="container">
      <form onSubmit={finalSearch}>
        <input className="search" 
        type ="text"
        placeholder="Search ingredient..." 
        onChange={myRecipeSearch}
        value={mySearch}/>
   </form>
       
    <button  className='btn-search' onClick ={finalSearch}>
          <img src="https://img.icons8.com/fluency/48/000000/fry.png"  width="32px" height="24px" alt ="button search"/>
    </button>
    </div>
    
  <div className='container-btn'>
        <Button filtredMeals={ChosenMeals}/>
  </div>

<div className='container-recipes'>
    {myFiltred.map((item, index) => (
      <MyRecipesComponent key={index}
      label={item.recipe.label}
      image={item.recipe.image}
      calories={item.recipe.calories}
      ingredientLines={item.recipe.ingredientLines}
      url={item.recipe.url}
      />
        ))}
</div>
</div>
  );
}

export default App;
