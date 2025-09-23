import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

export function usePortfolio() {
  const createCntx = useContext(PortfolioContext);
  if (!createCntx) {
    throw new Error("usePortfolio must be used inside <PortfolioProvider>");
  }
  return createCntx;
}
