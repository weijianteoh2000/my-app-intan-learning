import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./form";
import Display from "./display";

function MyRouter() {
    return (
      <>
        <Routes>
            <Route exact path="/" element={<Form />} />
            <Route path="display/:transID" exact element={<Display />} />
        </Routes>
      </>
    )
  }
  
  export default MyRouter;