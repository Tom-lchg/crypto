import React from "react";
import { Link, useParams } from "react-router";
import CryptoChart from "./CryptoChart";

function CryptoDetails: React.FC = ({ }) => {


    const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const data = [100, 200, 300, 400, 500];
    const crypto = 0;

    return( 
        <>
            <div>
                <h1>Details de la {crypto}</h1>
                <CryptoChart labels={labels} data={data} />
            </div>
        </>
    ); 
}

export default CryptoDetails;