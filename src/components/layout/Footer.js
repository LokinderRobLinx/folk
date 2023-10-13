import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
           Copyright &copy; {new Date().getFullYear()} <Link to="/">FolkRaas</Link>  |
            
            {""} All Rights Reserved | Powered By {""}
            <a
                href="https://www.roblinx.com/" target="_blank" rel="noopener noreferrer"
                style={{ cursor: "pointer" }} title="Visit The Site"
            >
                RobLinx
            </a>
        </div>
    )
}

export default Footer