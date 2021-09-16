import React from 'react'
import { Link } from "react-router-dom";
import EditBtn from './btn/EditBtn'
import DeleteBtn from './btn/DeleteBtn'

import './recipeCard.css'

function RecipeCard(props) {
    const data = props.data;
    return (
        <div className="recipeCard">
            <Link to={"recette/" + data.id}>
                <div>
                    <p>{data.titre}</p>
                    <img src={data.photo} alt={data.titre} />
                    <p>{data.niveau}</p>
                    <p>{data.personnes}</p>
                    <p>{data.tempsPreparation}</p>
                </div>
            </Link>
            <DeleteBtn  recipeId={data.id} />
            <EditBtn recipeId={data.id} />
        </div>
    )
}

export default RecipeCard

