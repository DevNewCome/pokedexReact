import './index.css';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import image from '../../images/pokebola.png';
import imageLupa from '../../images/lupa.png.png'

export default function Home() {
  const [nomePokemon, setNomePokemon] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [characteristics, setCharacteristics] = useState(null);
  const [error, setError] = useState(null);

  const random = () => Math.floor(Math.random() * 905);

  useEffect(() => {
    if (pokemonData) {
      const fetchData = async () => {
        try {
          const characteristicsResponse = await api.get(
            `pokemon-species/${pokemonData.name}`
          );
          setCharacteristics(characteristicsResponse.data);
        } catch (error) {
          console.error('Error fetching characteristics:', error);
          setCharacteristics(null);
        }
      };

      fetchData();
      console.log(pokemonData)
    }
  }, [pokemonData]);

  const handleSearch = async () => {
    if (!nomePokemon) {
      alert('Campo vazio');
      return;
    }

    try {
      const pokemonResponse = await api.get(`pokemon/${nomePokemon.toLowerCase()}`);
      setPokemonData(pokemonResponse.data);
      setError(null);
      setNomePokemon('');
    } catch (error) {
      console.error('Error:', error);
      setError('Pokemon não encontrado');
      setPokemonData(null);
      setCharacteristics(null);
    }
  };

  const handleRandomPokemon = async () => {
    try {
      const randomId = random();
      const pokemonDataResponse = await api.get(`pokemon/${randomId}`);
      setPokemonData(pokemonDataResponse.data);
    } catch (error) {
      console.error('Error fetching random Pokemon:', error);
    }
  };

  return (
  
    <div className="container">
      <div className="inputs">
        <input
          placeholder="Search here"
          value={nomePokemon}
          onChange={(e) => setNomePokemon(e.target.value)}
        />
        <button className='btnLupa' onClick={handleSearch}> <img className="lupa" src={imageLupa} alt="Pokeball" /></button>
        <button className="btnPokebola" onClick={handleRandomPokemon}>
          <img className="pokebola" src={image} alt="Pokeball" />
        </button>
      </div>
      <div className="card">
        {pokemonData ? (
          <>
           <div className='classe-pokemon'>
              <h1>{pokemonData.name}</h1>
           </div>
            <div className="nome-pokemon">
              <p>{pokemonData.types.map((item) => item.type.name)}</p>
            </div>
            <div className="container-skills">
              <div className="foto-pokemon">
                <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
              </div>
              <div className="content-skills">
                <p>Power: {pokemonData.base_experience}</p>
                <p>Weight: {pokemonData.weight}</p>
                <p>
                <p>Habitat: {characteristics ? (characteristics.habitat ? characteristics.habitat.name : "Forest") : "Forest"}</p>
                </p>
              </div>
              <div className="descricao-pokemon">
                <div>
                  <h1>Powers</h1>
                  {pokemonData.abilities.length > 0 ? (
                    <ul>
                      {pokemonData.abilities.map((item) => (
                        <li key={item.ability.name}>{item.ability.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Características não encontradas</p>
                  )}
                </div>
                {characteristics ? (
                  <div className="subText">
                    <h1>Generation</h1>
                    <p>{characteristics.generation.name}</p>
                  </div>
                ) : (
                  <p>Generation Default</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="notFound">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
