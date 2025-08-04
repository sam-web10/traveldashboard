import { useState, useEffect } from "react";
import { fetchCities } from "../../api/api";

function Search({ onSearchChange }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(false);

  //  to get from local storage
  useEffect(() => {
    const a = localStorage.getItem("recentSearches");
    if (a) {
      setRecent(JSON.parse(a));
    }}, []); 

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recent))
  }, [recent]);

  useEffect(() => {
    if (query.length < 3) {
      setOptions([]);
      return; }
    setLoading(true);

    fetchCities(query).then((data) => {
   
      let cities = data.data.map((city) => {
        return {
          label: city.city + ", " + city.countryCode,
          value: city.latitude + " " + city.longitude
        }; });
      setOptions(cities);
      setLoading(false);
   }).catch((err) => {
      console.log("err", err); 
      setLoading(false);
    });

  }, [query]);

  const selectHandler = (opt) => {
    setQuery(opt.label);
    setOptions([]);
    onSearchChange(opt); 

let exist = recent.find(r => r.label === opt.label);
    if (!exist) {
      let x = [opt, ...recent];
      if (x.length > 3) x.pop(); // limit to 3
      setRecent(x);
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <input
        type="text"
        value={query}
        placeholder="Search city"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        style={{
          width: "100%",
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 4,
          marginBottom: 10
        }}
      />

      {loading && <div>Loading...</div>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {options.map((o) => (
          <li
            key={o.value}
            onClick={() => selectHandler(o)}
            style={{
              padding: 5,
              cursor: "pointer",
              borderBottom: "1px solid #eee"
            }}
          >
            {o.label}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <p>Recent Searches:</p>
        <ul>
          {recent.map((r, i) => (
            <li key={i}>{r.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Search;
