import axios from "axios";
import { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import SearchUser from "./SearchUser";

const API_KEY = process.env.REACT_APP_GITHUB_API_KEY;

function App() {

  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);
  const [fetchError, setFetchError] = useState('');
  //const [isLoading, setIsLoading] = useState(false);
  const [transitionState, setTransitionState] = useState(false)

  useEffect(() => {
    
    if (!userName.trim()) return
    
    const fetchUserData = async() => {

      try {

        const response = await axios.get(
          `https://api.github.com/users/${userName}`,
          {headers: {Authorization: API_KEY}}
        )
         console.log(response.data)
        setUserData(response.data);
        setFetchError(null);

      } catch (err) {

        if (err.response){

          console.log(err);
          console.log(err.response.headers);
          console.log(err.response.status);
          console.log(err.response.data.message);
          setFetchError(err.response.data.message);

        } else if (err.request) {
          console.log(err)
          setFetchError(err.message);
        } else {
          console.log(err.message)
          setFetchError(err.message);
        }

      } finally {
        //setIsLoading(false);       
      }

    }

    //setIsLoading(true);
    fetchUserData();

  }, [userName])

  return (

    <div className="App">

      <header className="header">
        <h1 className="header__h1">Github Profile Finder</h1>
      </header>

      <SearchUser

        search={search}
        setSearch={setSearch}
        userName={userName}
        setUserName={setUserName}
        transitionState={transitionState}
        setTransitionState={setTransitionState}

      ></SearchUser>

      <UserProfile

        userData={userData}
        fetchError={fetchError}
        //isLoading={isLoading}
        transitionState={transitionState}

      ></UserProfile>
      
    </div>

  );

}

export default App;
