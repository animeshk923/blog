import React from 'react';
import "./App.scss";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="mainContainer">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
