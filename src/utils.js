import { ALGOkey, ALGOD_TESTNET_URL,ALGOD_PORT, indexerClient,systemAccount } from "./constant";
import algosdk from "algosdk";
/**
Deploy the contract on Algorand network.

@param {Object} sender - Sender's account containing the address and secret key.

@param {Array} arr - Array of contract arguments.

@return {Promise<number>} The transaction ID of the deployed contract.
*/
export const deployContract = async (sender, text) => {

    //making a new instance for the Algosdk Algodv2 class, which is used to interact with the Algorand node API
      const algodClient = new algosdk.Algodv2(ALGOkey , ALGOD_TESTNET_URL, ALGOD_PORT);
      
      //param from the transaction is created here to ensure that transaction can be processed quickly by determining the first and last round
      //the first and last round must be determined appropriately without too narrow or too wide to prevent rejection or slow processing
      const params = await algodClient.getTransactionParams().do();
      console.log(params);
      //to encode it into Uint8Array
      const appArgs = [new TextEncoder().encode(JSON.stringify(text))];
      let note = new TextEncoder().encode(JSON.stringify("This is a note from the user"));
  
      //makeApplicationCreateTxnFromObject is a function from ALgorand to develop a new smart contract
      const txn = algosdk.makeApplicationCreateTxnFromObject({
          suggestedParams: {
              ...params,
          },
          from: sender.addr,
          genesis_id: 'testnet-v2.0',
          //globalStateSchema:globalStateSchema,
          approvalProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
          clearProgram: new Uint8Array(Buffer.from("AiABASI=", "base64")),
          onComplete: 0,
          appArgs: appArgs,
          note: note, // Add the note with course information
      });
      console.log(txn);
      // Sign the transaction using secret key from sender
      const signedTxn = txn.signTxn(sender.sk);
  
      //send the signed transaction to the blockchain network for processing and inclusion in a block
      const tx = await algodClient.sendRawTransaction(signedTxn).do();
      console.log('Transaction ID:', tx.txId);
  
      //the block will still in pending due to no confirm it yet.
      console.log(algodClient.pendingTransactionInformation(tx.txId).do());
  
      const roundsTowait = 4;
      //wait the transaction be confirmed by the network.
      const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, roundsTowait);
  
      console.log(algodClient.getTransactionProof(tx.txId))
      const appId = confirmedTxn['application-index'];
      console.log('App ID:', appId);
  
      return tx.txId;
  }
  
  