const styles = {
container: { fontFamily: 'Inter, Roboto, sans-serif', padding: 20, background: '#0f1724', color: '#e6eef8', minHeight: '100vh' },
header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
input: { padding: '8px 12px', borderRadius: 8, border: '1px solid #31363f', background: '#0b1220', color: '#e6eef8' },
main: { display: 'flex', gap: 18 },
left: { flex: 1 },
right: { width: 320, background: '#0b1220', padding: 12, borderRadius: 8, border: '1px solid #1f2730' },
controls: { display: 'flex', justifyContent: 'right', alignItems: 'center', marginBottom: 12 },
btn: { padding: '6px 10px', borderRadius: 6, border: 'none', background: '#5b6cff', color: 'white', cursor: 'pointer' },
pageBtn: { padding: '6px 8px', borderRadius: 6, marginRight: 6, border: '1px solid #263040', background: '#091018', color: '#cfe3ff' },
portItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, borderRadius: 6, background: '#071019', marginBottom: 8 },
smallBtn: { marginTop: 6, padding: '4px 8px', borderRadius: 6, border: 'none', background: '#ff6b6b', color: '#fff' },
footer: { marginTop: 18, opacity: 0.7 }
};
export default styles;