import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='bg-light text-center text-white shadow-lg'>

      <div className='text-center p-3 ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <p className='text-white' >
         Powered By Eng  <span className='fw-bold'>Marwan Magdy</span>
        </p>
        © 2023 Copyright

      </div>
    </MDBFooter>
  );
}