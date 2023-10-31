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
  const [totalNum,setTotalNum] = useState<number>(0)


  useEffect(()=>{

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions




    if(REACT_APP_SCRIPT){

      // axios.get(randamUrl)




        axios.get(REACT_APP_SCRIPT)
        .then(response => {
    
          const data = response.data

          
          const japaneseSentence = data.japaneseSentence.split("\n")
          const englishSentence = data.englishSentence.split("\n")
          const rowNumber = data.rowNumber
          setTotalNum(data.totalNum)

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


      if(result.status === 200){
  
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

<li
style={{
  marginTop:20,
  marginBottom:20
}}
>
    <input type={"checkbox"} value={-1} onChange={(e)=>{
      const value = Number(e.target.value)
      setNum(value)


    }}/>{"NG"}
  </li>

  <button onClick={complete}>完了する</button>

  <div
  style={{
    marginTop:20,
    marginBottom:20
  }}
  
  >

  現在の進捗状況{row}/{totalNum}


  </div>



</li>


</ul>


            





  
      </header>




    </div>
  );
}

export default App;
