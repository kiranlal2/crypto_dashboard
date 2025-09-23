import React from 'react';
import { usePortfolio } from "../hooks/usePortfolio";
import styles from '../styles';
import image from '../assets/img/24.jpg';


export default function Portfolio({ portfolioTotal }) {
    const { state, remove } = usePortfolio();

    return (
        <div>
            <h3>Portfolio</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', marginBottom: '10px', backgroundColor: '#0b1220', borderRadius: 8, border: '1px solid #1f2730' }}>
                <img src={image} alt='Profile Image' width={50} height={50} style={{borderRadius: 50}} />
                <div style={{ lineHeight: 1 }}>
                    <strong>Kiran lal J</strong>
                    <p style={{padding: 0, margin: '2px 0 0 0'}}>Personal</p>
                </div>
            </div>
            <div>Total: ${portfolioTotal.toLocaleString()}</div>
            <div style={{ padding: '10px', marginTop: '10px', backgroundColor: '#0b1220', borderRadius: 8, border: '1px solid #1f2730', minHeight: '200px' }}>
            {state.items.length === 0 && <div>No holdings</div>}
            {state.items.map(item => (
                <div key={item.id} style={styles.portItem}>
                    <div>
                        <strong>{item.name}</strong> <div style={{ fontSize: 12 }}>{item.symbol.toUpperCase()}</div>
                    </div>
                        <div style={{ textAlign: 'right' }}>
                        <div>${(item.price * item.qty).toFixed(2)}</div>
                        <div style={{ fontSize: 12 }}>{item.qty} × ${item.price}</div>
                        <button onClick={() => remove(item.id)} style={styles.smallBtn}>Remove</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}