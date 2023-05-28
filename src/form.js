import React, { useState } from 'react';
import { deployContract } from './utils';
import algosdk from 'algosdk';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
const Form = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  //ask user to insert his/her mnemonic before deploy the contract 
  const handleClick = async (event) => {
    const enteredInput = await window.prompt('Please enter wallet mnemonic');
    return enteredInput;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const mnemonic = await handleClick(e);
    const userAcc = await algosdk.mnemonicToSecretKey(mnemonic);
    // Do something with the submitted text at the blockchain
    const transid = await deployContract(userAcc,text);
    //view the created app id in the console
    console.log(transid);
    //redirect to the display page
    navigate(`/display/${transid}`);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
