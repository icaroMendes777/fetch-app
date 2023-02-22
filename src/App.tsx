import React from 'react';
import './main.scss' ;


import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout.tsx';
import NoPage from './NoPage.tsx';
import Gallery from './Gallery.tsx';
import SingleProduct from './SingleProduct.tsx';
import About from './About.tsx';

function App() {


   
  

///============================== Render
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/shop/" element={<Layout />}>
        <Route index element={<Gallery />} />
        <Route path="/shop/product-page/:page" element={<Gallery />} />
        
        <Route path="/shop/product/:id" element={<SingleProduct />} />
        <Route path="/shop/about" element={<About />} />
  

        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}



export default App;
