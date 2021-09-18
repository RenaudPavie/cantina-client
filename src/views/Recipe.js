import React, {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";

function Recipe() {
    const params = useParams();
    const id = params.id;
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9000/api/recipe/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setRecipe(data)
        });
    }, [id]);

    return (
        <div className="container">
                    {recipe && (
                        <section className="recipeWrapper">
                            <img src={recipe.photo} alt={recipe.titre} />
                            <h1 className="mainTitle">{recipe.titre}</h1>
                            <div className="recipe">

                                <div className="recipe-text">
                                    <p>{recipe.description}</p>
                                    <p>Temps : {recipe.tempsPreparation} min</p>
                                    <p>Prévu pour : {recipe.personnes} {recipe.personnes === 1  ? 'personne' : recipe.personnes > 1 ? 'personnes' : ""}</p>
                                    <p>Difficulté : {recipe.niveau}</p>
                                    <p>
                                        Étapes à respecter :
                                    </p>
                                    <ol>
                                        { recipe.etapes && recipe.etapes.map((e,i) => (
                                            <li key={i}>
                                                <p>{e}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <div className="ingredients">
                                    <h2>Ingredients</h2>
                                    <ul>
                                        { recipe.ingredients && recipe.ingredients.map((e,i) => (
                                            <li key={i}>
                                                <p>{e[0]} {e[1]}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                    </section>
                    )}
                    {recipe && (
                        <p>{recipe.errorMessage}</p>
                    )}
        </div>
    )
}

export default Recipe
