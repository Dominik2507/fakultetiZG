import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";


import Home from "./pages/Home";
import Datatable from "./pages/Datatable";



const App= ()=> {
  
      return (
        <div className="App">
          <Routes>
              <Route exact path="/"
                element={
                  <Home/>
                }
              />
              <Route exact path="/datatable"
                element={
                  <Datatable/>
                }
              />
          </Routes>
        </div>
      );

  }

export default App;
