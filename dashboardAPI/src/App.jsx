import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const getCountries = async () => {
    const res = await fetch(
      "https://api.restcountries.com/countries/v5?pretty=1&limit=100",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      },
    );

    const data = await res.json();
    console.log(data);

    setCountries(data.data.objects);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCountries();
  }, []);

  const shownCountries = countries.filter((country) => {
    if (
      search !== "" &&
      !country.names.common.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    if (region !== "All" && country.region !== region) {
      return false;
    }

    return true;
  });

  const totalCountries = shownCountries.length;

  const totalPopulation = shownCountries.reduce((total, country) => {
    return total + country.population;
  }, 0);

  const averagePopulation =
    totalCountries > 0 ? Math.round(totalPopulation / totalCountries) : 0;

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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      {shownCountries.map((country) => (
        <div className="country" key={country.uuid}>
          {country.flag.url_png && (
            <img src={country.flag.url_png} alt={country.names.common} />
          )}

          <h3>{country.names.common}</h3>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capitals?.[0]?.name || "None"}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
