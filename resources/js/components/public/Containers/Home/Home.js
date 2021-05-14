import React, { useState, useEffect, useRef } from 'react'
import { TweenMax, Power3 } from 'gsap'
import axios from 'axios'

const Home = () => {
    const [data, setData] = useState()
    const [headerFont, setHeaderFont] = useState('5vw')
    const [secondHeader, setSecondHeader] = useState('3vw')
    const [picSize, setPicSize] = useState('66%')

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
        const setSize = () => {
            if(window.innerWidth < 500) {
                setHeaderFont('9vw')
                setSecondHeader('7vw')
                setPicSize('90%')
            } else if(window.innerWidth < 950 && window.innerWidth > 501) {
                setHeaderFont('7vw')
                setSecondHeader('5vw')
                setPicSize('50%')
            } else if (window.innerWidth > 950) {
                setHeaderFont('5vw')
                setSecondHeader('3vw')
                setPicSize('33%')

            }
        }

        setSize()
        window.addEventListener('resize', setSize)
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
        <div className="flex mobile:block w-full mt-2">

            <div className="relative w-4/5 mobile:flex mobile:flex-col-reverse mobile:justify-center mobile:items-center mobile:w-full">
asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                {

                    data && (
                        <div className="mobile:flex mobile:flex-col absolute mobile:static z-10 front-text mobile:right-0 mobile:top-0 mobile:mt-5">
                            
                            <h1 className=" text-white flex opacity-0 mobile:justify-center"
                            style={{ fontSize: headerFont }}
                                ref={title}>
                                { data.main_title }
                            </h1>

                            <h2 className="text-white flex opacity-0 mt-1 mobile:justify-center" style={{ fontSize: secondHeader }} ref={underTitle}>{ data.second_title }</h2>
                        </div>
                        ) 
                }


                <div className="bg-gray-500 relative opacity-50 mobile:hidden" 
                    style={{ height: '20vw', width: '100%', opacity: 0, zIndex: 0}}
                    ref={mainHeader}>

                </div>


                { data &&    
                    <img src={data.photo} className="absolute mobile:static top-6 opacity-0 front-pic-position mobile:right-0 mobile:top-0" style={{ width: picSize}} ref={image }/>
                }
            </div>

        </div>
        )
}

export default Home;