import React, { useState } from 'react';
import './Banner.css';
import examimg from '../Asset/exam4.png';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const nav=useNavigate();


  const examdata = [ 
    { examname: 'RAILWAYS' , enrolled:1},
   
    { examname: 'TNPSC', enrolled:0 },
    { examname: 'BANKING', enrolled:1 },
    { examname: 'UPSC', enrolled:0 },
    { examname: 'RAILWAYS', enrolled:0 },
    { examname: 'TNPSC', enrolled:0 },
    { examname: 'JEE MAIN', enrolled:0 },
    { examname: 'UPSC', enrolled:1 },
  ];


function handleexams(){
  nav("/exams")
}
  return (
    <div className='bannerpage'>
    <div className="container m-0" id="sapbanner">
      <div className="row py-5">
        {examdata.map((e, index) => (
          <div className="col-sm-12 col-md-3" key={index}>
            <div className={`exampart d-flex justify-content-center align-items-center ${e.enrolled===1?"successpart":"defaultpart"} `}>
              <div className="exampart1 d-flex justify-content-center align-items-center">
                <img src={examimg} alt={e.examname} onClick={handleexams} />
                
              </div>
            </div>
            <p className="text-center py-2 examnames">{e.examname}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Banner;
