import React, {useState} from 'react'

function DeleteBtn(props) {
    const id = props.recipeId
    const [popup, setPopup] = useState(false)
    const [message,setMessage] = useState("")

    const handlePopup = (e) => {
        e.preventDefault()
        setPopup(!popup)
    }
    const deleteRecipe = e => {
        e.preventDefault()
        fetch(`http://localhost:9000/api/recipe/${id}`,{method:'DELETE'})
        .then(res => res.json())
        .then(data => {
            setMessage(data.message)
        })
    }
    return (
        <div>
            
            <button className="deleteBtn btn" onClick={handlePopup}>supprimer</button>
            {popup && 
                <div className="popup-container">
                    { message !== "" ? 
                    <div className="popup">
                        <p>{message}</p>
                        <button onClick={() => window.location.reload(false)} className="noBtn btn">Ok</button>
                    </div> : 
                    <div className="popup">
                            <p>Êtes-vous sur de vouloir supprimer cette recette ?</p>
                            <div>
                                <button onClick={handlePopup} className="noBtn btn">Non</button>
                                <button type="button" onClick={deleteRecipe} className="yesBtn btn">Oui</button>
                            </div>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export default DeleteBtn

