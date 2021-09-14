import React , {useEffect} from 'react'
import './recipeCard.css'

function RecipeCard(props) {
    return (
        <div className="recipeCard">
            <p>{props.data.titre}</p>
            <p>{props.data.niveau}</p>
            <p>{props.data.personnes}</p>
            <p>{props.data.tempsPreparation}</p>
        </div>
    )
}

export default RecipeCard

