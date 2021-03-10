import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App';
import '../../App.css';
import M from 'materialize-css';
import {useHistory,Link} from 'react-router-dom';

const Home = () => {
    const hsitory = useHistory();
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([]);
    const [seat,setSeat] = useState(0);
    const [total,setTotal] = useState(0);
    //  console.log(state);
    useEffect(()=>{
        fetch("/movie/allmovies",{
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
             setData(result.movies);
        }).catch((err)=>{
            console.log(err);
        })
    },[])


    const deleteMovie = (movieid) =>{
        fetch(`/movie/${movieid}`,{
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
        <div className="home row" style={ { marginTop:"100px", marginLeft: "100px" }}>
            <div className="heading"><h1 className="heading-text">Movies</h1></div>
            {
                data.map(item=>{
                    return (
                        
                        <div className="card homecard col s6" style={ { marginRight:"50px" }} key={item._id} >
                        {
                        state.role == 1?<i className="material-icons small right"
                        onClick={()=>deleteMovie(item._id)}
                        >delete</i>:""
                        }
                       <div className="card-img"  >
                            <img style={{margin: "5px auto", maxWidth:"350px",height: "400px"}} src={item.photo} alt="" />
                       </div>
                       <div className="card-content">
                    <span className="card-title  grey-text text-darken-4">{item.generes} <h5>{item.title}</h5></span>
                    
                    
                    <div className="right">
                        </div>
                        <h6>Directedby:-{item.director}</h6>
                        <p>{item.discription}</p>
                        <p>{item.cast}</p>
                        <p>Duration:-{item.time} mins</p>
                        <p>Ticket:-{item.price} ₹</p>
                        
                        <button className="btn"  style={{marginTop:"10px"}}
                        onClick={()=>localStorage.setItem("movie",JSON.stringify(item._id))}
                        ><Link to="/payment" style={{color:"white"}}>Book</Link></button>
                        </div>
                   </div>
                    )
                })
            }
           
                   
        </div>
    
    )
}

export default Home;