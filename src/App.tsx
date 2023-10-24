import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const  REACT_APP_SCRIPT = process.env.REACT_APP_SCRIPT
const REACT_APP_POST_SCRIPT = process.env.REACT_APP_POST_SCRIPT


function App() {


  const [japaneseArray,setJapaneseArray] = useState<string[]>([])
  const [englishSentence,setEnglishSentence] = useState<string[]>([])
  const [num,setNum] = useState<number>(0)
  const [row,setRow] = useState<number>(0)


  useEffect(()=>{

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions




    if(REACT_APP_SCRIPT){

      // axios.get(randamUrl)




        axios.get("https://script.google.com/macros/s/AKfycbwKfkIkrUCtuHm_CuRFrNJYPqPiA3-zXfNTlbDY8m8YyKtd9jTYtPILeSPoRQSm5LWUWw/exec")
        .then(response => {
    
          const data = response.data
          
          const japaneseSentence = data.japaneseSentence.split("\n")
          const englishSentence = data.englishSentence.split("\n")
          const rowNumber = data.rowNumber

          setJapaneseArray([...japaneseSentence])
          setEnglishSentence([...englishSentence])
          setRow(rowNumber)


    
        })
        .catch(error => {
            console.error('Error: ', error.response ? error.response.data : error.message);
        });




    


    }



    
  },[REACT_APP_SCRIPT])

  const complete = async()=>{

    let status = "OK"

    if(num === -1){
      status = "NG"
    }

    const data = {
      status:status,
      sentence:englishSentence[num],
      rowNumber:row

      
    }

    if(REACT_APP_POST_SCRIPT){

      const result = await axios.post(REACT_APP_POST_SCRIPT,JSON.stringify(data))

      if(result.data.status === "OK"){
  
        alert("更新が完了しました")
  
      }

    }





  }
  return (
    <div >
      <header className="App-header"
      
      >


<ul>

{japaneseArray.map((value,i)=>{

return (
  <li key={i}>
    <input type={"checkbox"} checked={i === num} value={i} onChange={(e)=>{
      const value = Number(e.target.value)
      setNum(value)


    }}/>{value}
  </li>

)
})}

<li>

<li>
    <input type={"checkbox"} value={-1} onChange={(e)=>{
      const value = Number(e.target.value)
      setNum(value)


    }}/>{"NG"}
  </li>

  <button onClick={complete}>完了する</button>


</li>


</ul>


            





  
      </header>




    </div>
  );
}

export default App;
