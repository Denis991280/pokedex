import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageOffSet, setPageOffSet] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    getData(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${pageOffSet}`);
  }, [pageOffSet, pageNumber]);

  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      setPokemons(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    setPageOffSet(pageOffSet + 24);
    if (pageOffSet === 0) {
      setButtonDisable(false);
    }
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
    setPageOffSet(pageOffSet - 24);
    if (pageOffSet === 24) {
      setButtonDisable(true);
    }
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value);
    const newOffset = (value - 1) * 24;
    setPageOffSet(newOffset);
    if (value === 1) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  };

  return (
    <>
      <div className="pokedex">
        {!pokemons ? (
          <p>Data error!</p>
        ) : (
          pokemons.map((element) => {
            return <Pokemon key={element.name} pokemon={element} />;
          })
        )}
        <div className="buttonsContainer">
          <button
            disabled={buttonDisable}
            className="navBtn"
            onClick={handlePrevious}
          >
            Previous
          </button>

          <Stack spacing={2}>
            <Pagination
              count={20}
              color="primary"
              page={pageNumber}
              onChange={handlePageChange}
              hideNextButton={true}
              hidePrevButton={true}
            />
          </Stack>
          <button className="navBtn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
