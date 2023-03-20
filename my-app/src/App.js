import React, { useContext } from 'react';
import Stage1 from './Components/Stage1';
import Stage2 from './Components/Stage2';
import { MyContext } from './Contex/Context';

export default function App() {

    const context = useContext(MyContext)

    return (
        <div className="text-center p-2 m-2">
            <div>
                <h1>🤑 Who pays the Bill?</h1>
                {context.state.stage === 1 ?
                    <Stage1 /> : <Stage2 />
                }
            </div>
        </div>
    )
};
