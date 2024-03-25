import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import CharacterPage from "./CharacterPage";
import "./App.css"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:id" element={<CharacterPage/>}/>

      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
