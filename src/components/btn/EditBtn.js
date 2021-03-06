import React from 'react'
import {Link} from 'react-router-dom'

function EditBtn(props) {
    const id = props.recipeId
    return (
        <Link to={`/edit-recipe/${id}`}>
            <button className="editBtn btn">Modifier</button>
        </Link>
    )
}

export default EditBtn

