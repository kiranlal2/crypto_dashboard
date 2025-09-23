import React, { createContext, useReducer, useCallback } from "react";

// Create context
export const PortfolioContext = createContext(null);

function portfolioReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + action.payload.qty }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    default:
      return state;
  }
}

export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(portfolioReducer, { items: [] });

  const add = useCallback((coin) => {
    dispatch({
      type: "ADD",
      payload: {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.current_price,
        qty: 1,
      },
    });
  }, []);

  const remove = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  return (
    <PortfolioContext.Provider value={{ state, add, remove }}>
      {children}
    </PortfolioContext.Provider>
  );
}
