import {BrowserRouter, Route, NavLink} from 'react-router-dom'

import Accueil from './views/Accueil'
import Recipe from './views/Recipe'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavLink to="/" activeClassName="selected" exact>Accueil</NavLink>
        </header>

        {/* Accueil */}
        <Route path="/" component={Accueil} exact />
        {/* Recette */}
        <Route path="/recipe/:id" component={Recipe} />
      </div>
    </BrowserRouter>
  );
}

export default App;
