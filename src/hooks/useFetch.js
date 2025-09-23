import { useState, useEffect, useRef } from 'react';


export default function useFetch(url, deps = [], { cacheKey = null, refreshInterval = 10000 } = {}) {
    const cacheRef = useRef(new Map());
    const abortRef = useRef(null);
    const [state, setState] = useState({ loading: true, error: null, data: null });


useEffect(() => {
    let mounted = true;
    const key = cacheKey || url;

    async function fetchOnce() {
    if (cacheRef.current.has(key)) {
        const { ts, value } = cacheRef.current.get(key);
    if (Date.now() - ts < refreshInterval) {
    if (mounted) setState({ loading: false, error: null, data: value });
    return;
 }
}
    if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;
    try {
        const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error('Network error');
        const json = await res.json();
        cacheRef.current.set(key, { ts: Date.now(), value: json });
    if (mounted) setState({ loading: false, error: null, data: json });
    } 
    catch (err) {
    if (err.name !== 'AbortError' && mounted) setState({ loading: false, error: err.message, data: null });
    }
}


fetchOnce();
    const interval = setInterval(fetchOnce, refreshInterval);
    return () => { mounted = false; clearInterval(interval); abortRef.current?.abort(); };
    }, deps);


    return state;
}