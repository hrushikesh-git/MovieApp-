import React, { useEffect,createContext,useContext,useReducer } from 'react';
import {BrowserRouter,Route,Switch, useHistory} from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/screen/Login';
import Signup from './components/screen/Signup';
import CreateMovie from './components/screen/CreateMovie';
import Home from './components/screen/Home';
import Booking from "./components/screen/Booking";
import Mybooking from './components/screen/Mybooking';
import Footer from './components/Footer';
import User from './components/screen/User';
import Payment from './components/screen/Payment';
import CurrentUser from './components/screen/CurrentUser'
import {reducer,initialState} from './reducer/userReducer';

export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();
  const {staet,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push("/")
    }else{
      history.push("/login")
    }
  },[])

  return(
    <Switch >
      <Route exact path="/"><Home /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/alluser"><User /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/payment"><Payment /></Route>
      <Route path="/createmovie"><CreateMovie /></Route>
      <Route path="/currentuser"><CurrentUser /></Route>
      <Route path="/bookedmovies"><Booking /></Route>
      <Route path="/mybooking"><Mybooking /></Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    
    <Footer />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
