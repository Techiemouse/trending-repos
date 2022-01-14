import './App.css';
import { useState } from 'react';
import axios from 'axios';
import RepoComponent from './component/RepoComponent';

function App() {
  const [repos, setRepos] = useState(null);
  const apiURL = "https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc";

  const fetchData = async () => {
    const response = await axios.get(apiURL);

    setRepos(response.data.items);
  }

  return (
    <div className="App">
        <div>
          <button className="fetch-button" onClick={fetchData}>
            Fetch Data
          </button>
        </div>
        <div className="repos">
        {repos &&
          repos.map((repo, index) => {
            return (
              <RepoComponent repo = {repo} key ={index} ></RepoComponent>
            );
          })}
        </div>
    </div>
  );
}

export default App;
