import React, { Component } from 'react';

import AppRouter from './router';
import{useFirebaseApp} from 'reactfire';

function App(){
    const firebase = useFirebaseApp();
    return (


      <div>
        <AppRouter />
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
      </div>


    );
  
};
export default App;

