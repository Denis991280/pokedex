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
  const [buttonDisableNext, setButtonDisableNext] = useState(false);

  useEffect(() => {
    getData(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${pageOffSet}`);
  }, [pageOffSet, pageNumber]);

  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      setPokemons(response.data.results);
      // console.log(response.data.results);
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

    if(pageOffSet === 120) {
      setButtonDisableNext(true)
    }
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
    setPageOffSet(pageOffSet - 24);
    if (pageOffSet === 24) {
      setButtonDisable(true);
    } else if(pageOffSet < 168) {
      setButtonDisableNext(false)
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

    if(value === 7) {
      setButtonDisableNext(true);
    } else {
      setButtonDisableNext(false);
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

          <Stack spacing={4}>
            <Pagination
              count={7}
              color="primary"
              page={pageNumber}
              onChange={handlePageChange}
              hideNextButton={true}
              hidePrevButton={true}
            />
          </Stack>
          <button disabled={buttonDisableNext} className="navBtn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
