import React, { useEffect ,useState} from 'react';
import FileUpload from '../components/Files/FileUpload';
import FileList from '../components/Files/FileList';
import Game from './Game'
import axios  from 'axios';

const HomePage = () => {
 
  return (
    <div>
      {/* <FileUpload />
      <FileList /> */}
      <Game />
     
    </div>
  );
};

export default HomePage;
