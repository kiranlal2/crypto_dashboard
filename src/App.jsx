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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const baseurl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}`;
  const { loading, error, data } = useFetch(baseurl, [page], {
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

  // styles moved inside App to access isMobile
  const styles = {
    container: { with: "100dvw", padding: "20px", fontFamily: "sans-serif", backgroundColor: "#0d1017", color: "#FFF" },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", backgroundColor: "#000", padding: "20px", borderRadius: "10px" },
    searchinput: { borderRadius: "30px", height: "20px", padding: "10px 20px", border: "none", outline: "none", width: "200px", backgroundColor: "#1f2730", color: "#FFF" },
    main: { display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px", padding: "20px", backgroundColor: "#000", borderRadius: "10px" },
    maincontent: { display: "flex", flexDirection: "column", flex: 5, gap: "20px", padding: "20px" },
    right: { flex: 1 },
    grid: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 10fr", gap: "16px" },
    gridcards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" },
    footer: { marginTop: "20px", fontSize: "12px", color: "#888" },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Crypto Dashboard</h2>
        <input value={query} onChange={(e) => setQuery(e.target.value)} style={styles.searchinput} type="text" name="search" id="search" placeholder="Search the Crypto Name" />
      </header>

      <main style={styles.main}>
        <section style={styles.maincontent}>
          <SearchFilter style={styles.filter} filter={filter} setFilter={setFilter} page={page} setPage={setPage} />
          <div style={styles.grid}>
            <Sidebar data={data}  />
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
        Data from CoinGecko — © {new Date().getFullYear()} Crypto Dashboard. All rights reserved by Kiran lal J.
      </footer>
    </div>
  );
}
