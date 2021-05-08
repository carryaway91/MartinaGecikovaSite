import React, { useState, useEffect, useRef } from 'react'
import { TweenMax, Power3 } from 'gsap'
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState()


    const image = useRef(null)
    const mainHeader = useRef(null)
    const title = useRef(null)
    const underTitle = useRef(null)
    
    useEffect(() => {
        axios.get('/api/intro').then(res => {
            setData(res.data.data)
        })
    },[])
    useEffect(() => {
        TweenMax.fromTo(
            mainHeader.current,
            1,
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: .5,
                y:0,
                ease: Power3.easeInOut
            }
        )
    }, [])

    useEffect(() => {
        
    },[])
    useEffect(() => {
        
        
        TweenMax.fromTo(title.current, .8, { opacity: 0, y: 30 }, { opacity: 1, y: 0, delay: 1 })
        TweenMax.fromTo(underTitle.current, .8, { opacity: 0, y: 30 }, { opacity: 1, y: 0, delay: 1.5 })
        TweenMax.fromTo(image.current, .8, { opacity: 0, y: -30, delay: .2 },{ opacity: 1, y: 0, ease: Power3.easeIn, delay: .2})
    }, [data])

    return (
        <div className="flex w-full mt-2">

            <div className="relative w-4/5">

                {

                    data && (
                        <div className="absolute z-10" style={{ left: '15%', top: '5%'}}>
                            
                            <h1 className=" text-white opacity-0"
                            style={{ fontSize: '5vw'}}
                                ref={title}>
                                { data.main_title }
                            </h1>

                            <h2 className="text-white opacity-0 mt-1" style={{ fontSize: '3vw'}} ref={underTitle}>{ data.second_title }</h2>
                        </div>
                        ) 
                }


                <div className="bg-gray-500 relative opacity-50" 
                    style={{ height: '50%', width: '100%', opacity: 0, zIndex: 0}}
                    ref={mainHeader}>

                </div>


                { data &&    
                    <img src={data.photo} className="absolute top-6 opacity-0" style={{ width: '35%', right: '-15%'}} ref={image }/>
                }
            </div>

        </div>
        )
}

export default Home;