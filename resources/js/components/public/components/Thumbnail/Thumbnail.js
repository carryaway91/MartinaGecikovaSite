import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LayoutContext } from '../../../../context/LayoutContext'
import { TweenMax, Power3 } from 'gsap'
import { Tween } from 'jquery'
import styles from './Thumbnail.module.css'


const Thumbnail = props => {
    const { showOverlay } = useContext(LayoutContext)
    const [imgSize, setImgSize] = useState('316px')
    const thumb = useRef(null)

    useEffect(() => {
        
        const setSize = () => {
            if(window.innerWidth < 410) {
                setImgSize('200px')
            } else {
                setImgSize('316px')
            }
        }
        setSize()
        window.addEventListener('resize', setSize)
    },[])



    useEffect(() => {
        TweenMax.fromTo(
            thumb.current,
            1,
            {
                y: 100,
                opacity: 0,
                ease: Power3.easeInOut,
            },
            {
                y: 0,
                opacity: 1
            }
        )
    }, [props.bg])



    return (
        <li className="p-5 opacity-0 relative" ref={thumb}>
            <Link to={  props.galleryThumb ? { pathname: `/gallery/${props.galleryID}` } : { pathname: `/gallery/${props.galleryID}/${props.picID}`, state: { modal: true} }}>
                <div className="relative" onClick={() => props.galleryThumb ? null : props.showID(props.picID)}>
                    <div
                    onClick={ props.galleryThumb ? null : () => showOverlay()}
                        style={{
                            width: imgSize,
                            height: imgSize,
                            backgroundImage: `url(${props.bg})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }} className="flex justify-center">
                        <div className="overlay"></div>
                        { props.galleryThumb && 
                            <h2 className="text-2xl text-white z-10 absolute capitalize" style={{ bottom: 35, left: 35 }}>{props.name}
                                <div className="w-10/12 h-1 bg-blue-800"></div>
                            </h2>
                        }
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default Thumbnail