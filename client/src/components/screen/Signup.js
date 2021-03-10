import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import '../../App.css'
import M from 'materialize-css';

const Signup = () =>{

    const history = useHistory();
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#c62828 red darken-3"})
        }

        fetch("/auth/signup",{
            method: 'post',
            headers: { 
                "Content-Type": "application/json"
             },
             body:JSON.stringify({
                 name,
                 email,
                 password
             })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
               M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push("/login")
            }
        }).catch((err) =>{
            console.log(err)
       })
    }

    return(
        <div className="mycard" >
         <div className="card auth-card input-field">
           <h2>MovieApp</h2>
           <input type="text" 
            placeholder="name"
            valuse={name}
            onChange={(e)=>setName(e.target.value)} 
            />
            
            <input type="text" 
            placeholder="email"
            valuse={email}
            onChange={(e)=>setEmail(e.target.value)} 
            />

            <input type="password"
            placeholder="password" 
            valuse={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
           <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
           onClick={()=>PostData()}
           >Signup </button>
           <h5>
             <Link to="/login">Already have an account?</Link>
         </h5>
        </div>
        </div>
    )
}

export default Signup;