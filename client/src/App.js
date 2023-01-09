import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";


import Home from "./pages/Home";
import Datatable from "./pages/Datatable";
import SingleItem from "./pages/SingleItem"
import Create from "./pages/Create";
import Update from "./pages/Update";
import Profile from "./pages/Profile";

import { useAuth0 } from "@auth0/auth0-react";

const App= ()=> {
   const { isAuthenticated} = useAuth0();
  
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
              <Route exact path="/fakultet/:id"
                element={
                  <SingleItem/>
                }
              />
              <Route exact path="/update/:id"
                element={
                  <Update/>
                }
              />
              <Route exact path="/create"
                element={
                  <Create/>
                }
              />
              <Route exact path="/profile"
                element={
                  isAuthenticated ? <Profile/> : <Navigate to="/"/>
                }
              />
          </Routes>
        </div>
      );

  }

export default App;
