import {useState,useEffect} from 'react'
import RecipeCard from '../components/RecipeCard.js'

function Accueil() {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
      fetch('http://localhost:9000/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
    },[])

    return (
    <div className="container">
        <section className="recipeWrapper">
            {recipes && recipes.map(e => 
                <RecipeCard key={e.id} data={e} />
                )}
        </section>
    </div>
    )
}

export default Accueil
