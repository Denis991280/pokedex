import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonInfo({}) {
    const {namePokemon} = useParams()

    const [pokemonDetail, setPokemonDetail] = useState();
    const [pokemons, setPokemons] = useState();
  
    useEffect(() => {
      getData(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`);
      getPokemon(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    }, []);
  
    const getData = async (url) => {
      const response = await axios.get(url);
      setPokemonDetail(response.data);
      console.log(response.data);
    };
  
    const getPokemon = async (u) => {
      const response = await axios.get(u);
      setPokemons(response.data);
      console.log(response.data);
    };

    return (
        <>
            {!pokemons ? <p>Error</p> :
            <div className="singlePokemonContainer">
            <img className="pokemonCardImgSingle" src={pokemons.sprites.other["official-artwork"].front_default} />

<section className="bar-graph bar-graph-vertical bar-graph-two">
  <div className="bar-one bar-container">
    <div className="bar" data-percentage={pokemons.stats[0].base_stat + "%"} style={{height: `${pokemons.stats[0].base_stat}%`}}></div>
    <span className="year">HP</span>
  </div>
  <div className="bar-two bar-container">
    <div className="bar" data-percentage={pokemons.stats[1].base_stat + "%"} style={{height: `${pokemons.stats[1].base_stat}%`}}> </div>
    <span className="year">Atk</span>
  </div>
  <div className="bar-three bar-container">
  <div className="bar" data-percentage={pokemons.stats[2].base_stat + "%"} style={{height: `${pokemons.stats[2].base_stat}%`}}> </div>

    <span className="year">Def</span>
  </div>
  <div className="bar-four bar-container">
  <div className="bar" data-percentage={pokemons.stats[3].base_stat + "%"} style={{height: `${pokemons.stats[3].base_stat}%`}}> </div>

    <span className="yearSP">SP Atk</span>
  </div>
  <div className="bar-four bar-container">
  <div className="bar" data-percentage={pokemons.stats[4].base_stat + "%"} style={{height: `${pokemons.stats[4].base_stat}%`}}> </div>

    <span className="yearSP">SP Def</span>
  </div>
  <div className="bar-four bar-container">
  <div className="bar" data-percentage={pokemons.stats[5].base_stat + "%"} style={{height: `${pokemons.stats[5].base_stat}%`}}> </div>

    <span className="year">SPD</span>
  </div>
</section>
<div>
<button>{pokemonDetail.egg_groups[0].name.charAt(0).toUpperCase() + pokemonDetail.egg_groups[0].name.slice(1)}</button>
<button>{pokemonDetail.egg_groups[1].name.charAt(0).toUpperCase() + pokemonDetail.egg_groups[1].name.slice(1)}</button>
<button>{pokemonDetail.genera[7].genus}</button>
</div>
</div>
            }

        </>
    )
}