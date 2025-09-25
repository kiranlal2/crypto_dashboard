import React from 'react'

export default function Sidebar({data}) {

  const profitable = data
  ?.filter((coin) => coin.price_change_percentage_24h > 0)
  .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);



  return (

    <div>
        <aside style={styles.sidebar}>
            <div style={styles.sidehead}>Staking</div>
            <nav style={styles.nav}>
              <button style={styles.navbtn}>Dashboard</button>
              <button style={styles.navbtn}>Assets</button>
              <button style={styles.navbtn}>Providers</button>
              <button style={styles.navbtn}>Calculator</button>
              <button style={styles.navbtn}>Liquid Staking</button>
            </nav>
        </aside>
        {/* Active Staking */}
        <div style={styles.activestaking}>
          <div style={styles.stakinghead}>Active profitable coins</div>
          <ul style={styles.stackinglist}>
            {profitable && profitable.length > 0 ? (
              profitable.map((coin) => (
                <li key={coin.id} style={styles.stackingItem}>
                  <span>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width={20}
                      height={20}
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    />
                    {coin.name}
                  </span>
                  <span style={{ color: "green", textAlign: 'right' }}>
                    ${coin.current_price.toLocaleString()} (
                    {coin.price_change_percentage_24h.toFixed(2)}%)
                  </span>
                </li>
              ))
            ) : (
              <li>No profitable coins</li>
            )}
          </ul>
        </div>
    </div>
  )
}

const styles = {
  sidebar: { backgroundColor: "#0d1017", padding: 12, borderRadius: 8, border: '1px solid #1f2730', display: 'grid', flexDirection: 'column', justifyContent: 'space-between', gap: 6 },
  sidehead: { fontsize: '16', fontWeight: 'bold', marginBottom: 10 },
  nav: { display: 'flex', flexDirection: 'column', gap: 5 },
  navbtn: { with: '100%', padding: '10px 20px', borderRadius: 6, border: 'none', background: '#000', color: 'white', cursor: 'pointer', textAlign: 'left', hover: { background: '#1a1a1a' } },
  activestaking: { marginTop: 16, padding: 12, backgroundColor: "#0d1017", borderRadius: 8 },
  stakinghead: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  stackinglist: { listStyle: 'none', padding: '5px', margin: 0, display: 'flex', flexDirection: 'column', gap: 8 },
  stackingItem: { display: 'flex', justifyContent: 'space-between', fontSize: 14 }
}
