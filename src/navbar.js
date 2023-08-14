import React from 'react';
import { Nav, Navbar, Button, Form } from 'react-bootstrap';
import { NavLink, useNavigate  } from 'react-router-dom';
import logo from './logo.png';

function navbar(props) {



    return(
            <Navbar bg = "dark" variant = "dark" fixed="top"  >
                <Navbar.Brand>
                    <img src={logo} alt="logo"  width="200rem" className='ms-4'/>
                </Navbar.Brand>
                
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className='me-4'>
                        Signed in as:  {String(props.account).substring(0, 6)}...{String(props.account).substring(38, 42)}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    
}

export default navbar;
