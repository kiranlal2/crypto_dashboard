import React from 'react';
import { usePortfolio } from "../hooks/usePortfolio";



const CoinCard = React.memo(({ coin }) => {
const { add } = usePortfolio();


return (
    <div style={styles.card}>
        <div style={styles.cardDetails}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={coin.image} alt={coin.symbol} width={36} height={36} />
                <div>
                    <strong>{coin.name}</strong>
                    <div style={{ fontSize: 12, color: '#999' }}>
                        {coin.market_cap}
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>${coin.current_price.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>{coin.price_change_percentage_24h?.toFixed(2)}%</div>
            </div>
        </div>
        <button onClick={() => add(coin)} style={styles.btn}>Add to Portfolio</button>
    </div>
    );
});


export default CoinCard;

const styles = {
    card: { display: 'flex', flexDirection: 'column',  backgroundColor: "#0d1017", padding: 12, borderRadius: 8, border: '1px solid #1f2730', justifyContent: 'space-between', gap: 6 },
    cardDetails: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' },
    btn: { padding: '6px 10px', borderRadius: 6, border: 'none', background: '#000', color: 'white', cursor: 'pointer' }
}