

const MyRecipesComponent = ({label, image, calories, ingredientLines,url}) => {

    return(
    <div className="recipes">
        <div>
        <h2>{label}</h2>
        <p>{calories.toFixed()} calories</p>
        <img  className="tasty" src={image} alt="recipe"/>
        </div>


    <ul>Ingredients:
    {ingredientLines.map((item, i) => (
    <li key={i}>{item}</li>
    ))}
    </ul>
    <a href={url}> 
        <button className='btn-link'> RECIPE</button>
    </a>

</div>)
}

export default MyRecipesComponent;