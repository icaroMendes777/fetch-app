import React from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function SingleProduct(props)
{


    //return <h1>prudutu!</h1>
    const navigate = useNavigate();
   //
   
    let { id } = useParams();  

    //if(!id) id =1;

    const [data, setData] = React.useState({});
    const [isLoading, setLoading] = React.useState(true);
    const [mainImage, setMainImage] = React.useState(0);


    const urlListProducts:string = 'https://dummyjson.com/products';
    
    
  ///-------================== Fetch data here
    React.useEffect(
      () => {
  
        let skip:number=0;
  
        let url = urlListProducts+'/'+id;
  
        fetch(url).then((response) => response.json())
        .then((res) => {
            console.log('res',res);

            console.log('data b',data);
           setData(res);  

           console.log('data a',data);
           setLoading(false);
           //   console.log('data',data);
        });
  
     }, []);



////-------------------------
     if (isLoading) 
      return <div className="">Loading...</div>;

   
      return (
          <div className='single_product'>

            <picture className="wrap_main_pic pic_area">
              <img src={data.images[mainImage]} alt={data.title}/>
            </picture>

            <div className='box_mini_pic'>
              {data.images.map((el:any,i:number)=>{
                    return(
                    <picture key={i} className='wrap_pic_mini'>
                      <img src={el} alt={data.title} className='pic_mini' onClick={()=>{setMainImage(i)}}/>
                    </picture>
                    )
                  }
              )}
            </div>
            
            <div className='prod_description'>
            <button onClick={() => navigate(-1)} className="back_button">←Voltar</button>
              <h3>{data.title}</h3>

              <p>{data.description}</p>

              <p className='price'>Price: U${data.price}</p>

              <p className={(data.stock<60) ? 'red' : 'green'}>Somente {data.stock} restantes!</p>
            </div>
        </div>
        );


}