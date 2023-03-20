import React, { useState, useContext, useRef } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { MyContext } from '../Contex/Context';
import CloseButton from "react-bootstrap/CloseButton";

export default function Stage1() {

    // Context to get access to the global state and functions
    const context = useContext(MyContext);

    //Input value REF
    const textInput = useRef();

    //💥StateError Handling - default false and empty string
    const [error, setError] = useState([false, '']);

    //Input Value and Validate
    const handleSubmit = (e) => {
        e.preventDefault();

        const value = textInput.current.value;
        
        // Validate the input value
        const validate = validateInput(value);

        if (validate) {
            setError([false, '']);
            context.addPlayer(value);
            textInput.current.value = "";
        }

    };

    //Validate Input
    const validateInput = (value) => {

        if (value === '') {

            setError([true, "💥Sorry, you need to add Something"]);
            return false;
        }

        if (value.length <= 2) {

            setError([true, "⛔Sorry, you need 3 char at least"]);
            return false;
        }
        return true;

    };
     // Check the added player
    // console.log(🤟"Add Player", context.state)
    return (
        <div className='d-inline-block'>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control type="text" placeholder='add player name' name='player' ref={textInput}>
                    </Form.Control>
                </Form.Group>
                {error[0] ?
                    <Alert variant='danger'>{error[1]}</Alert>
                    :
                    null
                }
                <Button type="submit" variant="primary" className='m-2'
                ><i className="bi bi-check-lg"></i> Add Player</Button>
                {context.state.players && context.state.players.length > 0 ?
                    <div>
                        <ul className='list-group'>
                            {context.state.players.map((player, i) => (
                                <li key={i} className='list-group-item d-flex align-items-center flex-wrap justify-content-between m-2'>
                                    {player}
                                    <CloseButton style={{ width: "10px", height: "1px" }} type="button"
                                        onClick={() => context.removePlayer(i)}
                                    />
                                </li>
                            ))}
                        </ul>
                        <div>
                            <Button variant="success"
                                //Stage2
                                onClick={() => context.next()}
                            >Next</Button>
                        </div>
                    </div>
                    :
                    null
                }
            </Form>
        </div>
    )
};
