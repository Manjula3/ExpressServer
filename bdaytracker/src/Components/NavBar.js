import React from 'react'
import propTypes from 'prop-types'
import '../App.css'


const NavBar=({title,icon})=>
{
return(
    <div>
    <div className="container">
    <div className="row bg-dark py-10 fc-white">
    <div className="px-5 fc-red"><i className={icon} ></i></div> <h5 className="px-5">{title}</h5>
    </div>
    </div>
    </div>
)
}
export default NavBar

NavBar.propTypes={
    title:propTypes.string.isRequired,
    icon:propTypes.string
}

NavBar.defaultProps={
    title:"Bday-Tracker",
    icon:"fa fa-heart" 
}