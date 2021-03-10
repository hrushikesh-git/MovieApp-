import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App'
import M from 'materialize-css'

const User = () => {
  
  const {state,dispatch} = useContext(UserContext);
  const [data,setData] = useState([]);
  useEffect(()=>{
    fetch('/user/alluser',{
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      // console.log(result.user)
      setData(result.user)
    }).catch(err=>{
      console.log(err);
    })

  },[])

  const DeleteUser = (userid) =>{
    fetch(`/user/${userid}`,{
      method:'delete',
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(result=>{
        if(result.error){
            console.log(result.error)
            M.toast({html:result.error,classes:"#c62828 red darken-3"})
        }else{
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData);
            M.toast({html:"User Removed",classes:"#43a047 green darken-1"})
        }
    })
  }

    return(
      <div className="container">
        <div className="heading"><h1 className="heading-text">All User</h1></div>
        <table className="highlight">
         <thead>
          <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Delete User</th>
          </tr>
        </thead>
        {
          data.map(item=>{
            return(
              <tbody key={item._id}>
              <tr>
                <td>{item.name}</td>
                <td>{item.role == 1?"Admin":"User"}</td>
                <td>{item.email}</td>
                <td>{item.role == 0?<i className="material-icons small " onClick={()=>DeleteUser(item._id)}>delete</i>:""}</td>
              </tr>
            </tbody>
            )
          })
        }
        
    
      </table>
      </div>
    )
}

export default User;