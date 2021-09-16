import React from 'react'

function DeleteBtn(props) {
    const id = props.recipeId

    const deleteRecipe = (e,id) => {
        e.preventDefault()

        fetch(`http://localhost:9000/api/recipe/${id}`,{method:'DELETE'})
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
        })
    }

    return (
        <button onClick={e => deleteRecipe(e,id)}>supprimer</button>
    )
}

export default DeleteBtn

