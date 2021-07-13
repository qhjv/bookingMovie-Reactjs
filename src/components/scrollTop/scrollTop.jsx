import React,{useState} from 'react';
import PropTypes from 'prop-types';
import "./scrollTop.css"
import $ from "jquery"

ScrollTop.propTypes = {
    
};

function ScrollTop(props) {
    const handleClickScrollTop = () => {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    }
    return (
        <div className="scrollTop" onClick={handleClickScrollTop}>
            <i className="fas fa-chevron-up"></i>
        </div>
    );
}

export default ScrollTop;