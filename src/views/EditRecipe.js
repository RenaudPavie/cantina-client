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
            setRecipe(data)
        })
    },[id])

    const removeItem = (e,index) => {
        e.preventDefault()
        console.log(index)
    }

    return (
        <div className="container">
            <form action="">
                <div>
                    {recipe && 
                    <input type="text" defaultValue={recipe.titre} />
                    }
                </div>
                <div>
                    {recipe && 
                    <input type="text" defaultValue={recipe.description} />
                    }
                </div>
                <div>
                    {recipe && 
                    <select name="niveau" id="recipte-niveau" value={recipe.niveau}>
                        <option value="">Sélectionnez un niveau de compétence</option>
                        <option value="padawan">padawan</option>
                        <option value="jedi">jedi</option>
                        <option value="maitre">maitre</option>
                    </select>
                    }
                </div>
                <div>
                    {recipe && 
                    <input type="number" min="0" defaultValue={recipe.personnes} />
                    }
                </div>
                <div>
                    {recipe && 
                    <textarea name="description" id="" defaultValue={recipe.description}></textarea>
                    }
                </div>
                <div>
                    <h2>Liste d'ingrédients</h2>
                    {recipe && recipe.ingredients.map((e,i)  => (
                        <li key={i}>
                            <input type="text" defaultValue={e[0]} />
                            <input type="text" defaultValue={e[1]} />
                            <button onClick={e => removeItem(e,i)}>X</button>
                        </li>
                    ))}
                </div>
                <div>
                    <h2>Liste d'étapes</h2>
                    {recipe && recipe.etapes.map((e,i) => (
                        <li key={i}>
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

