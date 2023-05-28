import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { indexerClient } from './constant';


const Display = () => {
    const [text, setText] = useState(null);
    const transId = useParams();
    console.log(transId.transID);

    useEffect(() => {
        async function fetchData() {
            await fetchformDataFromBlockchain();
        }
        fetchData();
    }, []);
    async function fetchformDataFromBlockchain() {
        //  using indexerClient to look up the transaction details by validating with the provided transaction id
        const info = await indexerClient.lookupTransactionByID(transId.transID);
        //  obtain all data from algorand blockchain and set them to a constant variable named data 
        await info.do().then(async (transInfo) => {
            console.log(transInfo.transaction["application-transaction"]["application-args"][0]);
            const dtext = window.atob(transInfo.transaction["application-transaction"]["application-args"][0]);
            const text = Object.values(JSON.parse(dtext));
            setText(text);
        });
        }


  return (
    <div>
      <h1>My Text in blockchain</h1>
    <h2>{text}</h2>
    <a href="/">Back to Home</a>
    <h2></h2>
    </div>
  );
};

export default Display;