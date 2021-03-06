import React from "react";
import "./App.css";
import Routes from "../routeComponent/Routes";
import Home from "../homeComponents/home";
import Navigation from "../Navigation/navigation";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <Routes />
      </div>
    </div>
  );
}

export default App;
