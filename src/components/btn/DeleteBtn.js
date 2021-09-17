import React, {useState} from 'react'

function DeleteBtn(props) {
    const id = props.recipeId
    const [popup, setPopup] = useState(false)

    const handlePopup = (e,id) => {
        e.preventDefault()
        setPopup(!popup)
    }
    const deleteRecipe = e =>{
        e.preventDefault()
        fetch(`http://localhost:9000/api/recipe/${id}`,{method:'DELETE'})
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div>
            
            <button className="deleteBtn btn" onClick={handlePopup}>supprimer</button>
            {popup && 
                <div className="popup-container">
                    <div className="popup">
                        <p>Êtes-vous sur de vouloir supprimer cette recette ?</p>
                        <button onClick={handlePopup}>Non</button>
                        <button onClick={deleteRecipe}>Oui</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeleteBtn

