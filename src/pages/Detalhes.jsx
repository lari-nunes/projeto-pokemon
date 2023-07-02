import React, { useEffect, useState } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import "./Pokemon.css";
import pokemonLogo from './img/pokeLogo.png';
import pokedex from './img/pokedex4.png';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios';

const Detalhes = ({ pokemonSelecionado }) => {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(pokemonSelecionado);
        setPokemon(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (pokemonSelecionado) {
      fetchPokemon();
    }
  }, [pokemonSelecionado]);

  return (
    <Box>
      {pokemon && (
        <Box className='namePokemon'>
          <img className="fotoDetalhes" src={pokemonLogo} alt="Pokemon Logo" width={200} />
          <a href="/" className='pagAnterior'>< AiOutlineArrowLeft /></a>
          <div className="pokedexContainer">
            <img src={pokedex} alt="Pokedex" className="pokedexImage" />
            <div className="pokemonInfo">
              {pokemon.sprites.front_default && (
                <div className="pokemonImage">
                  <Image src={pokemon.sprites.other['official-artwork'].front_default} alt="pokeName"  width={170} />
                </div>
              )}
              <div className='detalhesPoke'>
                <Text fontSize={20}>Nome: {pokemon.name}</Text>
                <Text fontSize={20}>Peso: {pokemon.weight.toFixed(1)} kg</Text>
                <Text fontSize={20}>Altura: {pokemon.height}</Text>
                <Text fontSize={20}>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}</Text>
              </div>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Detalhes;
