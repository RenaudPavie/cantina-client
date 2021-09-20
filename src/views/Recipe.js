import React, {useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import DeleteBtn from '../components/btn/DeleteBtn';
import EditBtn from '../components/btn/EditBtn';

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
    const showTime = () => {
        const heure = Math.floor(recipe.tempsPreparation / 60);
        const minutes = recipe.tempsPreparation % 60;
        const compactTime = heure > 0 ? heure + "h" : "";
        const finalTime = compactTime + minutes
        return finalTime
    }
    
    return (
        <div className="container">
                    {recipe && (
                        <section className="recipeWrapper">
                            <h1 className="mainTitle">{recipe.titre}</h1>
                            <div className="recipe">
                                <div className="recipe-text">
                                    <img src={recipe.photo} alt={recipe.titre} />
                                    <p>{recipe.description}</p>
                                    <p>
                                    <span className="bold">Étapes à respecter :</span>
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
                                    <p><span className="bold">Temps :</span> {showTime()} min</p>
                                    <p><span className="bold">Difficulté :</span> {recipe.niveau}</p>
                                    <p><span className="bold">Prévu pour :</span> {recipe.personnes} {recipe.personnes === 1  ? 'personne' : recipe.personnes > 1 ? 'personnes' : ""}</p>
                                    <p><span className="bold">Ingredients : </span></p>
                                    <ul>
                                        { recipe.ingredients && recipe.ingredients.map((e,i) => (
                                            <li key={i}>
                                                <p>{e[0]} {e[1]}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="btn-col">
                                        <DeleteBtn refresh={true} recipeId={recipe.id} />
                                        <EditBtn recipeId={recipe.id} />
                                    </div>
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
