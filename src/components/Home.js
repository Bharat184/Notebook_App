import React from 'react'
import Notes from './Notes'


function Home(props) {
    
    return (
        <div className='my-3'>
            
            <Notes showAlert={props.showAlert} />
        </div>
    )
}

export default Home;
