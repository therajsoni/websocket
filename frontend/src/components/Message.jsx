import React from 'react';

export default function Message(
    {
        content ,
        timesStamp
    }
){
    return (
        <>
        <div className='message' >
<p>{content}</p>
<small>{new Date(timesStamp).toLocaleTimeString()}</small>
        </div>
        </>
    )
}