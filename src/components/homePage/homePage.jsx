/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './homePage.css';
import { emailGet } from './homePageSlice';


HomePage.propTypes = {
    
};

function HomePage(props) {
    const history = useHistory()
    const [email,setEmail]=useState('')
    const dispatch = useDispatch()


    const handleEmail =(event)=>{
        setEmail(event.target.value)
    }
    const handleEmailSubmit =()=>{
    }
   const handleClickButton=()=>{

    const filter = /^[A-Za-z][\w$.]+@[\w]+\.\w+$/; 
    if(filter.test(email)){
      const action = emailGet(email)
      dispatch(action)
      history.push("/dangky")
    }else if(email!==''){
      alert("email không hợp lệ")
    }
   }
    return (
        <div className="page">
        <div className="backgroundBlur">
        </div>
        <div className="container">
          <section className="fullnavbar">
            <nav className="navbar navbar-expand-sm">
              {/* Brand/logo */}
              <a className="navbar-brand">
                <img className="logoWeb" src={logo} alt="logo" />
              </a>
              {/* đăng nhập */}
              <Link className="navbar--right" to="/dangnhap">
                <button className="signinHome">
                  <a className="signinHome--a">Đăng nhập</a>
                </button>
              </Link>
            </nav>
          </section>
          <section className="contentHome d-flex flex-column justify-content-center ">
            <div className="contentHome--intro">
              <p>Website đặt vé xem phim , cập nhật đầy đủ , nhanh nhất thông tin phim , giá vé , rạp chiếu và các ưu đãi</p>
              <p>dành cho bạn.</p>
              <small> Hãy theo dõi chúng tôi để nhận những ưu đãi mỗi ngày.</small>
            </div>
            <div className="contentHome--email">
              <div className="contentHome--email__input">
                <label className="input_id" placeholder="email">
                <ValidatorForm 
                        onSubmit={handleEmailSubmit }
                        className="formLogin"
                        onError={errors => {
                            for (const err of errors) {
                              console.log(err.props.errorMessages[0])
                            }
                            }}
                >

                  <TextValidator className="nfTextField error" id="id_email_hero_fuji"   tabindex="0" autocomplete="email" maxlength="50" minlength="5" 
                        placeholder="Địa chỉ email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={handleEmail}
                        pattern="[A-Za-z]{3}"
                        title="Three letter country code"
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Hãy điền trường này!!!', 'email không hợp lệ']}
                        autoComplete='off' />
                  

                    <button className="signinHome" onClick={handleClickButton} >
                      <a className="signinHome--a">Đăng ký
                        <i className="fas fa-chevron-right" />
                      </a>
                    </button>

                </ValidatorForm>
                </label>
              </div>
              <div id className="inputError" data-uia="field-email+error" style={{display: 'none'}}>Bạn cần nhập email!</div>
            </div>
          </section>
        </div>
      </div>
    );
}

export default HomePage;