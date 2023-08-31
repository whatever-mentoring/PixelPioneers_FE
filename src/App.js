import './App.css';
import { Route } from "react-router-dom";
import Welcome from "./pages/welcome";
import { useState } from 'react';

function App(){

  return (
    <Route path="/welcome">
        <Welcome/>
    </Route>
  )
}

export default App;
