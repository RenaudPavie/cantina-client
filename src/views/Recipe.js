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
        <section className="recipeWrapper">
        <div>
            {recipe && (
                <div key={recipe.id}>
                    <p>{recipe.titre}</p>
                    <img src={recipe.photo} alt="" />
                    <p>{recipe.description}</p>
                    <p>{recipe.niveau}</p>
                    <p>{recipe.personnes}</p>
                    <p>{recipe.tempsPreparation}</p>
                    <ul>
                        { recipe.ingredients && recipe.ingredients.map((e,i) => (
                            <li key={i}>
                                <p>{e[0]}</p>
                                <p>{e[1]}</p>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        { recipe.etapes && recipe.etapes.map((e,i) => (
                            <li key={i}>
                                <p>{e}</p>
                            </li>
                        ))}
                    </ul>
                    <p>{recipe.etapes}</p>
                    <p>{recipe.titre}</p>
                </div>
            )}
            {recipe && (
                <p>{recipe.errorMessage}</p>
            )}
        </div>
        </section>
        </div>
    )
}

export default Recipe
