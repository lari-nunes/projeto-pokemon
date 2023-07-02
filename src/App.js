import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Listagem from './pages/Listagem';
import Detalhes from './pages/Detalhes';

const App = () => {
  const [pokemonSelecionado, setPokemonSelecionado] = useState();

  const handlePokemonSelecionado = url => {
    setPokemonSelecionado(url);
  };

  return (
    <ChakraProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={
              pokemonSelecionado ? (
                <Detalhes pokemonSelecionado={pokemonSelecionado} />
              ) : (
                <Listagem handlePokemonSelecionado={handlePokemonSelecionado} />
              )
            } />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
