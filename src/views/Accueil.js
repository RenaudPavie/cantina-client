import {useState,useEffect} from 'react'
import RecipeCard from '../components/RecipeCard.js'

function Accueil() {
    const [recipes, setRecipes] = useState(null)
    const [stateFilter, setStateFilter] = useState({
        titre:"",
        niveau:[],
        minPersonnes:"",
        maxPersonnes:"",
        tpsPrepa:"",
    })

    useEffect(() => {
      fetch('http://localhost:9000/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
    },[])

    const handleFilter = e => {
        const { name, value  } = e.target;
        setStateFilter(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleNiveau = e => {
        const {name,checked} = e.target
        if (checked === true) {
            setStateFilter(prevState => ({
                ...prevState,
                niveau: [...prevState.niveau, name]
            }))
        } else {
            const tmpArr = stateFilter.niveau.filter(item => item !== name)
            setStateFilter(prevState => ({
                ...prevState,
                niveau: tmpArr
            }))
        }
    }

    return (
        <div className="container">
            <div className="row home">
                <div className="filter-col">
                    <div className="filter-group">
                        <div className="filter-item">
                            <input placeholder="Rechercher..." type="text" id="searchBar" name="titre" onChange={handleFilter} value={stateFilter.titre}/>
                        </div>
                        <div className="filter-item">
                            <p>Niveau de recette</p>
                            <div className="filter-checkbox">
                                <label htmlFor="padawan">Padawan</label>
                                <input type="checkbox" id="padawan" name="padawan" onChange={handleNiveau} />
                            </div>
                            <div className="filter-checkbox">
                                <label htmlFor="jedi">jedi</label>
                                <input type="checkbox" id="jedi" name="jedi" onChange={handleNiveau} />
                            </div>
                            <div className="filter-checkbox">
                                <label htmlFor="maitre">maitre</label>
                                <input type="checkbox" id="maitre" name="maitre" onChange={handleNiveau} />
                            </div>
                        </div>
                        <div className="filter-item">
                            <p>Personnes prévues</p>
                            <div className="nbPers">
                                <label htmlFor="firstRange">De </label>
                                <input type="number" id="firstRange" name="minPersonnes" onChange={handleFilter} min="0" />
                            
                                <label htmlFor="secondRange"> à </label>
                                <input type="number" id="secondRange" name="maxPersonnes" onChange={handleFilter} min="0" />
                            </div>
                        </div>
                        <div className="filter-item">
                            <label htmlFor="tpsPrepa">Temps de préparation</label>
                            <input type="number" id="tpsPrepa" name="tpsPrepa" onChange={handleFilter} value={stateFilter.tpsPrepa} min="0" />
                        </div>
                    </div>
                </div>
                <div className="recipe-col">
                    <section className="cardWrapper">
                        {recipes && 
                        recipes.filter(recipe => {
                                if (stateFilter.titre !== "" && !recipe.titre.toLowerCase().includes(stateFilter.titre.toLowerCase())) return false
                                if (stateFilter.tpsPrepa !== "" && recipe.tempsPreparation > parseInt(stateFilter.tpsPrepa)) return false
                                if (stateFilter.minPersonnes !== "" && stateFilter.maxPersonnes !== "") {
                                    if (recipe.personnes < stateFilter.minPersonnes  || recipe.personnes > stateFilter.maxPersonnes ) return false
                                }
                                if(stateFilter.niveau.length > 0 && !stateFilter.niveau.includes(recipe.niveau)) return false
                            return true;
                        }).map(e => 
                            <RecipeCard 
                                key={e.id} 
                                data={e} 
                            />
                        )}
                    </section>
                </div>
                

            </div>
        </div>
    )
}

export default Accueil
