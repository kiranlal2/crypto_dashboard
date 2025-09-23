import React from 'react'

export default function Sidebar() {
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
        <div style={styles.activestaking}>
          <div style={styles.stakinghead}>Active Staking</div>
          <ul style={styles.stackinglist}>
            <li style={styles.stackingItem}>
              <span>Ethereum</span><span style={{color: 'green'}}>$7,699</span>
            </li>
            <li style={styles.stackingItem}>
              <span>Avalanche</span><span style={{color: 'red'}}>$1,340</span>
            </li>
            <li style={styles.stackingItem}>
              <span>Polygon</span><span style={{color: 'green'}}>$540</span>
            </li>
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
