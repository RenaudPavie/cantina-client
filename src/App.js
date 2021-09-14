import {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [recipes, setRecipes] = useState(null)

  useEffect(() => {
    fetch('http://localhost:9000/api/recipes')
    .then(res => res.json())
    .then(data => setRecipes(data))
  },[])

  return (
    <div className="App">
      <header className="App-header">
        {recipes && recipes.map(e => 
          <p key={e.id}>{e.titre}</p>
        )}
      </header>
    </div>
  );
}

export default App;
