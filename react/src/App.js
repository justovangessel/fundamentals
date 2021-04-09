import { useState, useEffect } from "react";
import { getJobsByCategory } from "./services/jobService";
import "./App.css";

function App() {
  
  const [jobs, setJobs] = useState([]);
  // Assignment call the getJobsByCategory from services/jobService
  // And show the results on the screen.
  
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
