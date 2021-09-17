import {useState,useEffect} from 'react'
import RecipeCard from '../components/RecipeCard.js'

function Accueil() {
    const [recipes, setRecipes] = useState(null)
    // const [searchValue, setSearchValue] = useState("")
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
        const { name, value, type, checked } = e.target;
        setStateFilter(prevState => ({
          ...prevState,
          [name]: type !== 'checkbox' ? value : checked 
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

    // console.log(stateFilter)



    return (
        <div className="container">
            <div className="filter-group">
                <div className="filter-item">
                    <label htmlFor="searchBar">Rechercher</label>
                    <input type="text" id="searchBar" name="titre" onChange={handleFilter} value={stateFilter.titre}/>
                </div>
                <div className="filter-item">
                    <p>Niveau de recette</p>
                    <label htmlFor="padawan">Padawan</label>
                    <input type="checkbox" id="padawan" name="padawan" onChange={handleNiveau} />
                    <label htmlFor="jedi">jedi</label>
                    <input type="checkbox" id="jedi" name="jedi" onChange={handleNiveau} />
                    <label htmlFor="maitre">maitre</label>
                    <input type="checkbox" id="maitre" name="maitre" onChange={handleNiveau} />
                </div>
                <div className="filter-item">
                    <p>Personnes prévues :</p>
                    <label htmlFor="firstRange">Min :  </label>
                    <input type="number" id="firstRange" name="minPersonnes" onChange={handleFilter} min="0" />
                    <label htmlFor="secondRange">Max :  </label>
                    <input type="number" id="secondRange" name="maxPersonnes" onChange={handleFilter} min="0" />
                </div>
                <div className="filter-item">
                    <label htmlFor="tpsPrepa">Temps de préparation : </label>
                    <input type="number" id="tpsPrepa" name="tpsPrepa" onChange={handleFilter} value={stateFilter.tpsPrepa} min="0" />
                </div>
            </div>

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
    )
}

export default Accueil
