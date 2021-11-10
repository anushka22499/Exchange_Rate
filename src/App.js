import Particles from "react-tsparticles";
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [currencylist, setcurrencylist] = useState([])
  const [balance, setbalance] = useState(1000)
  const [reqvalue, setreqvalue] = useState([])
  const [resvalue, setresvalue] = useState()
  const [finalResult, setfinalResult] = useState([])
  let finalresresult 
  const [currencyvalue, setcurrencyvalue] = useState([])
   const [reqcountry, setreqcountry] = useState("")
  const [rescountry, setrescountry] = useState("")
  let targetvalue 

  // Axios Request for currency list 
  useEffect(() => {
    axios({
      method: 'post',
      url: ("https://openexchangerates.org/api/currencies.json"),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => {
        setcurrencylist(res.data);
      })
      .catch((err) => console.log(err)); 
      axios({
        method: 'get',
        url: ("https://v6.exchangerate-api.com/v6/82a65c3482d45f683c8ded57/latest/"+reqcountry),
         params: 
          { 
            base_code: reqcountry 
          },
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => {
          setcurrencyvalue(res.data.conversion_rates);
        })
        .catch((err) => console.log(err)); 
  }, [reqcountry])
  // Axios Request for exchange rate
  function getArraySum(a){
    let total=0;
    for(let i=0; i< a.length;i++) { 
        total += a[i];
    }
    console.log(total)
    console.log(typeof(a))
    return total;
  }
  
    const try1 = Object.entries(currencyvalue).filter(([key])=> key.includes(rescountry))
const handleexchange =(e)=>{
e.preventDefault();

  if(rescountry) {
        setbalance(balance - reqvalue)
      if (try1.length!==0){
        targetvalue = try1.map((it)=>{
          return (it[1])
        })
    }
       for (let index = 0; index < reqvalue.length; index++) {
        setfinalResult([...finalResult,parseInt(reqvalue)])    
       }
       finalresresult = getArraySum(finalResult)* targetvalue  
       setresvalue(finalresresult)
    
    }
  
  else{
    alert("Select a currency")
  }
  // if(finalresresult){
  //   console.log("in")
  //   setresvalue(finalresresult)
  // }

}

console.log(resvalue, "resvalue")
 console.log(finalResult,typeof(finalResult))

 console.log(reqvalue)

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "White",
            },
          },
          // fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            // move: {
            //   direction: "none",
            //   enable: true,
            //   outMode: "bounce",
            //   random: false,
            // },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
        }}
      />
      <h1>Exchange Rate</h1>
      <div className="Main_Section">
        <div className="Primary_Section">
          <p>Bal: {balance} {reqcountry}</p>
          <input type="text"
           onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          value={reqvalue}
          onChange={(e)=>{
            setreqvalue(e.target.value)
          }}
          placeholder="Enter Value" />
          <div className="Currency_Section">
          <h2><span style={{fontSize:'large'}}>From: </span></h2>
          <select onChange={(e)=>setreqcountry(e.target.value)}>
            <option>
              Select a currency*
            </option>
            {Object.keys(currencylist).map((it)=>(
            <option>
              {it}
            </option>
            ))}
          </select>
          <h2><span style={{fontSize:'large'}}>To: </span></h2>
          <select onChange={(e)=>setrescountry(e.target.value)}>
            <option>
              Select a currency*
            </option>
            {Object.keys(currencylist).map((it)=>(
            <option>
              {it}
            </option>
            ))}
          </select>
          </div>
        </div>
        <center>
        <button type="submit" onClick={handleexchange}>
          Exchange
        </button>
        <div className="Converted_Section">
          {/* <p>{resvalue.length!==0? resvalue : "Result"} {rescountry?rescountry:null}</p> */}
          {/* <input type="text" 
          value={resvalue}
          placeholder="Enter Value" /> */}
        </div>
        </center>
        </div>
    </div>
  );
}

export default App;
