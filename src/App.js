import { Route, Routes, Switch, BrowserRouter, Navigate } from "react-router-dom";
import Inflow1 from "./pages/Inflow1";
import Inflow2 from "./pages/Inflow2"
import Inflow3 from "./pages/Inflow3";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/Inflow1";
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Wrapper from './pages/recircleComponets/Wrapper'

import Page4 from "./login/page4";
import Folder from "./pages/folder";
import Upload1 from "./pages/upload1";
import Inflow2M from "./pages/Inflow2";
import Loginpage from "./login/loginpage";
import Password from "./login/password";
import Nickname from "./login/nickname";
import Loginpage2 from "./login/loginpage2";

import AllPoses from './pages/Allposes';

function App(props) {
  return (
    <div style={{backgroundColor:'#1C54A9'}}>
    <BrowserRouter basename="/PixelPioneers_FE">
      <AnimatePresence mode="wait">
      <Routes>
        <Route path="/inflow1" element={<Inflow1 />}></Route>
        <Route path="/inflow2" element={<Inflow2 />}></Route>
        <Route path="/inflow3" element={<Inflow3 />}></Route>
        <Route path="/AllPoses" element={<AllPoses api={props.api} />}></Route>
        <Route path="/mainPage" element={<MainPage api={props.api}/>}></Route>

        {/* 소영 코드 */}

        <Route path="/onBoard" element={<Page4/>}>
        </Route>
        
        
        {/* <Route path="/photoalbum" element={<Photoalbum/>}></Route> */}
        <Route path="/folder" element={<Folder/>}>
        </Route>
        <Route path="/upload1" element={<Upload1/>}>
        </Route>
        <Route path="/Inflow2" element={<Inflow2M/>}>
        </Route>
        <Route path="/loginpage" element={<Loginpage/>}>
        </Route>
        <Route path="/password" element={<Password/>}>
        </Route>
        <Route path="/nickname" element={<Nickname/>}>
        </Route>
        <Route path="/loginpage2" element={<Loginpage2/>}>
        </Route>

        <Route path="*" element={<Navigate to="/inflow1" replace />}/>
      {/* <Route path="*">
        <NotFound />
      </Route> */}
      </Routes>
      </AnimatePresence>
    </BrowserRouter>
    </div>
  );
}

export default App;
