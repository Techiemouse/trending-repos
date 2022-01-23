import './App.css';
import { useState } from 'react';
import axios from 'axios';
import RepoComponent from './component/RepoComponent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function App() {
  const [repos, setRepos] = useState(null);
  
  const [error, setError] = useState(null)

  const getDate = (daysPast) => {
    var d = new Date();
    d.setDate(d.getDate() - daysPast);
    return d.toISOString().split('T')[0];
  }

 const apiURL = "https://api.github.com/search/repositories?q=created:%3E"+getDate(7)+"&sort=stars&order=desc";

 const fetchAllData = async () => {
  await axios
    .get(apiURL)
    .then(response => {
      setRepos(response.data.items);
    })
    .catch(error => {
      setError(error);
    })
  }

  const fetchFavourites = () => {
    const favouritesRepos = { ...localStorage };

    var myData = Object.keys(favouritesRepos).map(key => {
     try {
      return JSON.parse(favouritesRepos[key])
     } catch(error){
      return {}
     }
  })
    setRepos(myData);
  }

  const clearFavourites = () => {
    localStorage.clear();
  }

  const saveFavourite = (favourite) => {
    if (!localStorage.getItem(favourite.id)) {
      localStorage.setItem(favourite.id, JSON.stringify(favourite));
    } else {
      localStorage.removeItem(favourite.id);
    }
  }

  return (
    <div className="App">
        <div>
          <Button variant="outlined" onClick={fetchAllData}>
            Get top repos
          </Button>
          <Button variant="outlined" onClick={fetchFavourites}>
            Get favourites
          </Button>
          <Button variant="outlined" onClick={clearFavourites}>
            Clear all favourites
          </Button>
        </div>
        <Grid
          container
          spacing={2}>
        {repos &&
          repos.map((repo, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <RepoComponent saveFavourite={saveFavourite} repo={repo} key={index} ></RepoComponent>
              </Grid>
            );
          })}
          {error && <p data-testid='error' >Issue getting your data, try again!</p>}
        </Grid>
    </div>
  );
}

export default App;
