import React from 'react';
import ComingSoon from '../../../ComingSoon';

const Page: React.FC = () => (
  <div className={'text-center'}>
    <h1 className={'text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8'}>{'Translation'}</h1>
    <p className={'animate__animated animate__fadeInDown animate__500ms mt-3'}>{'How to translate YourDash for other languages'}</p>

    <ComingSoon/>
  </div>
);

export default Page;
