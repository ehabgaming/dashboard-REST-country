import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CountryDetails from "./pages/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(
          "https://api.restcountries.com/countries/v5?pretty=1&limit=100",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          },
        );

        const data = await response.json();

        setCountries(data.data?.objects || []);
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={<Dashboard countries={countries} loading={loading} />}
        />

        <Route
          path="/country/:uuid"
          element={<CountryDetails countries={countries} loading={loading} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
