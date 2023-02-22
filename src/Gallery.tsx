import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Gallery()
{

    let { page } = useParams();  

    if(!page) page='0';

    const [data, setData] = React.useState([]);

    const [totalPages, setTotalPages] = React.useState(0);
    const [arrayPages, setArrayPages] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    const urlListProducts:string = 'https://dummyjson.com/products';
    const numberProductsByPage:number = 9;
    
   
    let currentPage = parseInt(page);
  
  ///-------================== Fetch data here
    React.useEffect(
      () => {
        
        let skip:number=0;

        if(page){
                
                skip = currentPage * numberProductsByPage;
        }
       
        let url = urlListProducts+'?limit='+numberProductsByPage+'&skip='+skip;
        
        fetch(url).then((response) => response.json())
        .then((res) => {
            console.log('res',res);
           setData(res.products);  

           let numPages:number = Math.ceil(res.total / numberProductsByPage);
           setTotalPages (numPages);
           
           createPagesArray(numPages);

           setLoading(false);
        });
  
     }, [page]);

     function createPagesArray(numP)
     {
         let pages:any = [];
     
         for(let i=0 ; i<numP ; i++) {
            pages.push(i);
        }
        
        setArrayPages( pages );
         
     }

        /////------data still not fetched
    if(loading) return <h3>Loading...</h3>;

    return (
        <>
            <div className='gallery_box'>
                <h2>Produtos:</h2>
            
                <div className='wrap_gallery'>
                    
                            {data.map((el:any, i:number) =>{
                                    return(
                                    <Link to={'/shop/product/'+el.id} key={el.id} className='prod_card'>
                                    <article  >
                                        <picture>
                                            <img src={el.thumbnail} alt={el.title} className='thumb_prod'/>
                                        </picture>
                                        
                                        <h3>{el.title}</h3>
                                        <p>Marca: {el.brand}</p>
                                        <p className='price'>U${el.price}</p>
                                    </article>
                                    </Link>)
                            })}
                </div>
                <PagesLink numPag={totalPages} currentPag={currentPage}/>
              
            </div>
        </>
    );
}


function PagesLink(props)
{

        let pages:any = [];
            
            for(let i=0 ; (i < props.numPag) ; i++) {
                if( i ==(props.currentPag+3) )break;
                if( i <(props.currentPag-3)  )continue;    
            pages.push(i);
        }

        return( <div className='gallery_pages'>

        {( ( props.currentPag - 3 )>0 ) &&
            <span className='lower'>...</span>
        }



                {
                pages.map( (el,i)=>{
                        //console.log('->',el, )
                        return (
                        <div key={i} className={(el == props.currentPag) ? 'active_page ' : ''}>
                            <Link to={'/shop/product-page/'+el}>{el+1}</Link>
                            </div>
                            )
                })}

        {(props.numPag > (props.currentPag+3)) &&
            <span className='lower'>...</span>
        }
            </div>)
}