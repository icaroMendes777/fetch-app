import React from 'react';
import { Link, Outlet } from "react-router-dom";
import SingleProduct from './SingleProduct.tsx';
import Gallery from './Gallery.tsx';

export default function Layout()
{



        return(
            <div className="App">

            <div className='wrap_all'>
                <header>
                <Link to="/shop/">
                    <div>
                    <h1>Mercado Importado!</h1>
                    <p>Sua loja virtual para produtos importados de todo tipo!</p>
                    </div>
                    <img src="/shop/logo.svg"/>   
                </Link>
                </header>
              <nav>
              <Link to="/shop/">Home</Link> <Link to="/shop/about">Sobre</Link>
              </nav>
              <main>
                
                <Outlet />
       
              </main>
      


              <footer>
               
               Página desenvolvida por <a href="http://icaromendes.epizy.com/">Icaro Mendes.</a>
              </footer>
      
            </div>
           
          </div>
        );

}