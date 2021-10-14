import { useState } from 'react'
import { UserDetailsProvider } from './contexts/UserDetailsContext';
import AuthScreen from "./screens/auth/AuthScreen";
import './index.css'
import HomeScreen from './screens/home/HomeScreen';


function App() {

  const [userData, setUserData] = useState({data:{},isLoggedIn:false})

  const toggleLogin = (data) => {
    setUserData({...userData,isLoggedIn:!userData.isLoggedIn,data:data})
  }


  return (
    <div className='app_wrapper'>
    
    <UserDetailsProvider value={{userData,toggleLogin}}>

        <div className='app'>


        {
          userData.isLoggedIn ?

          <HomeScreen /> :

          <AuthScreen />  
        }

        </div>

    </UserDetailsProvider>


    </div>
  );
}

export default App;
