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
        const value = e.target.value
        setQteIngredient(value)
    }
    const [nomIngredient,setNomIngredient] = useState("")
    const handleNomIngredient = e => {
        const value = e.target.value
        setNomIngredient(value)
    }
    const [unitIngredient,setUnitIngredient] = useState("")
    const handleUnitIngredient = e => {
        const value = e.target.value
        setUnitIngredient(value)
    }
    const addIngredient = e => {
        e.preventDefault()
        const isUnit = unitIngredient !== "" ? unitIngredient : ""
        setState(prevState => ({...prevState,
            ingredients: [...prevState.ingredients, [qteIngredient + isUnit ,nomIngredient]]
        }));
    }


    const [etapes,setEtapes] = useState([])
    const handleEtapes = e => {
        const value = e.target.value
        setEtapes(value)
    }
    const addEtape = e => {
        e.preventDefault()
        setState(prevState => ({...prevState,
            etapes: [...prevState.etapes, etapes]
        }));
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
            photo: ""
        }
        const json = JSON.stringify(dataToSend)
        console.log(json)
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
        })
    }

    return (
    <div className="container form-add">
        <h1>Ajouter une nouvelle recette</h1>
        <div className="row">

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
                        <input type="number" name="personnes" id="recette-personnes" onChange={handleChange} value={state.personnes}/>
                    </div>
                    <div className="form-item">
                        <label htmlFor="recette-tpsPrepa">Temps de préparation</label>
                        <input type="number" name="tempsPreparation" id="recette-tpsPrepa" onChange={handleChange} value={state.tempsPreparation}/>
                    </div>
                    <div className="listToAdd">

                        <div className="form-item">
                            <label htmlFor="recette-tpsPrepa">Liste d'ingrédients :</label>
                            <input type="number" name="qteIngredient" id="recette-tpsPrepa" onChange={handleQteIngredient} value={qteIngredient}/>
                            <select name="unitIngredient" id="" onChange={handleUnitIngredient} value={unitIngredient}>
                                <option value=""></option>
                                <option value="mg">mg</option>
                                <option value="g">g</option>
                                <option value="ml">ml</option>
                                <option value="cl">cl</option>
                            </select>
                            <input type="text" name="nomIngredient" id="recette-tpsPrepa" onChange={handleNomIngredient} value={nomIngredient}/>
                            <button onClick={addIngredient}>Ajouter</button>
                        </div>
                        <div className="form-item">
                            <label htmlFor="recette-etapes">Liste d'étapes :</label>
                            <textarea name="etapes" id="recette-etapes" onChange={handleEtapes} value={etapes}></textarea>
                            <button type="button" onClick={addEtape}>Ajouter</button>
                        </div>
                    </div>
                   


                    <button>submit</button>
                </form>
            </div>
            <div className="col">
                <div>
                    <p>Titre de la recette : {state.titre}</p>
                    <p>description de la recette : {state.description}</p>
                    <p>Niveau de la recette : {state.niveau}</p>
                    <p>Nombre de personne : {state.personnes} {state.personnes == 1  ? 'personne' : state.personnes > 1 ? 'personnes' : ""}</p>
                    <p>Temps de préparation : {state.tempsPreparation}</p>
                    <p>Liste d'ingrédients de la recette :</p>
                    <ul>
                        {state.ingredients && state.ingredients.map((e,i) => (
                            <li key={i}>{e[0]} - {e[1]}</li>
                        ))}
                    </ul>
                    <p>Etapes de la recette : </p>
                    <ul>
                        {state.etapes && state.etapes.map((e,i) => (
                            <li key={i}>{e}</li>
                        ))}
                    </ul>
                    {/* <p>Titre de la recette : {state.photo}</p> */}
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddRecette
