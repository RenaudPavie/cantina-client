import React from 'react'
import { Link } from "react-router-dom";
import EditBtn from './btn/EditBtn'
import DeleteBtn from './btn/DeleteBtn'

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
                <DeleteBtn  recipeId={data.id} />
                <Link to={"edit-recipe/" + data.id}>
                    <EditBtn recipeId={data.id} />
                </Link>
            </div>
        </Link>
    )
}

export default RecipeCard

