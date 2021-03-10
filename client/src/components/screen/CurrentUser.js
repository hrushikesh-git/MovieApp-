import React,{useEffect,useContext} from 'react';
import {UserContext} from '../../App'

const CurrentUser = () => {
    const {state,dispatch} = useContext(UserContext);
//    console.log(state)
    return(
        <div>
            <h1>Name:- {state.name}</h1>
            <h2>Email:- {state.email}</h2>
            <h3>Role:- {state.role == 0?"User":"Admin"}</h3>
        </div>
    )
}

export default CurrentUser;

