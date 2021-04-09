import { useState, useEffect } from "react";
import { getById } from "./services/getService";
import "./App.css";

function App() {
  
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    async function getJobs() {
      var result = await getById(112);
      setJobs(result);
    }
    getJobs();
  }, []);

  return (
    <div className="App">
      <header>
        <strong>Jobify</strong>
        <pre>Find your dream job.</pre>
      </header>
      <div>
        {JSON.stringify(jobs)}
      </div>
    </div>
  );
}

export default App;
