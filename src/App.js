import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Inflow1 from "./pages/Inflow1";
import Inflow2 from "./pages/Inflow2";
import Inflow3 from "./pages/Inflow3";
import Inflow4 from "./pages/page3";
import Inflow5 from "./pages/page4";
import NotFound from "./pages/Inflow1";
import axios from 'axios';



function App() {
  return (
    <BrowserRouter basename="/PixelPioneers_FE">
      <Route path="/inflow1">
        <Inflow1 />
      </Route>
      <Route path="/inflow2">
        <Inflow2 />
      </Route>
      <Route path="/inflow3">
        <Inflow3 />
      </Route>
      <Route path="/inflow4">
        <Inflow4 />
      </Route>
      <Route path="/inflow5">
        <Inflow5 />
      </Route>
      <Route path="/" exact>
        <Redirect to="/inflow1" />
      </Route>
      {/* <Route path="*">
        <NotFound />
      </Route> */}
    </BrowserRouter>
    
  );
}

export default App;
