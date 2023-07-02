import React, { useEffect, useState, useCallback } from 'react';
import { Box, Text, Button, Flex} from '@chakra-ui/react';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'
import pokemonLogo from './img/pokeLogo.png';
import "./Pokemon.css";
import axios from 'axios';

const Listagem = ({ handlePokemonSelecionado }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
      const results = response.data.results;

      const pokemonDetailsPromises = results.map(result => axios.get(result.url));
      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
      const pokemonDetails = pokemonDetailsResponses.map(response => response.data);

      const combinedResults = results.map((result, index) => ({
        name: result.name,
        url: result.url,
        image: pokemonDetails[index]?.sprites?.front_default || '',
      }));

      setPokemons(combinedResults);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Box className='Box'>
      <Text fontSize={25} fontWeight="bold" mb={4} textAlign="center">
        <img src={pokemonLogo} alt="Pokemon Logo" width={200} />
      </Text>
      <div className='listagemPokemon'>
      {pokemons.map(pokemon => (
            <Box className="hoverPoke"
              key={pokemon.name}
              mb={4}
              p={2}
              fontWeight="bold"
              borderWidth="2px"
              borderRadius="md"
              display="flex"    
              alignItems="center"
              cursor="pointer"
              borderColor="#80471C"
              width="250px"
              onClick={() => handlePokemonSelecionado(pokemon.url)}
            >
              <img src={pokemon.image} alt={pokemon.name} width={130} height={130} color="#000"/>
              <Text>{pokemon.name}</Text>
            </Box>
          ))}
      </div>
         
          <Flex justify="center" className='hoverPag' _hover={"#80471C"}>
            <Button color="#000" onClick={handlePrevPage} disabled={page === 1}>
            <AiOutlineArrowLeft/>
            </Button>
            <Button color="#000" ml={4} onClick={handleNextPage}>
            <AiOutlineArrowRight/>
            </Button>
          </Flex>
    </Box>
  );
};

export default Listagem;