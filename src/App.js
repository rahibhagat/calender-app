import React from "react";

import Calendar from "./components/Calendar";

//import "./App.css";
import "./Calender.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;
//
