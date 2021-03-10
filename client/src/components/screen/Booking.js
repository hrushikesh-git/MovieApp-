import React,{useEffect,useContext, useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../../App';
import "../../App.css";
import M from 'materialize-css'

const Booking = () => {
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([]);

    useEffect(()=>{
        fetch("/bookmovie/allbookedmovies",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result.allbookedmovie)
            setData(result.allbookedmovie)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const deleteMovie = (movieid) =>{
        fetch(`/bookmovie/${movieid}`,{
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
                M.toast({html:"Movie Removed",classes:"#43a047 green darken-1"})
            }
        })

    }

    return(
        <div className="booking  row" style={ { marginTop:"100px", marginLeft: "100px" }}>
            <div className="heading"><h1 className="heading-text">All Booking</h1></div>
            {
                data.map(item=>{
                return(
                <div className="card homecard col s6" style={ { marginRight:"50px" }} key={item._id}>
                 {
                     state.role == 1?<i className="material-icons small right"
                     onClick={()=>deleteMovie(item._id)}
                     >delete</i>:""
                 }
                <div className="card-img">
                    <img style={{marginTop: "5px", maxWidth:"350px",height: "400px"}} src={item.movie.photo} alt=""></img>
                </div>
                <div className="card-content">
                <h5>{item.movie.title}</h5>
                <h6>Director:-{item.movie.director}</h6>
                <p><strong>User Details</strong></p>
                <p>Name:-{item.bookedby.name} || Email:-{item.bookedby.email} </p>
                <p><strong>seat</strong>:- {item.seat} </p>
                <p><strong>total</strong>:- {item.total} ₹</p>
                </div>
            </div>
            )    
            })
            }
            
        </div>
    )
}

export default Booking;