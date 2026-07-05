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
    <div className="App">
      <h1>Countries Dashboard</h1>

      <div className="stats">
        <div>
          <h2>{totalCountries}</h2>
          <p>Total Countries</p>
        </div>

        <div>
          <h2>{totalPopulation.toLocaleString()}</h2>
          <p>Total Population</p>
        </div>

        <div>
          <h2>{averagePopulation.toLocaleString()}</h2>
          <p>Average Population</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search country"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setRegion(e.target.value)}>
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      {shownCountries.map((country) => (
        <div className="country" key={country.name.common}>
          <h3>{country.name.common}</h3>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
