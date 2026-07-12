import { useState } from "react";
import { Link } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartColors = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
  "#0891b2",
];

function Dashboard({ countries, loading }) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const shownCountries = countries.filter((country) => {
    const name = country.names?.common || "";

    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());

    const matchesRegion = region === "All" || country.region === region;

    return matchesSearch && matchesRegion;
  });

  const totalCountries = shownCountries.length;

  const totalPopulation = shownCountries.reduce((total, country) => {
    return total + (country.population || 0);
  }, 0);

  const averagePopulation =
    totalCountries > 0 ? Math.round(totalPopulation / totalCountries) : 0;

  const topPopulationData = [...shownCountries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map((country) => ({
      name: country.names.common,
      population: country.population,
    }));

  const regionTotals = {};

  shownCountries.forEach((country) => {
    const countryRegion = country.region || "Other";

    regionTotals[countryRegion] = (regionTotals[countryRegion] || 0) + 1;
  });

  const regionData = Object.entries(regionTotals).map(([name, value]) => ({
    name,
    value,
  }));

  if (loading) {
    return <h2>Loading countries...</h2>;
  }

  return (
    <div className="dashboard">
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

      <div className="filters">
        <input
          type="text"
          placeholder="Search country"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="charts">
        <div className="chart-card">
          <h2>Top 10 Countries by Population</h2>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topPopulationData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-30}
                textAnchor="end"
                height={80}
                interval={0}
              />

              <YAxis
                tickFormatter={(value) => `${Math.round(value / 1000000)}M`}
              />

              <Tooltip formatter={(value) => Number(value).toLocaleString()} />

              <Bar dataKey="population" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Countries in Each Region</h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={regionData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {regionData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="country-list">
        {shownCountries.map((country) => (
          <Link
            className="country-link"
            to={`/country/${country.uuid}`}
            key={country.uuid}
          >
            <div className="country">
              {country.flag?.url_png && (
                <img
                  src={country.flag.url_png}
                  alt={`${country.names.common} flag`}
                />
              )}

              <div>
                <h3>{country.names.common}</h3>
                <p>Region: {country.region}</p>

                <p>Capital: {country.capitals?.[0]?.name || "None"}</p>

                <p>Population: {country.population.toLocaleString()}</p>
              </div>

              <span className="view-details">View details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
