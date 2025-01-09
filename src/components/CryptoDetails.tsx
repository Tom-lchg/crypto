import React, { FC, useEffect, useState } from "react";
import CryptoChart from "./CryptoChart";
import { Link, Navigate, useParams } from "react-router-dom";
import { getCrypto } from "../lib/coin-lore";

const CryptoDetails: FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [crypto, setCrypto] = useState<Crypto | null>(null);

  useEffect(() => {
    async function fetchCrypto() {
      if (id) {
        const cryptoData = await getCrypto(Number(id));
        setCrypto(cryptoData);
      }
    }
    fetchCrypto();
  }, [id]);
  if (!crypto) {
    return <div>Chargement des données...</div>;
  }
  console.log("dre:" + crypto.name);
  console.log(crypto.symbol);

  const labels = [
    "1:00 PM",
    "4:00 PM",
    "7:00 PM",
    "10:00 PM",
    "1:00 AM",
    "4:00 AM",
    "7:00 AM",
    "10:00 AM",
  ];
  const data = [0, (crypto.price_usd || 0) * 10];

  return (
    <div>
      <h1>Détails de la crypto {crypto.name}</h1>
      <Link to="/blog">
        <button>Blog about {crypto.name}</button>
      </Link>
      <p>Prix : ${crypto.price_usd}</p>
      <CryptoChart labels={labels} data={data} />

      <div>
        <ul>
            <li>last 1h : {crypto.percent_change_1h}</li>
            <li>last 24h : {crypto.percent_change_24h}</li>
            <li>last 7d : {crypto.percent_change_7d}</li>
        </ul>
        <ul>
            <li>Volume24 : {crypto.volume24}</li>
            <li>Volume24a : {crypto.volume24a}</li>
        </ul>
      </div>

    </div>
  );
};

export default CryptoDetails;
