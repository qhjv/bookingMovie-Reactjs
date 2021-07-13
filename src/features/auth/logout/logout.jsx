/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable default-case */
import { Button, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { unwrapResult } from '@reduxjs/toolkit';
import "firebase/auth";
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../assets/images/logo.png';
import Loading from '../../../components/loading/loading';
import { MA_NHOM } from '../../../constants/constants';
import firebase from '../../../helpers/db';
import { register } from '../userSlice';
import './logout.css';


LogOut.propTypes = {
    
};

function LogOut(props) {
    const emailfromhome = useSelector(state=>state.emailfromhome)
    const [email,setEmail]=useState(emailfromhome?emailfromhome:'')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [loading,setLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useHistory();
    const dispatch = useDispatch()



    const handleEmail =(event)=>{
        setEmail(event.target.value)
    }
    const handleName =(event)=>{
        setName(event.target.value)
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
    const handleConfirmPassowerd=(event)=>{
        setConfirmPassword(event.target.value)
    }
    const handleLogout = async ()=>{
        try {
            const action = register({
                taiKhoan: email,
                matKhau: password,
                hoTen: name,
                email: email,
                soDt: password,
                maLoaiNguoiDung: "KhachHang",
                maNhom: MA_NHOM,
            })
            localStorage.setItem('userAPI',JSON.stringify({
                taiKhoan: email,
                matKhau: password,
                hoTen: name,
                email: email,
                soDt: password,
                maLoaiNguoiDung: "KhachHang",
                maNhom: MA_NHOM,
            }));
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(response => {
                    if(response) {
                        history.push("/dangnhap");
                        props.toggle();
                        setLoading(true);
                    }
                }).catch((error) => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            toast.error(error.message);
                            break;
                        case 'auth/invalid-email': 
                            toast.error(error.message);                    
                            break;
                        case 'auth/weak-password':
                            toast.error(error.message);
                            break;
                    }
                });
        } catch (error) {
            toast.error("email này đã có người đăng ký !!!");
        }
        
    }

    useEffect(()=>{
        ValidatorForm.addValidationRule('isPasswordMatch',(value)=>{
            if(value!==password){
                return false;
            }
            return true;
            
        })
        return()=>{
            ValidatorForm.removeValidationRule('isPasswordMatch')
        }
    },[password])
    return (
        
        <div className="pageLogout">
            <ToastContainer/>
            {loading ? (<Loading  onLoad={loading} />): (<></>)}
            <div className="container">
                <section className="fullnavbar">
                    <nav className="navbar navbar-expand-sm">
                    <Link className="navbar-brand" to="/">
                        <img className="logoWeb" src={logo} alt="logo" />
                    </Link>
                    <Link className="navbar--right" to="/dangnhap" onClick={props.toggle}>
                        <button className="signinHome">
                        <a className="signinHome--a">Đăng nhập</a>
                        </button>
                    </Link>
                    </nav>
                </section>
                <section className="logoutContent">
                    <div className="fulllogout">
                        <div className="logoutContent--form">
                            <h1 data-uia="logout-page-title">
                                Đăng ký để bắt đầu phát triển cùng chúng tôi .
                            </h1>
                            <p>Vui lòng điền các thông tin bên dưới</p>
                            <ValidatorForm 
                                        onSubmit={handleLogout}
                                         className="logout--form__email"
                                    >
                                        <TextValidator
                                            className="logout--form__input" id="id_userLogoutId" defaultValue placeholder="Nhập email"
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
                                        <TextValidator
                                            className="logout--form__input" id="id_userLogoutId" defaultValue placeholder="Nhập tên"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            onChange={handleName}
                                            name="name"
                                            value={name}
                                            validators={['required']}
                                            errorMessages={['Hãy điền trường này!!!']}
                                            autoComplete='off' 
                                        />
                                        <div className="passwordFull">

                                            <TextValidator
                                                    className="logout--form__input" id="id_password" placeholder="Nhập password"
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
                                        <div className="passwordFull">

                                            
                                            <TextValidator
                                                className="logout--form__input" id="id_password" placeholder="Nhập lại password"
                                                variant="outlined"
                                                fullWidth
                                                onChange={handleConfirmPassowerd}
                                                name="confirmPassword"
                                                type={showPassword ? 'text' : 'password'}
                                                validators={['required','isPasswordMatch']}
                                                errorMessages={['Hãy điền trường này!!!','mật khẩu không khớp']}
                                                value={confirmPassword}
                                                autoComplete="off"
                                            />
                                            <IconButton
                                                className="showPassword"
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </div>
                                        
                                        
                                            <div className="logout--form__button">
                                                <Button
                                                    className="signinHome"
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                >
                                                        Đăng ký
                                                </Button>
                                            </div>
                                        
                                            
                                    </ValidatorForm>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LogOut;