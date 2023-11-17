import './App.scss'
import Pokedex from './components/Pokedex'
import { Route, Routes, Link } from "react-router-dom";
import PokemonInfo from "./components/PokemonInfo";

function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonInfo />} />
    </Routes>

    </>
  )
}

export default App
