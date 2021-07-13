/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../../../api/axiosClient';
import { MA_NHOM } from '../../../../../../constants/constants';
import ListMovieDate from '../listMovieDate/listMovieDate';
import './listMovieFromTheater.css';

ListMovieFromTheater.propTypes = {
    
};

function ListMovieFromTheater({maRap,getAndress}) {
    const [movieFromTheater, setMovieFromTheater] = useState([])
    useEffect(() => {
        const fetchTheater = async () => {
            
            const movieTheater = await axiosClient.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maRap}&maNhom=${MA_NHOM}`)
            movieTheater.map((movie)=>{
                movie.lstCumRap.filter((mov,index)=>{
                    if(getAndress){
                        return mov.maCumRap === getAndress
                    }else{
                        return mov.maCumRap === movieTheater[0].lstCumRap[0].maCumRap
                    }
                }).map((mov) => {
                    setMovieFromTheater(mov.danhSachPhim)
                })
            })
        }
        fetchTheater()
    }, [maRap,getAndress])
    
    return (
        <div className="theaterMovies">
            {movieFromTheater.map((movie,index)=>(
                <div className="theaterMovie" key={movie.tenPhim}>
                    <div className="theaterMovie--content">
                        <div className="theaterMovie--name">{movie.tenPhim}</div>
                        <div className="theaterMovie--info">R12 Horror - English - 01h 37m</div>
                    </div>
                    <div className="theaterMovie--times">
                        <ListMovieDate movieDate={movie.lstLichChieuTheoPhim }></ListMovieDate>
                    </div>
                </div>
            ))}
        </div>
            
    );
}

export default ListMovieFromTheater;