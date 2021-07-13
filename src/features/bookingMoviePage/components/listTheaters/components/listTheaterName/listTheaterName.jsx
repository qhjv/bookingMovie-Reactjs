/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import theaterListApi from '../../../../../../api/theaterListApi';
import './listTheaterName.css';

ListTheaterName.propTypes = {
    
};

function ListTheaterName(props) {
    const {maRap,getAndress} =props
    const [listTheaterName,setListTheaterName] = useState([])
    const getMaRap =maRap ? maRap :"BHDStar"
    useEffect(() => {
        const fetchTheater = async () => {
            const params = {
                maHeThongRap: getMaRap
            }
            const theaterNameList = await theaterListApi.getTheaterList(params)
            setListTheaterName(theaterNameList)
        }
        fetchTheater()
    }, [maRap])
    
    
    return (
        <div className="theaterList">
            <div className="theaterList--name">
                <label htmlFor="theaterList--select">Hệ thống rạp :</label>
                <div className="theaterList--select">
                    <select id="theaterList--select" className="form-select" aria-label="Default select example"
                        onChange={props.chooseTheater}
                    >
                        {(listTheaterName?listTheaterName:[]).map((theater,index)=>(
                            <option key={index} value={theater.maCumRap}
                            >
                                {theater.tenCumRap}
                            </option>
                            
                        ))}
                    </select>
                    <div className="theaterList--address">
                        <i className="fas fa-map-marked-alt" />
                        
                            {(listTheaterName?listTheaterName:[]).filter((theater,index)=>{
                                if(theater.maCumRap === getAndress){
                                    return theater
                                }else if(getAndress ===""){
                                    return theater.maCumRap === listTheaterName[0].maCumRap 
                                }
                            }).map((theater,index)=>(
                                <h4 key={theater.diaChi}>{theater.diaChi}</h4>
                            ))}
                    </div>
                </div>
            </div>
      </div>
    );
}

export default ListTheaterName;