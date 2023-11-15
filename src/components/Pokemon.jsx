import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Pokemon({ pokemon }) {
  const [pokemonDetail, setPokemonDetail] = useState();
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    getData(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`);
    getPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
  }, []);

  const getData = async (url) => {
    const response = await axios.get(url);
    setPokemonDetail(response.data);
    // console.log(response.data);
  };

  const getPokemon = async (u) => {
    const response = await axios.get(u);
    setPokemons(response.data);
    // console.log(response.data);
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );

  return (
    <>
      {!pokemonDetail ? (
        <p>Error</p>
      ) : !pokemons ? (
        <p>Error</p>
      ) : (
        <Card
          className="pokemonCard"
          sx={{ minWidth: 275, backgroundColor: "#f7f7f7" }}
        >
          <img
            src={`../src/assets/${pokemons.types[0].type.name}.jpg`}
            className="elementIcon"
          />
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <img
                className="pokemonCardImg"
                src={pokemons.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
            </Typography>
            <Typography
              sx={{ mt: 1 }}
              variant="h5"
              component="div"
              textAlign={"center"}
            >
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Typography>
            <Typography sx={{ mb: -2, mt: 1 }} color="text.secondary">
              {pokemonDetail.genera[7].genus}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/pokemon/${pokemon.name}`}>
              <Button size="small">View Details</Button>
            </Link>
          </CardActions>
        </Card>
      )}
    </>
  );
}
