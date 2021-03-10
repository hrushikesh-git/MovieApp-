import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App';
// import '../../Style'
import '../../App.css';
import M from 'materialize-css'

const Payment = (props) => {
    const {state,dispatch} = useContext(UserContext);
    const [seat,setSeat] = useState(0);
    const [total,setTotal] = useState(0);
    const movieid = JSON.parse(localStorage.getItem("movie"))
    // console.log(typeof(movieid));
    const [data,setData] = useState([])
    // console.log(total)

    useEffect(()=>{
        fetch(`/movie/${movieid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("user")
            }
        }).then(res=>res.json())
        .then(movie=>{
            // console.log(movie.movie)
            setData(movie.movie)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const bookeMovie = (movieid) => {
        console.log(total)
         fetch(`/bookmovie/${movieid}`,{
             method:'post',
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 seat,
                 total
             })
         }).then(res=>res.json())
         .then(result=>{
             if(result.error){
                  M.toast({html:result.error,classes:"#c62828 red darken-3"})
             }else{
                 // console.log(result)
              M.toast({html:"Booked Successfully",classes:"#43a047 green darken-1"})
             //  window.history.push("/mybooking")
             }
             
         }).catch(err=>{
             console.log(err);
         })
     }

    return(
        <div className="home row" 
        style={ { 
            marginTop:"100px",
            marginRight: "10px",
           
            
          }}>
            <div className="card paycard col s6 m6 l6">
            <div className="card-image">
            <img style={{margin: "5px auto", maxWidth:"350px",height: "400px"}} src={data.photo} alt="" />
            <div className="card-content">
                <h1>{data.title}</h1>
            <h5>{data.description}</h5>
            </div>
            </div>
            </div> 
            <div className="container right col s6 m6 l6" style={{marginRight: "20px", 
            border:"2px solid gray",
            borderRadius:"10px",
             padding:"10px"}}>
                <h1>Payment Details</h1>
                <div >
                        <p>Seats</p>
                        <input style={{maxWidth: "100px"}} type="number"
                        placeholder="seat"
                        onChange={(e)=>{
                            setSeat(e.target.value);
                            setTotal(data.price*e.target.value);
                        }}
                        />
                        <h3 className="right" style={{color:"gray"}}>Total:{total}</h3>
                        </div>
                <input
                type="text"
                placeholder="Full Name"
                />
                <input
                type="text"
                placeholder="card number"
                />                
                <input
                type="text"
                placeholder="cvv number"
                />
                 <input type="text" placeholder="dd/mm/year" className="datepicker"></input>
                 <button className="btn" style={{marginTop:"10px"}}
                 onClick={()=>{  
                    bookeMovie(data._id);
                }}
                 >Payment</button>
            </div>
        </div>
    )
}

export default Payment;