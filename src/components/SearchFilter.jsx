import React from 'react';
import styles from '../styles';


export default function SearchFilter({ filter, setFilter, page, setPage }) {
    return (
        <div style={styles.controls}>
            <select style={{padding: '10px', borderRadius: "10px", border: '1px solid #263040', background: '#091018', color: '#cfe3ff' }} value={filter} onChange={e=>setFilter(e.target.value)}>
                <option value="ALL">All</option>
                <option value="GAINERS">Top Gainers</option>
                <option value="LOSERS">Top Losers</option>
            </select>
            <div style={{ marginLeft: 12 }}>
                <button onClick={() => setPage(p => Math.max(1, p-1))} style={styles.pageBtn}>Prev</button>
                <span style={{ margin: '0 8px' }}>Page {page}</span>
                <button onClick={() => setPage(p => p+1)} style={styles.pageBtn}>Next</button>
            </div>
        </div>
    );
}