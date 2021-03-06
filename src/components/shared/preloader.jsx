import React from 'react';
import './preloader.sass';

export default function Preloader() {
 return (
  <svg id="arrows" width="300" height="300" viewBox="11 16 68 57.8">
   <g featurekey="root" fill="#000000" />
   <g featurekey="symbol1" fill="#001529">
    <polygon id="arrow-down" points="61,23.8 53.1,16 23.2,45.9 11,36 11,73.8" />
    <polygon id="arrow-up" points="30.2,65.4 38.1,73.3 68,43.4 79,54.5 79,16.7" />
   </g>
  </svg>
 );
}
