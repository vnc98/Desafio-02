import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';


function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repositorie = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })

    setRepositories([...repositories, repositorie.data])

  }

  async function handleRemoveRepository(id) {
    const repositorie = await api.delete(`repositories/${id}`, {})

    if(repositorie.status === 204) {
      setRepositories(repositories.filter(repositorie => {
        return repositorie.id !== id
      }))
      return;
    }

    alert("Repositório não existe")
  }

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories != [] && (
          repositories.map(repositorie => (
            <li key={repositorie.id}>
            {console.log(repositorie.id)}
             {repositorie.title}
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
          </button>
            </li>
          ))
        )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
