import React from 'react'
import "./Testpage.css"
function Testpage() {
  return (
    <div className='container py-4'>
        <div className='d-flex flex-column justify-content-center align-items-center bg-light'>
      <table className='w-100'>
        <tbody>
            <tr className='bg-light p-3'>
                <td>Past Paper</td>
                <td><button className='testbutton'>Sample Test</button></td>
                <td><input type='checkbox'/>5 years</td>
                <td><input type='checkbox'/>10 years</td>
                <td><button>Enroll</button></td>
            </tr>
            <tr>
                <td>Past Paper</td>
                <td>Mock Test</td>
                <td>Module Practise</td>
            </tr>
        </tbody>
        </table>  
    </div>
    </div>
  )
}

export default Testpage