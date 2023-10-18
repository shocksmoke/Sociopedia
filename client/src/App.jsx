import React, { useMemo } from 'react';
import Home from './screens/Home';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from '@emotion/react';
import themeSettings from "./theme.js";
import { CssBaseline, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import Login from './screens/Login';


export default function App() {
  let mode= useSelector((state)=> state.mode);

  let isAuth=  Boolean(useSelector((state) => state.token));
  let theme= useMemo(()=>createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={isAuth?<Home/>:<Login/>}/>
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  )
}
