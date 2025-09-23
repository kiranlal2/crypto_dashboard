import { useState, useMemo, useEffect, useRef } from "react";
import useFetch from "./hooks/useFetch";
import { usePortfolio } from "./hooks/usePortfolio";
import SearchFilter from "./components/SearchFilter";
import CoinCard from "./components/CoinCard";
import Portfolio from "./components/Portfolio";
import Sidebar from "./components/Sidebar"
import "./App.css";


export default function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);

  // debounce handler
  const debouncer = useRef(null);
  useEffect(() => {
    if (debouncer.current) {
      clearTimeout(debouncer.current);
    }
    debouncer.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(debouncer.current);
  }, [query]);

  // fetch data
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}`;
  const { loading, error, data } = useFetch(url, [page], {
    cacheKey: `page-${page}`,
    refreshInterval: 10000,
  });

  // portfolio context
  const { state: portfolioState } = usePortfolio();

  // search & filter
  const filtered = useMemo(() => {
    if (!data) return [];
    let list = [...data];

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
      );
    }

    if (filter === "GAINERS")
      list = list
        .filter((c) => c.price_change_percentage_24h >= 0)
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

    if (filter === "LOSERS")
      list = list
        .filter((c) => c.price_change_percentage_24h < 0)
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);

    return list;
  }, [data, debouncedQuery, filter]);

  // portfolio total
  const portfolioTotal = useMemo(
    () => portfolioState.items.reduce((t, i) => t + i.price * i.qty, 0),
    [portfolioState.items]
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Crypto Dashboard</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name..."
          style={styles.input}
        />
      </header>

      <main style={styles.main}>
        <section style={styles.maincontent}>
          <SearchFilter filter={filter} setFilter={setFilter} page={page} setPage={setPage} />
          <div style={styles.grid}>
            <Sidebar />
            <div style={styles.gridcards}>
              {loading && <div>Loading...</div>}
              {error && <div style={{ color: "red" }}>{error}</div>}
              {!loading && filtered.length === 0 && <div>No results</div>}
              {filtered.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          </div>
        </section>

        <aside style={styles.right}>
          <Portfolio portfolioTotal={portfolioTotal} />
        </aside>
      </main>

      <footer style={styles.footer}>
        Data from CoinGecko — auto-refresh every 10s. Caching per page enabled.
      </footer>
    </div>
  );
}

const styles = {
  container: { with: "100dvw", padding: "50px", fontFamily: "sans-serif", backgroundColor: "#0d1017", color: "#FFF" },
  header: { display: "flex", justifyContent: "space-between", marginBottom: "20px", backgroundColor: "#000", padding: "20px", borderRadius: "10px" },
  input: { padding: "0px 20px",margin: 0,  fontSize: "14px", borderRadius: "6px" },
  main: { display: "flex", gap: "20px", padding: "20px", backgroundColor: "#000", borderRadius: "10px" },
  maincontent: { display: "flex", flexDirection: "column", flex: 5, gap: "20px", padding: "20px" },
  right: { flex: 1 },
  grid: { display: "grid", gridTemplateColumns: "3fr 10fr", gap: "16px" },
  gridcards: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
  footer: { marginTop: "20px", fontSize: "12px", color: "#888" },
};
