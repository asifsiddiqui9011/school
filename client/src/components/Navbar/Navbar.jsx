import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo6.png'
import { useState } from 'react';

function Navbar () { 

const [menuOpen, setMenuOpen] = useState(false);


const toggleMenu = () => {
setMenuOpen(prevState => !prevState);
};


return (
    <>
    <div className='navbar_Container'>
        <img src={logo} alt="" className='logo' />
        <div className={`navbar_tags ${menuOpen ? 'active' : ''}`}>
           <Link to={'./'}><button className='navbar_btn'>Home</button></Link>
           <Link to={'./Add'}><button className='navbar_btn'>Add</button></Link>
           <Link to={'./view'}><button className='navbar_btn'>View List</button></Link>
        </div> 
         <button className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className='login_button'>
            <h1>Login</h1>
        </div>
    </div>
    
    </>
)

} 

export default Navbar