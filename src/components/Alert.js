import React from 'react'

function Alert(props) {
   if(props.alert)
   {
    return (
        <div className="alert alert-primary" role="alert">
           {props.alert.msg} {props.alert.type}
        </div>
    )
   }
   else
   {
       return <>
       </>
   }
}

export default Alert
