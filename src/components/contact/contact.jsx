import React from 'react';
import "./contact.css"

Contact.propTypes = {
    
};

function Contact(props) {
    return (
        <div className="contact">
                <div className="contact_title">
                    Nhận các thông báo khuyến mãi , giảm giá về email của bạn .
                </div>
                <div className="contact_form">
                    <form action="">
                        <input type="text" className="form-control" placeholder="Nhập email của bạn " id="joinnow-email"></input>
                        <button type="submit" className="contact_form-submit">Tham gia</button>
                    </form>
                </div>
            </div>
    );
}

export default Contact;