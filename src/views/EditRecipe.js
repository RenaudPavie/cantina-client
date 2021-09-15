import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

function EditRecipe() {
    const params = useParams();
    const id = params.id;

    const [recipe,setRecipe] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:9000/api/recipe/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.ingredients)
            setRecipe(data)
        })
    },[id])

    return (
        <div className="container">
            <form action="">
                <div>
                    <h2>Liste d'ingrédients</h2>
                    {recipe && recipe.ingredients.map(e  => (
                        <li>
                            <input type="text" defaultValue={e[0]} />
                            <input type="text" defaultValue={e[1]} />
                            <button>X</button>
                        </li>
                    ))}
                </div>
                <div>
                    <h2>Liste d'étapes</h2>
                    {recipe && recipe.etapes.map(e => (
                        <li>
                            <textarea name="" id="" defaultValue={e} ></textarea>
                            <button>X</button>
                        </li>
                    ))}

                </div>
                    
            </form>
        </div>
    )
}

export default EditRecipe

