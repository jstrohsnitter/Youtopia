import { useState } from 'react'
import './App.css'
import Trip from '/Users/macbook/code/ga/projects/Youtopia/YouTopiaFrontend/src/components/Trip.jsx'

function App() {

  const [page, setPage] = useState('youtopia')


  function handleClick(event) {
    setPage(event.target.value)

 //on clikc the page is set to trip
  }
 

  return (
 <>
 {page === 'youtopia' ? <>
  <h1>YouTopia</h1>
 <button onClick={handleClick} value="trip">Enter</button>
  </> : '' }
 {page === "trip" ?<Trip handleClick={handleClick} setPage={setPage}/> : ""}
  </>
  )
};

export default App;
