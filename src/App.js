import {BrowserRouter, Route, NavLink} from 'react-router-dom'

import Accueil from './views/Accueil'
import Recipe from './views/Recipe'
import AddRecipe from './views/AddRecipe'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavLink to="/" activeClassName="selected" exact>Recettes</NavLink>
          <NavLink to="/new-recipe" exact>Ajouter une nouvelle recette</NavLink>
        </header>

        {/* Accueil */}
        <Route path="/" component={Accueil} exact />
        {/* Recette */}
        <Route path="/recette/:id" component={Recipe} />
        {/* Formulaire d'ajout de recette */}
        <Route path="/new-recipe" component={AddRecipe} />
      </div>
    </BrowserRouter>
  );
}

export default App;
