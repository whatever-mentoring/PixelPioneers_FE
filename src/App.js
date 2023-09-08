import { Route, Routes, Switch, BrowserRouter } from "react-router-dom";
import Inflow1 from "./pages/Inflow1";
import Inflow2 from "./pages/Inflow2"
import Inflow3 from "./pages/Inflow3";
import Inflow4 from "./pages/page3";
import Inflow5 from "./pages/page4";
import PhotoAlbum from "./pages/PhotoAlbum"
import NotFound from "./pages/Inflow1";
import axios from 'axios';



function App() {
  return (
    <BrowserRouter basename="/PixelPioneers_FE">
      <Routes>
        <Route path="/inflow1" element={<Inflow1 />}></Route>
        <Route path="/inflow2" element={<Inflow2 />}></Route>
        <Route path="/inflow3" element={<Inflow3 />}></Route>
        <Route path="/inflow4" element={<Inflow4 />}></Route>
        <Route path="/inflow5" element={<Inflow5 />}></Route>
        <Route path="/photoAlbum" element={<PhotoAlbum />}></Route>
  
      {/* <Route path="/" exact>
        <Redirect to="/inflow1" />
      </Route> */}
      {/* <Route path="*">
        <NotFound />
      </Route> */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
