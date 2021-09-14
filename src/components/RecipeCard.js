import React from 'react'
import { Link } from "react-router-dom";

import './recipeCard.css'

function RecipeCard(props) {
    const data = props.data;
    return (
        <Link to={"recette/" + data.id}>
            <div className="recipeCard">
                <p>{data.titre}</p>
                <img src={data.photo} alt="" />
                <p>{data.niveau}</p>
                <p>{data.personnes}</p>
                <p>{data.tempsPreparation}</p>
            </div>
        </Link>
    )
}

export default RecipeCard

