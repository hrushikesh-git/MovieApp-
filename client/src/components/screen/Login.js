import React,{useState,useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import '../../App.css'
import {UserContext} from '../../App';
import M from 'materialize-css';
import '../../App.css'

const Login = () =>{
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [password,setPassword] = useState("");
    const[email, setEmail] = useState("");
    const [show,setShow] =useState(false);
    const [type,setType] = useState('password')
    const [symbol,setSymbol] = useState('visibility_off')

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#c62828 red darken-3"})
            return;
        }
        fetch("/auth/signin",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,password
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data);
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }else{
                // console.log(data.user);
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signedin Success",classes:"#43a047 green darken-1"})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const toggleShow = () => {
        setShow(!show)
        if(show){
            setSymbol('visibility')
            setType('text')
        }else{
            setSymbol('visibility_off')
            setType('password')
        }
    }

    return(
        <div className="mycard" >
         <div className="card auth-card input-field">
           <h2>MovieApp</h2>
            <input type="text" 
            placeholder="email"
            value={email}
           onChange={(e)=>setEmail(e.target.value)} 
            />
            <div className="row">
            <div className="col s10">
            <input type={type}
            placeholder="password"
            value={password}
           onChange={(e)=>setPassword(e.target.value)} 
            />
            </div>
            <div className="col s2">
            <i
            onClick={()=>toggleShow()}
            class="material-icons show">{symbol}</i>
            </div>
            
            </div>
           <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
           onClick={()=>PostData()}
           >Login </button>
           <h5>
             <Link to="/signup">Don't have an account?</Link>
         </h5>
        </div>
        </div>
    )
}

export default Login;