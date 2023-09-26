import { Route, Routes, Switch, BrowserRouter, Navigate } from "react-router-dom";
import Inflow1 from "./pages/Inflow1";
import Inflow2 from "./pages/Inflow2";
import Inflow3 from "./pages/Inflow3";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/Inflow1";
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Wrapper from './pages/recircleComponets/Wrapper';

import OnBoard from "./login/OnBoard";
import Oauth from "./login/Oauth";
import Folder from "./pages/folder";
import Upload1 from "./pages/upload1";
import Loginpage from "./login/loginpage";
import Password from "./login/password";
import Nickname from "./login/nickname";
import Loginpage2 from "./login/loginpage2";
import FolderModal from "./pages/folderModal";
import FolderModal2 from "./pages/folderModal2";
import FolderModal3 from "./pages/folderModal3";
import FolderModal4 from "./pages/folderModal4";
import MyPage from "./mypages/myPage";
import ChangeProfile from "./mypages/changeprofile";
import ChangePW from "./mypages/changepassword";
import Inquiry from "./mypages/inquiry";
import Secossion from "./mypages/secession";

import Terms from './mypages/Terms';
import Privacy from './mypages/Privacy';

import AllPoses from './pages/Allposes';

function App(props) {
  return (
    <div style={{backgroundColor:'white'}}>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          
        <Routes>
          <Route path="/inflow1" element={<Inflow1 />}></Route>
          <Route path="/inflow2" element={<Inflow2 />}></Route>
          <Route path="/inflow3" element={<Inflow3 />}></Route>
          <Route path="/AllPoses" element={<AllPoses api={props.api} />}></Route>
          <Route path="/mainPage" element={<MainPage api={props.api}/>}></Route>

          {/* 소영 코드 */}

          <Route path="/onBoard" element={<OnBoard/>}>
          </Route>
          <Route path="/Oauth" element={<Oauth/>}></Route>
          <Route path="/folder" element={<Folder api={props.api}/>}>
          </Route>
          <Route path="/upload1" element={<Upload1/>}>
          </Route>
          <Route path="/loginpage" element={<Loginpage/>}>
          </Route>
          <Route path="/password" element={<Password/>}>
          </Route>
          <Route path="/nickname" element={<Nickname/>}>
          </Route>
          <Route path="/loginpage2" element={<Loginpage2/>}>
          </Route>
          <Route path="/folderModal" element={<FolderModal/>}/>
          <Route path="/folderModal2" element={<FolderModal2/>}/>
          <Route path="/folderModal3" element={<FolderModal3/>}/>
          <Route path="/folderModal4" element={<FolderModal4/>}/>

          <Route path="/mypage" element={<MyPage/>}/> 
          <Route path="/changeprofile" element={<ChangeProfile/>}/>
          <Route path="/changepassword" element={<ChangePW/>}/>
          <Route path="/inquiry" element={<Inquiry/>}/>
          <Route path="/secession" element={<Secossion/>}/>

          <Route path="/terms" element={<Terms/>}></Route>
          <Route path="/privacy" element={<Privacy/>}></Route>

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