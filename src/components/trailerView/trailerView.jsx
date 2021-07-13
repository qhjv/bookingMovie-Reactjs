import { DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';

TrailerView.propTypes = {
    
};

function TrailerView({trailer}) {
    const [open, setOpen] = useState(false);
      
    const handleClickTrailer=()=>{
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
        <div className="slideVideo--content__watch-button d-flex justify-content-center align-items-center"
                                            onClick={handleClickTrailer}
                                        >
                                            <i className="fas fa-play"></i>
         </div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
            <DialogTitle className="DialogTitle">Đang tải vui lòng chờ trong giây lát ...</DialogTitle>

                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={trailer}
                                            title="YouTube video player"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
        </Dialog>
        </>
    );
}

export default TrailerView;