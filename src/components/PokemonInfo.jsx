import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";

export default function PokemonInfo({}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemonDetail, setPokemonDetail] = useState();
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    getData(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }, []);

  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      setPokemonDetail(response.data);
    // console.log(response.data);
    } catch (error) {
      console.log(error)
    }

  };

  const getPokemon = async (u) => {
    try {
      const response = await axios.get(u);
      setPokemons(response.data);
    // console.log(response.data);
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <>
      {!pokemons ? (
        <p>Error</p>
      ) : (
        <div>
          <div className="pokemonName">
            <h3>
              {pokemons.name.charAt(0).toUpperCase() + pokemons.name.slice(1)}
            </h3>
            <img src={`../src/assets/${pokemons.types[0].type.name}.jpg`} />
          </div>
          <div className="singlePokemonContainer">
            <div className="imgType">
              <img
                className="pokemonCardImgSingle"
                src={pokemons.sprites.other["official-artwork"].front_default}
              />
              <div>
                {pokemonDetail.egg_groups.map((element) => {
                  return (
                    <div key={element.name}>
                    <button  className="classBtn">
                      {element.name.charAt(0).toUpperCase() +
                        element.name.slice(1)}
                    </button>
                    </div>
                  );
                })}
                <button className="classBtn">
                  {pokemonDetail.genera[7].genus}
                </button>
              </div>
              <Card className="flavorText" sx={{ mt: 3 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {pokemonDetail.flavor_text_entries[0].flavor_text}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>

            <div className="gridRest">
              <Card
                className="graph"
                sx={{ mt: 0, maxWidth: 460, maxHeight: 235 }}
              >
                <CardActionArea>
                  <CardContent>
                      <div className="bar-graph bar-graph-vertical bar-graph-two">
                        <div className="bar-one bar-container">
                          <div
                            className="bar"
                            data-percentage={pokemons.stats[0].base_stat + "%"}
                            style={{
                              height: `${pokemons.stats[0].base_stat}%`,
                            }}
                          ></div>
                          <span className="year">HP</span>
                        </div>
                        <div className="bar-two bar-container">
                          <div
                            className="bar"
                            data-percentage={pokemons.stats[1].base_stat + "%"}
                            style={{
                              height: `${pokemons.stats[1].base_stat}%`,
                            }}
                          ></div>
                          <span className="year">Atk</span>
                        </div>
                        <div className="bar-three bar-container">
                          <div
                            className="bar"
                            data-percentage={pokemons.stats[2].base_stat + "%"}
                            style={{
                              height: `${pokemons.stats[2].base_stat}%`,
                            }}
                          ></div>

                          <span className="year">Def</span>
                        </div>
                        <div className="bar-four bar-container">
                          <div
                            className="bar"
                            data-percentage={pokemons.stats[3].base_stat + "%"}
                            style={{
                              height: `${pokemons.stats[3].base_stat}%`,
                            }}
                          ></div>

                          <span className="yearSP">
                            SP
                            <br /> Atk
                          </span>
                        </div>
                        <div className="bar-four bar-container">
                          <div
                            className="bar"
                            data-percentage={pokemons.stats[4].base_stat + "%"}
                            style={{
                              height: `${pokemons.stats[4].base_stat}%`,
                            }}
                          ></div>

                          <span className="yearSP">
                            SP
                            <br /> Def
                          </span>
                        </div>
                        <div className="bar-four bar-container">
                          <div
                            className="bar"
                            data-percentage={pokemons.stats[5].base_stat + "%"}
                            style={{
                              height: `${pokemons.stats[5].base_stat}%`,
                            }}
                          ></div>
                          <span className="year">SPD</span>
                        </div>
                      </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              <div>
                <Card className="graph" sx={{ mt: 4, maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <div className="pokeDetials">
                        <div>
                          <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: "bold" }}>Weight:</span>{" "}
                            {pokemons.weight / 10} kg
                          </Typography>
                          <br />
                          <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: "bold" }}>Height:</span>{" "}
                            {pokemons.height / 10} m
                          </Typography>
                        </div>

                        <div>
                          <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: "bold" }}>Habitat:</span>{" "}
                            {pokemonDetail.habitat.name
                              .charAt(0)
                              .toUpperCase() +
                              pokemonDetail.habitat.name.slice(1)}
                          </Typography>
                          <br />
                          <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: "bold" }}>Ability:</span>{" "}
                            {pokemons.abilities[0].ability.name
                              .charAt(0)
                              .toUpperCase() +
                              pokemons.abilities[0].ability.name.slice(1)}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>

          </div>
          <Button style={{ display: 'block', margin: 'auto', marginTop: 10 }} className="backBtn" onClick={() => {
              navigate(-1);
            }} variant="outlined">Go Back</Button>
          </div>
      )}
    </>
  );
}
