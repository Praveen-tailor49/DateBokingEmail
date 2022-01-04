import React from 'react'

const End = ({date, title, time}) => {
    return (
        <>
            
            <div style={{textAlign:'center'}}>
                <h1>Meeting Date</h1>
                <h6> Title {title}</h6>
                <p> Date {date}</p>
                <p>Time {time}</p>
            </div>
        </>
    )
}

export default End
