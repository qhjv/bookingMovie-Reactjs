import React from 'react';
import "./404page.css"
import errorImg from "../../assets/images/404page.png"
import { useHistory } from "react-router-dom";

Page404.propTypes = {
    
};

function Page404(props) {
    const history = useHistory();

    const handleClickBack = () => {
        history.push("/");
    }
    return (
        <div class="errorPage">
            <img src={errorImg} alt=""></img>
            <button className="errorPage-button"
                onClick={handleClickBack}
            >
                Quay lại trang chủ
            </button>
        </div>
    );
}

export default Page404;