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
    
    const [etapes,setEtapes] = useState([])
    const handleEtapes = e => {
        const {value} = e.target
        setEtapes(value)
    }
    const editEtapes = (e,index) => {
        const {value} = e.target
        const newValue = newData
        newData.etapes[index] = value;
        setNewData(newValue)
    }
    const addEtape = e => {
        e.preventDefault()
        if (etapes.length !== 0) {
            setNewData(prevState => ({...prevState,
                etapes: [...prevState.etapes, etapes]
            }));
            setEtapes([])
        } else {
            alert('Aucune étapes n\'a été détecté')
        }
    }

    // Handle list of ingredients
    const [qteIngredient,setQteIngredient] = useState("")
    const handleQteIngredient = e => {
        const {value} = e.target
        setQteIngredient(value)
    }
    const [nomIngredient,setNomIngredient] = useState("")
    const handleNomIngredient = e => {
        const {value} = e.target
        setNomIngredient(value)
    }
    const editIngredient = (e,index) => {
        const {name,value} = e.target
        if  (name === "qte") {
            const newValue = newData
            newData.ingredients[index][0] = value;
            setNewData(newValue)
        } else if (name === "ingredients" && index !== null) {
            const newValue = newData
            newData.ingredients[index][1] = value;
            setNewData(newValue)
        }
    }
    const addIngredient = e => {
        e.preventDefault()
        setNewData(prevState => ({...prevState,          
            ingredients: [...prevState.ingredients, [qteIngredient ,nomIngredient]]
        }));
        setQteIngredient("")
        setNomIngredient("")
    }
    const removeFromList = (e,index,str,arr) => {
        e.preventDefault()
        const newArr = arr;
        newArr.splice(index, 1);
        setNewData({
        ...newData,
            [str]: newArr
        });
    }

    const [message,setMessage] = useState("")
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
            setMessage(data.message)
        })
    }

    return (
        <div className="container">
            <h1 className="mainTitle">Modification de recette</h1>
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="row-edit">
                    
                    <div className="edit-col">
                        <h2>Informations</h2>
                        <div className="form-item">
                            <label htmlFor="titre">Titre de la recette : </label>
                            {newData && 
                                <input type="text" id="titre" name="titre" defaultValue={newData.titre} onChange={handleChange} />
                            }
                        </div>
                        <div className="form-item">
                            <label htmlFor="niveau">Niveau de la recette : </label>
                            {newData && 
                            <select name="niveau" id="niveau" defaultValue={newData.niveau} onChange={handleChange} >
                                <option value="">Sélectionnez un niveau de compétence</option>
                                <option value="padawan">padawan</option>
                                <option value="jedi">jedi</option>
                                <option value="maitre">maitre</option>
                            </select>
                            }
                        </div>
                        <div className="form-item">
                            <label htmlFor="personnes">Nombre de personne : </label>

                            {newData && 
                                <input type="number" id="personnes" value={newData.personnes} name="personnes" onChange={handleChange} />
                            }
                        </div>
                        <div className="form-item">
                            <label htmlFor="tempsPreparation">Temps de préparation : </label>
                            {newData && 
                                <input type="number" id="tempsPreparation" value={newData.tempsPreparation} name="tempsPreparation" onChange={handleChange} />
                            }
                        </div>
                        <div className="form-item">
                            <label htmlFor="description">Description de la recette : </label>

                            {newData && 
                            <textarea name="description" id="description" defaultValue={newData.description} onChange={handleChange} ></textarea>
                            }
                        </div>
                        <div className="form-item">
                        <label htmlFor="photo">Photo de la recette : (lien absolu) </label>

                    {newData && 
                        <input type="text" name="photo" id="photo" defaultValue={newData.photo} onChange={handleChange} />
                        }
                    </div>
                    </div>
                    <div className="edit-col">
                        <div className="form-item ingredient-list">
                            <h2>Liste d'ingrédients</h2>
                            <ul>
                                {newData.ingredients.map((el,i)  => (
                                    <li key={i} className="list-item">
                                        <input type="text" name="qte" defaultValue={el[0]} onChange={e => editIngredient(e,i)} />
                                        <input type="text" name="ingredients" defaultValue={el[1]} onChange={e => editIngredient(e,i)} />
                                        <button className="removeBtn btn" onClick={e => removeFromList(e,i,"ingredients",newData.ingredients)}>X</button>
                                    </li>
                                ))}
                                <li className="list-item">
                                    <input type="text" name="qteIngredient" onChange={handleQteIngredient} value={qteIngredient}/>
                                    <input type="text" name="nomIngredient" onChange={handleNomIngredient} value={nomIngredient}/>
                                    <button className="btn addBtn" onClick={addIngredient}>✓</button>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="edit-col">
                    <div className="form-item">
                        <h2>Liste d'étapes</h2>
                        <ol>
                            {newData && newData.etapes.map((el,i) => (
                                <li key={i} className="list-item">
                                    <textarea name="etapes" id="etapes" onChange={e => editEtapes(e,i)} defaultValue={el} ></textarea>
                                    <button className="removeBtn btn" onClick={e => removeFromList(e,i,"etapes",newData.etapes)}>X</button>
                                </li>
                            ))}
                            <li className="list-item">
                                <textarea name="etapes" id="etapes" onChange={handleEtapes} value={etapes} ></textarea>
                                <button onClick={addEtape} className="btn addBtn">✓</button>
                            </li>
                        </ol>

                    </div>
                </div>
                </div>
                {message && 
                        <div className="alert-msg">{message}</div>
                    }
                <div className="btn-col">
                    <button className="btn submitBtn" type="submit">Modifier la recette</button>
                </div>
            </form>
        </div>
    )
}

export default EditRecipe

