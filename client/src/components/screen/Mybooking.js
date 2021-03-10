import React,{useContext, useEffect,useState} from  'react';
import {UserContext} from "../../App";
import M from 'materialize-css'

const Mybooking = () =>{

    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([]);

    useEffect(()=>{
        fetch("/bookmovie/mybookedmovies",{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            //  console.log(result);
            setData(result.mymovie)
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const CancelBooking = (movieid) => { 
        fetch(`/bookmovie/delete/${movieid}`,{
            method:'delete',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                console.log(result.error)
                M.toast({html:result.error,classes:"#c62828 red darken-3"})
            }else{
                const newData = data.filter(item=>{
                    return item._id !== result._id
                })
                setData(newData)
                M.toast({html:"Cancled Movie",classes:"#43a047 green darken-1"})
                
            }
        })
    }

    return(
        <div className="home row" style={ { marginTop:"100px", marginLeft: "100px" }}>
            <div className="heading"><h1 className="heading-text">My-Booking</h1></div>
       
        {
            data.map(item=>{
                return (  
                <div className="card homecard col s6" style={ { marginRight:"50px" }} key={item._id}>
                <i className="material-icons small right"
                onClick={()=>CancelBooking(item._id)}
                >delete</i>
                <div className="card-img">
                <img style={{marginTop: "5px", maxWidth:"350px",height: "400px"}} src={item.movie.photo} alt="" />
                </div>
                
                <div className="card-content">
                <h4>{item.movie.title} <span className="right" style={{color:"gray"}}>{item.movie.generes}</span></h4>
                <h6>Directedby:- {item.movie.director}</h6>
                <p><strong>Number of Seats</strong>:{item.seat}</p>
                <p>Duration:- {item.movie.time} mins</p>
                <p>Cost:- {item.total} ₹</p>
                
                </div>
                </div>
                )
            })
        }
        
        </div>
    )
}

export default Mybooking;
