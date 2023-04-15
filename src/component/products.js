import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export const Products = () => {

    const boxP = useRef()

    const [products, setProducts] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res=>{
                setProducts(res.data)
            })
        getProductDetails();
        createObserver();
    }, [])


    useEffect(() => {
        if(loader === true){
            axios.get('https://fakestoreapi.com/products')
            .then(res=>{
                setProducts([...products , ...res.data])
                setLoader(false)
            })
        }
    }, [loader])

    const getProductDetails = async () => {
        let temp = []
        await axios.get('https://fakestoreapi.com/products')
            .then(res=>{
                temp = [...res.data]
            })
        setProducts([...products , ...temp])
    }

    const createObserver = () => {
        let observer;
      
        let options = {
          root: null,
          rootMargin: "0px",
          threshold: [0.0],
        };
      
        observer = new IntersectionObserver(()=>{setLoader(true)}, options);
        observer.observe(boxP.current);

        // console.log(boxP.current)
      }

    return (
        <div className="productsDisplay">
                {
                    products&&
                    products.map(p=>
                        <div className="product">
                            <div className="image">
                                <img style={{height:100}} src={p.image}/>
                            </div>   
                            <div className="details">
                                <h3>{p.category}</h3>

                                <p>{p.title}</p>

                                <p>{p.description}</p>

                                <p>Rs {p.price}</p>
                            </div>     
                        </div>    
                    )
                
                }
                <div style={{height:100, width:'100%'}} ref={boxP}>
                        loading more...
                </div>
        </div>
    )
}
