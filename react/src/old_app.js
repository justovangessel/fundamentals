import { useState, useEffect } from "react";
import { getAll } from "./services/getService";
import "./App.css";


function Nieuw() {
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      var result = await getAll();
      setData(result);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Palmboom</h1>
        <pre>Vind je favoriete vakantieplek.</pre>
      </header>
      <div style={{ margin: "0 auto", width: "50%", backgroundcolor: "lightblue" }}>
        <pre style={{ textAlign: "initial" }}>
          {JSON.stringify(data, null, "\t")}
        </pre>
      </div>
    </div>
  );
}

export default Nieuw;
