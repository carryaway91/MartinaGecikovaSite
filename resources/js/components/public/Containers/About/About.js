import React, { useState, useEffect, useRef} from 'react'
import { TweenMax, Power3 } from 'gsap'
import axios from 'axios'
import parse from 'html-react-parser'; 

const About = () => {
    
    const [aboutInfo, setAboutInfo] = useState()
    const [text, setText] = useState()

    const ukaz = useRef()

    const useEffectOnlyOnUpdate = (callback, dependencies) => {
        const didMount = useRef(false);
       
        useEffect(() => {
          if (didMount.current) {
            callback(dependencies);
          } else {
            didMount.current = true;
          }
        }, [callback, dependencies]);
      };
    
    




    useEffect(() => {
        TweenMax.fromTo('.odstavec', .8, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: .2 } )
    },[])
    
    useEffect(() => {
        axios.get('/api/about-me').then(res => {
            setAboutInfo(res.data.data)
        })
    }, [])
    
    useEffectOnlyOnUpdate((dependencies) => {
        TweenMax.fromTo(ukaz.current, .8, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: .2 } )
    }, [aboutInfo]);
    


    return (
        <div className="w-full">
            <h2 className="odstavec text-7xl text-white opacity-0">about me.</h2>
            <br />
            <br />
                <div className="flex w-full text-white" ref={ukaz}>
            {
                        aboutInfo && (
                            <div className="flex w-full justify-between">
                            <p className="odstavec break-all">{parse(aboutInfo.about)}</p>

                        <img src={aboutInfo.photo} style={{ width: '21vw' }} className="self-start ml-12 odstavec"/>
                            </div>
                        )
                    }
                        </div>

        </div>
    )
}

export default About