import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("ALL");

  return (
    <>
      <div className="App">
        <h1>Countries Dashboard</h1>
      </div>
    </>
  );
}

export default App;
