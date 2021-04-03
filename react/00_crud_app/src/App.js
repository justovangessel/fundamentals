import { useState, useEffect } from "react";
import { getJobsByCategory } from "./services/jobService";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);

  // Assignment create a custom hook.
  useEffect(() => {
    async function getJobs() {
      var result = await getJobsByCategory("shoes");
      setJobs(result);
    }
    getJobs();
  }, []);

  return (
    <div className="App">
      <header>
        <strong>Jobify Jobboard.</strong>
      </header>
      <div>
        {/* Assignment: Loop through the jobs and show them here */}
        {JSON.stringify(jobs)}
      </div>
    </div>
  );
}

export default App;
