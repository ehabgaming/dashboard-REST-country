import { Link, useParams } from "react-router";

function CountryDetails({ countries, loading }) {
  const { uuid } = useParams();

  const country = countries.find((item) => String(item.uuid) === String(uuid));

  if (loading) {
    return <h2>Loading country...</h2>;
  }

  if (!country) {
    return (
      <div>
        <h1>Country not found</h1>
        <Link to="/">Back to dashboard</Link>
      </div>
    );
  }

  const population = country.population || 0;
  const area = country.area || 0;

  const populationDensity = area > 0 ? Math.round(population / area) : 0;

  const languages = country.languages
    ? Object.values(country.languages)
        .map((language) => {
          if (typeof language === "string") {
            return language;
          }

          return language.name || language.common;
        })
        .filter(Boolean)
        .join(", ")
    : "Not available";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => {
          if (typeof currency === "string") {
            return currency;
          }

          return currency.name;
        })
        .filter(Boolean)
        .join(", ")
    : "Not available";

  return (
    <div className="details-page">
      <Link className="back-link" to="/">
        ← Back to dashboard
      </Link>

      <div className="details-header">
        <div>
          <h1>{country.names.common}</h1>

          <p>Official name: {country.names.official || country.names.common}</p>
        </div>

        {country.flag?.url_png && (
          <img
            src={country.flag.url_png}
            alt={`${country.names.common} flag`}
          />
        )}
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <p>Capital</p>
          <h3>{country.capitals?.[0]?.name || "None"}</h3>
        </div>

        <div className="detail-card">
          <p>Population</p>
          <h3>{population.toLocaleString()}</h3>
        </div>

        <div className="detail-card">
          <p>Region</p>
          <h3>{country.region || "Not available"}</h3>
        </div>

        <div className="detail-card">
          <p>Subregion</p>
          <h3>{country.subregion || "Not available"}</h3>
        </div>

        <div className="detail-card">
          <p>Area</p>
          <h3>{area ? `${area.toLocaleString()} km²` : "Not available"}</h3>
        </div>

        <div className="detail-card">
          <p>Population Density</p>
          <h3>
            {populationDensity
              ? `${populationDensity.toLocaleString()} people per km²`
              : "Not available"}
          </h3>
        </div>

        <div className="detail-card">
          <p>Languages</p>
          <h3>{languages}</h3>
        </div>

        <div className="detail-card">
          <p>Currencies</p>
          <h3>{currencies}</h3>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
