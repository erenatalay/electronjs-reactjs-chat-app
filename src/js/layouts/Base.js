import React from 'react'
import Navbar from '../components/Navbar'

const Base = ({children,...props}) => {
    return (
        <>
           <Navbar {...props}/> 
           {children}
        </>
    )
}

export default Base


function getDisplayName(Component){
    return Component.displayName || Component.name || 'Component';
}

export const viewBaseLayout = (Component,config) => (props) => {
const viewName = getDisplayName(Component)

        return(
            <>
             <Navbar {...config} view={viewName}/> 
             <Component {...props}/>
            </>
        )
    }

