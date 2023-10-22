import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const  REACT_APP_SCRIPT = process.env.REACT_APP_SCRIPT


function App() {

    const [images,setImages] = useState<any[]>([])

  useEffect(()=>{

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions




    if(REACT_APP_SCRIPT){

      // axios.get(randamUrl)


      axios({
        method: 'GET',
        url:  REACT_APP_SCRIPT
    })
    .then(response => {
        

        setImages([...response.data.message])
    })
    .catch(error => {
        console.error('Error: ', error.response ? error.response.data : error.message);
    });
    


    }



    
  },[REACT_APP_SCRIPT])
  return (
    <div >
      <header className="App-header">

        <div   style={{
    maxWidth:700,
    display:"flex"
  }}>

            
{images.map((value,i)=>{

return (

  <div key={i}>
  <div


  
  >
  <img src={value.imageUrl}  alt="logo" />


  </div>
  <div>

    {value.sentence}

  </div>
  

</div>

)




})}


  </div>


  
      </header>




    </div>
  );
}

export default App;
