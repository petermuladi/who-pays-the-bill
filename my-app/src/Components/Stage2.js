import React from 'react';
import { MyContext } from '../Contex/Context';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

//Stage2 komponent Who is the Looser
export default function Stage2() {

  const contex = useContext(MyContext);

  //Render a Spinner until the winner is generated
  if(!contex.state.pending){
    return  <Spinner animation="border" variant="danger"/>
  }
  //Render the loser and a button to start a new game
  return (
    <div>
      <h1 style={{color:"red"}}>The looser is:</h1>
      <div className='card d-inline-block p-3'><h3>{contex.state.icon} {contex.state.loser}</h3></div><br/>
      <Button className='m-3' variant="danger"
      onClick={()=>contex.newPlay()}
      >Go To New Play</Button>
    </div>
  )
}
