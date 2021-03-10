import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App'
import '../App.css'

const NavBar = () => {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  const renderList = () => {
    //  console.log(state)
    if(state){
      if(state.role === 1){
        return [
        <li><Link to="/currentuser" style={{color:"black"}}>
          <i className="material-icons medium right" >person_pin</i>
          Admin-{state.name}</Link></li>,
          <li ><Link className="option" to="/createmovie">CreateMovie</Link></li>,
          <li ><Link className="option" to="/bookedmovies">BookedMovies</Link></li>,
          <li><Link className="option" to="/alluser">AllUsers</Link></li>,
          <li>
          <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear();
              dispatch({type:"CLEAR"})
              history.push("/login")
            }}
            >Logout </button>
       </li>
        ]
      }else{
        return [
        <li>
          <Link  to="/currentuser" style={{color:"black"}}>
            <i className="material-icons medium right">person_pin</i>
            <strong>{state.name}</strong>
          </Link>
        </li>,
          <li><Link className="option" to="/mybooking">MyBooking</Link></li>,
          <li>
           <button className="btn #c62828 red darken-3"
             onClick={()=>{
               localStorage.clear();
               dispatch({type:"CLEAR"})
               history.push("/login")
             }}
             >Logout </button>
        </li>
        
        ]
      }
      
    }else{
      return [
        
        <li><Link className="option" to="/login">Login</Link></li>,
          <li><Link className="option" to="signup">SignUp</Link></li>
         
        ]
    }
  }
    return(
        <div className="navbar-fixed">
        <nav style={{backgroundColor:"white"}}>
        <div className="nav-wrapper">
          <Link to={state?"/":"/login"} className="brand-logo left" style={{color:"#f44336"}}>MovieApp</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            
            {renderList()}
            
          </ul>
        </div>
      </nav>
      </div>
    )
}

export default NavBar;