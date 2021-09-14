import React , {useEffect} from 'react'
import { Link } from "react-router-dom";

import './recipeCard.css'

function RecipeCard(props) {
    const data = props.data;
    return (
        <Link to={"event/" + data.id}>
            <div className="recipeCard">
                <p>{data.titre}</p>
                <p>{data.niveau}</p>
                <p>{data.personnes}</p>
                <p>{data.tempsPreparation}</p>
            </div>
        </Link>
    )
}

export default RecipeCard

