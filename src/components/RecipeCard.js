import React from 'react'
import { Link } from "react-router-dom";
import EditBtn from './btn/EditBtn'
import DeleteBtn from './btn/DeleteBtn'

import './recipeCard.css'

function RecipeCard(props) {
    const data = props.data;
    const showTime = () => {
        const heure = Math.floor(data.tempsPreparation / 60);
        const minutes = data.tempsPreparation % 60;
        const compactTime = heure > 0 ? heure + "h" : "";
        const finalTime = compactTime + minutes
        return finalTime
    }
    return (
        <div className="card">
            <Link className="card-info" to={"recette/" + data.id}>
                <img src={data.photo} alt={data.titre} />
                <div className="card-text">
                    <h3>{data.titre}</h3>
                    <p>Difficulté : <span className="bold">{data.niveau}</span></p>
                    <p>Pour : {data.personnes} {data.personnes === 1  ? 'personne' : data.personnes > 1 ? 'personnes' : ""}</p>
                    <p>Temps estimé : {showTime()} min</p>
                </div>
            </Link>
            <div className="card-btn">
                <EditBtn recipeId={data.id} />
                <DeleteBtn refresh={false} recipeId={data.id} />
            </div>
        </div>
    )
}

export default RecipeCard

