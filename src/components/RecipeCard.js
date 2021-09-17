import React from 'react'
import { Link } from "react-router-dom";
import EditBtn from './btn/EditBtn'
import DeleteBtn from './btn/DeleteBtn'

import './recipeCard.css'

function RecipeCard(props) {
    const data = props.data;
    return (
        <div className="card">
            <Link className="card-info" to={"recette/" + data.id}>
                
                    <img src={data.photo} alt={data.titre} />
                    <div className="card-text">
                        <h3>{data.titre}</h3>
                        <p>Difficulté : <span className="bold">{data.niveau}</span></p>
                        <p>Pour : {data.personnes} {data.personnes === 1  ? 'personne' : data.personnes > 1 ? 'personnes' : ""}</p>
                        <p>Temps estimé : {data.tempsPreparation} min</p>
                    </div>
                
            </Link>
            <EditBtn recipeId={data.id} />
            <DeleteBtn  recipeId={data.id} />
        </div>
    )
}

export default RecipeCard

