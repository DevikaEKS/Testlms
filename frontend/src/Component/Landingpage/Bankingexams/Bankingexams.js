import React from 'react';
import "./Bankingexams.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import coins from "../Asset/coins.png";
import { Link } from 'react-router-dom';

function Bankingexams() {
  const datas = [
    { examname: "IBPS" },
    { examname: "SBI Clerk" },
    { examname: "BOI" },
    { examname: "Prelims SBI" },
  ];

  return (
    <div className="d-flex justify-content-center ">
      <div className="container custompart py-4">
       
        {datas.map((e, index) => (
            <Link to="/testpage" className='text-light text-decoration-none'>
          <div
            key={index}
            className="testpart my-3 p-2 rounded-3 d-flex justify-content-between align-items-center"
          >
            <span className="px-3 d-flex align-items-center">
              {e.examname}
            </span>
            <img src={coins} alt="Coins" />
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Bankingexams;
