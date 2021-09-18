import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

function EditRecipe() {
    const params = useParams();
    const id = params.id;

    const [newData,setNewData] = useState({
        titre: "",
        description: "",
        niveau: "",
        personnes: 0,
        tempsPreparation: 0,
        ingredients: [],
        etapes: [],
        photo: ""
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setNewData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        fetch(`http://localhost:9000/api/recipe/${id}`)
        .then(res => res.json())
        .then(data => {
            setNewData(data)
        })
    },[id])

    const removeItem = (e,index) => {
        e.preventDefault()
        console.log(index)
    }
    const handleSubmit = e => {
        e.preventDefault()
        const dataToSend = {
            titre: newData.titre,
            description: newData.description,
            niveau: newData.niveau,
            personnes: parseInt(newData.personnes),
            tempsPreparation: parseInt(newData.tempsPreparation),
            ingredients: newData.ingredients,
            etapes: newData.etapes,
            photo: newData.photo
        }
        const json = JSON.stringify(dataToSend)
        console.log(json)
        fetch(`http://localhost:9000/api/recipe/${id}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'put',
            body: json
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return (
        <div className="container">
            <form action="" onSubmit={handleSubmit}>
                <div>
                    {newData && 
                    <input type="text" name="titre" defaultValue={newData.titre} onChange={handleChange} />
                    }
                </div>
                <div>
                    {newData && 
                    <input type="text" name="description" defaultValue={newData.description} onChange={handleChange} />
                    }
                </div>
                <div>
                    {newData && 
                    <select name="niveau" id="recipte-niveau" name="niveau" defaultValue={newData.niveau} onChange={handleChange} >
                        <option value="">Sélectionnez un niveau de compétence</option>
                        <option value="padawan">padawan</option>
                        <option value="jedi">jedi</option>
                        <option value="maitre">maitre</option>
                    </select>
                    }
                </div>
                <div>
                    {newData && 
                    <input type="number" min="0" defaultValue={newData.personnes} name="personnes" onChange={handleChange} />
                    }
                </div>
                <div>
                    {newData && 
                    <textarea name="description" id="" defaultValue={newData.description} name="description" onChange={handleChange} ></textarea>
                    }
                </div>
                <div>
                    <h2>Liste d'ingrédients</h2>
                    <ul>
                        {newData && newData.ingredients.map((e,i)  => (
                            <li key={i}>
                                <input type="number" defaultValue={e[0]} />
                                <input type="text" defaultValue={e[1]} />
                                <button onClick={e => removeItem(e,i)}>X</button>
                            </li>
                        ))}
                        <li>
                            <input type="number" />
                            <input type="text"  />
                            <button onClick={e => removeItem(e)}>X</button>
                        </li>
                    </ul>

                </div>
                <div>
                    <h2>Liste d'étapes</h2>
                    {newData && newData.etapes.map((e,i) => (
                        <li key={i}>
                            <textarea name="" id="" defaultValue={e} ></textarea>
                            <button>X</button>
                        </li>
                    ))}

                </div>
                <div>
                {newData && 
                    <input type="text" name="photo" defaultValue={newData.photo} onChange={handleChange} />
                    }
                </div>
                <button type="submit">Modifier</button>
            </form>
        </div>
    )
}

export default EditRecipe

