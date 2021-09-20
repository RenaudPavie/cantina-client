import React, {useState} from 'react'

function AddRecette() {
    const [state, setState] = useState({
        titre: "",
        description: "",
        niveau: "",
        personnes: 0,
        tempsPreparation: 0,
        ingredients: [],
        etapes: [],
        photo: ""
    });

    // update the state on every change
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

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
    const addIngredient = e => {
        e.preventDefault()
        if (nomIngredient !== "") {
            setState(prevState => ({...prevState,          
                ingredients: [...prevState.ingredients, [qteIngredient ,nomIngredient]]
            }));
            setQteIngredient("")
            setNomIngredient("")
        } else {
            alert('Aucun ingrédient détecté')
        }
        
    }

    // Handle step
    const [etapes,setEtapes] = useState([])
    const handleEtapes = e => {
        const {value} = e.target
        setEtapes(value)
    }
    const addEtape = e => {
        e.preventDefault()
        if (etapes.length !== 0) {
            setState(prevState => ({...prevState,
                etapes: [...prevState.etapes, etapes]
            }));
            setEtapes([])
        } else {
            alert('Aucune étapes n\'a été détecté')
        }
    }
    const removeFromList = (e,index,str,arr) => {
        e.preventDefault()
        console.log(index)
        const newArr = arr;
        newArr.splice(index,1)
        setState(prevState => ({...prevState,
            [str]: newArr
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        const dataToSend = {
            titre: state.titre,
            description: state.description,
            niveau: state.niveau,
            personnes: parseInt(state.personnes),
            tempsPreparation: parseInt(state.tempsPreparation),
            ingredients: state.ingredients,
            etapes: state.etapes,
            photo: state.photo
        }
        const json = JSON.stringify(dataToSend)
        fetch('http://localhost:9000/api/recipes',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'post',
            body: json
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            window.location.replace('/')
        })
    }
    return (
    <div className="container">
        <h1 className="mainTitle">Ajouter une nouvelle recette</h1>
        <div className="row formAdd">

            <div className="col">
                <form action="" className="form" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="titre">Titre de la recette</label>
                        <input type="text" id="titre" name="titre" value={state.titre} onChange={handleChange} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="recette-description">Description de la recette</label>
                        <textarea name="description" value={state.description} onChange={handleChange} id="recette-description"></textarea>
                    </div>

                    <div className="form-item">
                        <select name="niveau" id="recipte-niveau" value={state.niveau} onChange={handleChange}>
                            <option value="">Sélectionnez un niveau de compétence</option>
                            <option value="padawan">padawan</option>
                            <option value="jedi">jedi</option>
                            <option value="maitre">maitre</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="recette-personnes">Nombre de personne</label>
                        <input type="number" min="0" name="personnes" id="recette-personnes" onChange={handleChange} value={state.personnes}/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="recette-tpsPrepa">Temps de préparation</label>
                        <input type="number" min="0" name="tempsPreparation" id="recette-tpsPrepa" onChange={handleChange} value={state.tempsPreparation}/>
                    </div>

                        <div className="form-item">
                            <label htmlFor="recette-ingredients">Liste d'ingrédients :</label>
                                <div className="listToAdd">
                                    <input type="text" name="qteIngredient" placeholder="Quantité" id="recette-ingredients" onChange={handleQteIngredient} value={qteIngredient}/>
                                    
                                    <input type="text" name="nomIngredient" placeholder="Nom de l'ingrédient" id="recette-tpsPrepa" onChange={handleNomIngredient} value={nomIngredient}/>
                                    <button className="btn addBtn" onClick={addIngredient}>✓</button>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="recette-etapes">Liste d'étapes :</label>
                            <div className="addStep">
                                <textarea name="etapes" id="recette-etapes" onChange={handleEtapes} value={etapes}></textarea>
                                <button type="button" className="btn addBtn" onClick={addEtape}>✓</button>
                            </div>
                        </div>
                        <div className="form-item">
                            <label htmlFor="photo">Photo de la recette (lien absolu)</label>
                            <input type="text" id="photo" name="photo" value={state.photo} onChange={handleChange} />
                        </div>
                        <button className="btn submitBtn">Créer la nouvelle recette</button>
                </form>
            </div>
            <div className="col preview">
                <div>
                    <h2>{state.titre !== "" ? state.titre : "Titre de la recette"}</h2>
                    {state.photo !== "" ? <div className="img"><img src={state.photo} alt="" /></div> : <div className="img"><p>Photo de la recette</p></div>}
                    
                    <p className="description">{state.description !== "" ? state.description : "Description de la recette"}</p>
                    <p><span className="bold">Niveau de la recette :</span> {state.niveau}</p>
                    <p><span className="bold">Nombre de personne :</span> {state.personnes} {state.personnes === "1"  ? 'personne' : state.personnes > 1 ? 'personnes' : ""}</p>
                    <p><span className="bold">Temps de préparation :</span> {state.tempsPreparation} min</p>
                    <p><span className="bold">Liste d'ingrédients de la recette :</span></p>
                    <ul>
                        {state.ingredients && state.ingredients.map((el,i) => (
                            <li key={i}>
                                {el[0]} - {el[1]}
                                <button className="removeBtn btn" onClick={e => removeFromList(e,i,"ingredients",state.ingredients)}>X</button>
                            </li>
                        ))}
                    </ul>
                    <p><span className="bold"> Etapes de la recette :</span> </p>
                    <ol>
                        {state.etapes && state.etapes.map((el,i) => (
                            <li key={i}>{el}
                                <button className="removeBtn btn" onClick={e => removeFromList(e,i,"etapes",state.etapes)}>X</button>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddRecette
