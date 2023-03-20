// Importing toastify library and its styles, React and useState hook

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Fragment, useState } from 'react';

///Creating a context object
export const MyContext = React.createContext();

export default function Context(props) {

    //State Data
    const data = {
        stage: 1,
        players: [],
        loser: '',
        icon: '',
        pending: false
    }

    //Initializing state with default data
    const [state, setState] = useState(data);
    //console.log("🖐 This is state", state)

    // Function to add a new player to the state
    const addPlayerHandler = (name) => {

        setState((prevState) => ({
            stage: 1,
            players: [
                ...prevState.players, name
            ]
        }))
    };

    ///Function to remove a player from the state
    const removePlayerHandler = (index) => {

        let newArray = state.players;
        newArray.splice(index, 1)
        setState({
            stage: 1,
            players: newArray
        })

    };

    ///Function to go to the next stage and generate the loser
    const nextHandler = () => {

        if (state.players.length < 2) {

            //make message with bootstrap toastify
            toast.error("You need more than one player", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000,
            });

         //Who is the Looser😣
        } else {
            setState({ stage: 2 });
            setTimeout(() => { generateLoserHandler() }, 3000);
        }

    };

    //Genrate Looser 
    const generateLoserHandler = () => {

        setState({

            loser: state.players[Math.floor(Math.random() * state.players.length)],
            icon: '😣',
            pending: true

        });
    };

    // Function to reset the game
    const newPlayHandler = () => {

        setState({
            stage: 1,
            players: [],
            loser: '',
            icon: '',
            pending: false
        });
    };

    // Providing context values to the children components
    return (
        <Fragment>
            <MyContext.Provider value={{
                state,
                addPlayer: addPlayerHandler,
                removePlayer: removePlayerHandler,
                next: nextHandler,
                newPlay: newPlayHandler
            }}>
                {props.children}
            </MyContext.Provider>
            <ToastContainer />
        </Fragment>
    )
};

