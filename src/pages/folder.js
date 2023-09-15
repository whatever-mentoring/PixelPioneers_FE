import './folder.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ppex from "../resource/ppex.png";

function App(){
    return(
        <div className='background2'>
            <div className="box4">
                <Link to="/photoalbum"><div className='arrow2'></div></Link>
                <div className='username2'>username</div>
                <Link to="/photoalbum"><div className='trash'></div></Link>
            </div>
            <Link to="/photoalbum"><div className='plus2'></div></Link>
            <div className='group2'>
                <div className='photo1'><img src={ppex} className='ppex'/><h4 className='photogroup1'>200일 기념일</h4><p className='date1'>2222년 33월 23일</p></div>
            </div>
            <div className='group2'>
                <div className='photo1'><img src={ppex} className='ppex'/><h4 className='photogroup1'>200일 기념일</h4><p className='date1'>2222년 33월 23일</p></div>
            </div>
            <div className='group2'>
                <div className='photo1'><img src={ppex} className='ppex'/><h4 className='photogroup1'>200일 기념일</h4><p className='date1'>2222년 33월 23일</p></div>
            </div>
            <div className='group2'>
                <div className='photo1'><img src={ppex} className='ppex'/><h4 className='photogroup1'>200일 기념일</h4><p className='date1'>2222년 33월 23일</p></div>
            </div>
            <div className='group2'>
                <div className='photo1'><img src={ppex} className='ppex'/><h4 className='photogroup1'>200일 기념일</h4><p className='date1'>2222년 33월 23일</p></div>
            </div>
        </div>
    );
}
export default App;