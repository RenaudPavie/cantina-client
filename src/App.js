import {BrowserRouter, Route, NavLink} from 'react-router-dom'

import Accueil from './views/Accueil'
import Recipe from './views/Recipe'
import AddRecipe from './views/AddRecipe'
import EditRecipe from './views/EditRecipe'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavLink to="/" activeClassName="selected" exact>Recettes</NavLink>
          <NavLink to="/new-recipe" exact>Ajouter une recette</NavLink>
        </header>

        {/* Accueil */}
        <Route path="/" component={Accueil} exact />
        {/* Recette */}
        <Route path="/recipe/:id" component={Recipe} />
        {/* Formulaire d'ajout de recette */}
        <Route path="/new-recipe" component={AddRecipe} />
        {/* Formulaire de modification de recette */}
        <Route path="/edit-recipe/:id" component={EditRecipe} />
      </div>
    </BrowserRouter>
  );
}

export default App;
