import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Container,IconButton , CssBaseline , Avatar, makeStyles, Card, CardContent, Typography, FormControlLabel, Checkbox ,Button, Grid, CircularProgress  } from '@material-ui/core'
import { LockRounded} from '@material-ui/icons'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './login.css'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import logo from '../../../assets/images/logo.png'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Loading from '../../../components/loading/loading';
import { useDispatch } from 'react-redux';
import {userStore} from './loginSlice'
import firebase from '../../../helpers/db';
import "firebase/auth";




function LogIn(props) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory();

    const handleEmail =(event)=>{
        setEmail(event.target.value)
    }
    const handlePassword =(event)=>{
        setPassword(event.target.value)
    }
    const handleClickShowPassword = () => {
        setShowPassword( !showPassword );
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleLogin =()=>{
        setLoading(true)
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const {user} =  response;
                const data = {
                    userId: user.uid,
                    email: user.email,
                    accessToken:user.za
                }
                localStorage.setItem('user', JSON.stringify(data));
                const storage = localStorage.getItem('user');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                const action = userStore(loggedInUser)
                dispatch(action)
                history.push("/");
                setLoading(true);
            }).catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
    }
    return (
        
        <div className="page">
            <ToastContainer/>
            {loading ? (<Loading  onLoad={loading} />): (<></>)}
            <div className="backgroundBlur">
            </div>
            <div className="container">
                <section className="fullnavbar">
                <nav className="navbar navbar-expand-sm">
                    {/* Brand/logo */}
                    <Link className="navbar-brand" to="/">
                        <img className="logoWeb" src={logo} alt="logo" />
                    </Link>
                </nav>
                </section>
                <section className="loginContent">
                    <div className="fullLogin">
                        <div className="loginContent--form">
                            <h1 data-uia="login-page-title">
                                Đăng nhập
                            </h1>
                                    <ValidatorForm 
                                        onSubmit={handleLogin}
                                        onError={errors => {
                                            for (const err of errors) {
                                            console.log(err.props.errorMessages[0])
                                            }
                                            }}
                                            className="login--form__email"
                                    >
                                        <TextValidator
                                            className="login--form__input" id="id_userLoginId" defaultValue placeholder="Nhập email"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            onChange={handleEmail}
                                            name="email"
                                            value={email}
                                            validators={['required', 'isEmail']}
                                            errorMessages={['Hãy điền trường này!!!', 'email không hợp lệ']}
                                            autoComplete='off' 
                                        />
                                        <div className="passwordFull">

                                            <TextValidator
                                                    className="login--form__input" id="id_password" defaultValue placeholder="Nhập password"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={handlePassword}
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    validators={['required']}
                                                    errorMessages={['Hãy điền trường này!!!']}
                                                    autoComplete="off"
                                            >
                                            </TextValidator>
                                            <IconButton
                                                className="showPassword"
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </div>
                                        
                                       
                                            <div className="login--form__button">
                                                <Button
                                                    className="signinHome"
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                >
                                                        Đăng nhập
                                                </Button>
                                            </div>
                                            
                                    </ValidatorForm>
                                
                        </div>
                        <div className="loginContent--other">
                            <div className="login-signup-now" data-uia="login-signup-now">Bạn mới tham gia ? 
                                <Link to="/" onClick={props.toggle}>
                                    <a className=" " target="_self" > Đăng ký ngay</a>.
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

                                
                                
                                
    );
}

export default LogIn;
