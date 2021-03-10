import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const CreateMovie = () =>{
    const history = useHistory();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [director,setDirector] = useState("");
    const [price,setPrice] = useState(0);
    const [time,setTime] = useState(0);
    const[generes,setGeneres] = useState("");
    const[cast,setCast] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("");
    

    useEffect(()=>{
        if(url){
            fetch("/movie/createmovie",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    description,
                    director,
                    time,
                    cast,
                    generes,
                    price,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"#c62828 red darken-3"})
                }else{
                    M.toast({html:"Movie Added",classes:"#43a047 green darken-1"})
                    // history("/")
                }
            })
        }
    },[url])

    const postDetails = () =>{
        const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","movie-app")
        data.append("cloud_name","dmuglc7xi")
        fetch("https://api.cloudinary.com/v1_1/dmuglc7xi/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch((err)=>{
            console.log(err)
        })  
    }

    

    return(
        <div>
        <div className="heading"><h1 className="heading-text">Add New Movie</h1></div>
        <div className="card input-field" 
        style={{margin:"30px auto",
        maxWidth: "500px",
        padding:"20px",
        textAlign:"center"
        }}
        >
        <input type="text" 
        placeholder="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <input type="text"
         placeholder="description"
         value={description}
        onChange={(e)=>setDescription(e.target.value)}
         />

        <input type="text"
         placeholder="cast"
         value={cast}
        onChange={(e)=>setCast(e.target.value)}
         />

        <input 
        type="text"
        list="generes"
        placeholder="Generes"
        value={generes}
        onChange={(e)=>setGeneres(e.target.value)}
        />
            <datalist
            id="generes"
            >
            <option value="" disabled selected>Choose your option</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Scifi">SciFi</option>
            <option value="Horror">Horror</option>
            <option value="Comedy">Comedy</option>
            </datalist>
        

        <input type="text"
         placeholder="Director Name"
         value={director}
        onChange={(e)=>setDirector(e.target.value)}
         />

        

        <div>
        <label className="left">Duration</label>
        <input  type="number"
         value={time}
         onChange={(e)=>setTime(e.target.value)}
         />
        </div>
        <div>
        <label  className="left">Price</label>
        <input type="number" 
         value={price}
         onChange={(e)=>setPrice(e.target.value)}
         />
        </div>

        <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
            <span>Upload Image</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
        </div>
        </div>
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={()=>postDetails()}
        >Create Movie </button>
        
      
        </div>
        </div>
    )
}

export default CreateMovie;