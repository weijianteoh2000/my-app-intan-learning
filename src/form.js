import React from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const navigate = useNavigate();
  const navigateToDisplay = () => {
    navigate('display');
  }
  return (
    <div>Form page<br></br>
      <button type="submit" onClick={navigateToDisplay}>Submit</button>
      </div>
  );
};

export default Form;
