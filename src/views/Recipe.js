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
            setRecipe(data)
        });
    }, [id]);

    return (
        <div>
            {recipe && (
                <div key={recipe.id}>
                    <p>{recipe.titre}</p>
                    <img src={recipe.photo} alt="" />
                    <p>{recipe.description}</p>
                    <p>{recipe.niveau}</p>
                    <p>{recipe.personnes}</p>
                    <p>{recipe.tempsPreparation}</p>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.etapes}</p>
                    <p>{recipe.titre}</p>
                </div>
            )}
        </div>
    )
}

export default Recipe
