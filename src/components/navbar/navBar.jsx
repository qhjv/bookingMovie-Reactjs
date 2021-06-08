import React,{useState} from 'react';
import PropTypes from 'prop-types';
import './navBar.css'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Loading from '../../components/loading/loading';


NavBar.propTypes = {
    
};

function NavBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const open = Boolean(anchorEl);
    const [loading,setLoading]=useState(false)
   
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setLoading(true)
        setTimeout(() => {
            localStorage.removeItem('user');
            props.setUser();
            setAnchorE2(null); 
        }, 1000);
    }
    return (
        <div className="fullnavbar">
            {loading ? (<Loading  onLoad={loading} />): (<></>)}
            <nav className="navbar navbarHome navbar-expand-sm navbar-dark">
                {/* Brand/logo */}
                <Link className="navbar-brand" to="/">
                        <img className="logoWeb" src={logo} alt="logo" />
                    </Link>
                {/* Links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" >Phim</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" >Rạp phim</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" >Tin tức</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" >Ứng dụng</a>
                    </li>
                </ul>
                {/*Tài khoản*/}
                <div className="account">
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <PersonOutlineIcon className="buttonAccount" /> 
                            <h4>My account</h4>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
                            <MenuItem onClick={handleClose}>Lịch sử đặt vé</MenuItem>
                            <MenuItem onClick={handleLogOut} style={{color:"red"}}>Log Out</MenuItem>
                        </Menu>
                    </div>
                
            </nav>
        </div>
    );
}

export default NavBar;