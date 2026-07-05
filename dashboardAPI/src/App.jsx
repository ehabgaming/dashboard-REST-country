import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("ALL");

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    setCountries(data);
  };

  const shownCountries = countries.filter((country) => {
    if (
      search !== "" &&
      !country.name.common.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    if (region !== "ALL" && country.region !== region) {
      return false;
    }
    return true;
  });

  const totalCountries = shownCountries.length;

  const totalPopulation = shownCountries.reduce((total, country) => {
    return total + country.population;
  }, 0);

  const averagePopulation = Math.round(totalPopulation / totalCountries);

  return (
    <>
      <div className="App">
        <h1>Countries Dashboard</h1>
      </div>
    </>
  );
}

export default App;
