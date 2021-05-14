import axios from 'axios'
import React, {useState, useContext, useEffect, useRef } from 'react'
import { Link, Route } from 'react-router-dom'
import { LayoutContext } from '../../../../../context/LayoutContext'
import Thumbnail from '../../../components/Thumbnail/Thumbnail'
import { useParams } from 'react-router-dom'


// custom hook ktory sa sputi LEN ak v imgs je nejaka hodnota, nie pri initial renderovani kedy je null
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

  
  
  
  
  const Images = (props) => {
      /** STATE */
      const [imgs, setImgs] = useState()
      const [displayedImg, setDisplayedImg] = useState(null)
      const [currentPicIndex, setCurrentPicIndex] = useState(null)
      const [prevPicIndex, setPrevPicIndex] = useState(null)
      const [nextPicIndex, setNextPicIndex] = useState(null)
      const [imgHeight, setImgHeight] = useState('40wv')
      
      useEffect(() => {
         
        const printSize = () => {
            window.innerWidth < 950 ? setImgHeight('70vw') : setImgHeight('40vw')
        }
        window.addEventListener('resize', printSize)
      }, [])


    /** CONTEXT */

    // overlay za fotkou
    const { showOverlay } = useContext(LayoutContext)
    //zavretie overlayu
    const { closeOverlay, showNext } = useContext(LayoutContext)
    // url parametre 
    const { id, imageID } = useParams()





    /** EFFECTS */
    useEffect(() => {
        fetchImages()
    },[])

    // custom hook ktory sa sputi LEN ak v imgs je nejaka hodnota, nie pri initial renderovani kedy je null
    useEffectOnlyOnUpdate((dependencies) => {
        if(imageID && !displayedImg) {
            showOverlay()
            handleShowID(imageID)
            
            if(window.innerWidth > 950) {
                setImgHeight('40vw')
            } else {
                setImgHeight('70vw')
            }
        }
      }, [imgs]);



    /** FUNCTIONS */
    const fetchImages = () => {
        axios.get(`/api/gallery/${id}`).then(res => {
            setImgs(res.data.data)
        })
    }

    // po kliku na obrazok mi najde a zobrazi podla id a nastavi index img v poli
    const handleShowID = id => {
        const searchedImg = imgs.photos.find(img => img.id == id)
        const currentIndex = imgs.photos.indexOf(searchedImg)

        if(imgs.photos.length - 1 > 1) {

            if(currentIndex == 0) {
                setCurrentPicIndex(currentIndex, setPrevPicIndex(imgs.photos.length - 1), setNextPicIndex(1))
            } else if( currentIndex == imgs.photos.length - 1) {
                setCurrentPicIndex(currentIndex, setPrevPicIndex(currentIndex - 1), setNextPicIndex(0))
            } else {
                setCurrentPicIndex(currentIndex, setPrevPicIndex(currentIndex -1), setNextPicIndex(currentIndex + 1))
            }
        } 

        setDisplayedImg(searchedImg)
    }






    const handlePrevPic = index => {
        // ak sme na zaciatku a chceme ist na koniec
        if(index == 0) {
            setDisplayedImg(imgs.photos[imgs.photos.length - 1], setCurrentPicIndex(imgs.photos.length - 1), setNextPicIndex(0), setPrevPicIndex(imgs.photos.length - 2))
        
        } else if (index > 0 && index <= imgs.photos.length - 1 && prevPicIndex !== 0 && nextPicIndex !==0) {
            setCurrentPicIndex(currentPicIndex - 1, setDisplayedImg(imgs.photos[currentPicIndex - 1]), setCurrentPicIndex(currentPicIndex - 1), setNextPicIndex(currentPicIndex + 1), setPrevPicIndex(currentPicIndex - 2))   
        
        } else if (index < 0) {
            setCurrentPicIndex(imgs.photos.length - 1, setDisplayedImg(imgs.photos[imgs.photos.length - 1]), setNextPicIndex(0), setPrevPicIndex(imgs.photos[imgs.photos.length - 2]) )
       
        } else if (prevPicIndex <= 0) {
            setCurrentPicIndex(0, setDisplayedImg(imgs.photos[0]), setNextPicIndex(1), setPrevPicIndex(imgs.photos.length - 1))
        
        } else if (nextPicIndex <= 0) {
            setCurrentPicIndex(currentPicIndex - 1, setDisplayedImg(imgs.photos[currentPicIndex - 1]), setNextPicIndex(imgs.photos.length - 1), setPrevPicIndex(currentPicIndex - 1))
        }
    }   




    // nastavi index o 1 vyssi a najde obrazok podla neho v poli
    const handleNextPic = index => {
        // ak sme na zaciatku prva current bude 0 dalsia 1 a predosla - 1
        if(index == 0) {
            setDisplayedImg(imgs.photos[1], setCurrentPicIndex(1), setNextPicIndex(2), setPrevPicIndex(0))
        
        } else if(index > 0 && index < imgs.photos.length - 1 && nextPicIndex < imgs.photos.length - 1) {
            // ak sme v strede a posuvame sa dopredu
            setCurrentPicIndex(currentPicIndex + 1, setDisplayedImg(imgs.photos[currentPicIndex + 1]), setCurrentPicIndex(currentPicIndex + 1), setNextPicIndex(currentPicIndex + 2), setPrevPicIndex(nextPicIndex - 1))
        
        } else if (nextPicIndex >= imgs.photos.length - 1) {
            // ak sme na konci vratime sa na zaciatok
            setDisplayedImg(imgs.photos[imgs.photos.length - 1], setCurrentPicIndex(imgs.photos.length - 1), setNextPicIndex(0), setPrevPicIndex(currentPicIndex))
        } else if (currentPicIndex >= imgs.photos.length - 1 ) {
            setDisplayedImg(0, setCurrentPicIndex(0), setNextPicIndex(1), setPrevPicIndex(imgs.photos.length - 1))
        }
}





    const closePreview = () => {
        setDisplayedImg(null)
        closeOverlay()
    }

    return (
        <div className="content">
        {
            imgs && (
                <div>

            <h1 className="text-4xl text-white">{imgs.name}</h1>
               
            <ul className="flex flex-wrap justify-center">
                {
                    imgs.photos.map(i => {
                        return <Thumbnail key={i.id}
                        showID={handleShowID}
                        picID={i.id}
                        galleryID={id}
                        picCategory={imgs.name}
                        name={i.title}
                        bg={i.image} 
                        galleryThumb={false}
                        showOverlay={props.handleShowOverlay}
                        />
                    })
                }
            </ul>

                {
                    imageID && displayedImg && (
                        <div>
                            <div>
                                {
                                    imgs && imgs.photos.length - 1 > 1 && (
                                        <div>
                                            <Link to={`/gallery/${id}/${imgs.photos[prevPicIndex].id}`} onClick={() => handlePrevPic(currentPicIndex)} className=" fixed text-3xl text-gray-200 z-40 left-6" style={{ top: '50%'}}>
                                                <svg width="35px" height="35px" viewBox="0 0 443.52 443.52" fill="gray" >
                                                    <g>
                                                        <g>
                                                            <path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8
                                                                c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712
                                                                L143.492,221.863z"/>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </Link>
                                            <Link to={`/gallery/${id}/${imgs.photos[nextPicIndex].id}`} onClick={() => handleNextPic(currentPicIndex)} className=" fixed text-3xl text-gray-200 z-40 right-6" style={{ top: '50%'}}>
                                                <svg  width="35px" height="35px" viewBox="0 0 240.823 240.823" fill="gray">
                                                    <g>
                                                        <path id="Chevron_Right_1_" d="M183.189,111.816L74.892,3.555c-4.752-4.74-12.451-4.74-17.215,0c-4.752,4.74-4.752,12.439,0,17.179
                                                            l99.707,99.671l-99.695,99.671c-4.752,4.74-4.752,12.439,0,17.191c4.752,4.74,12.463,4.74,17.215,0l108.297-108.261
                                                            C187.881,124.315,187.881,116.495,183.189,111.816z"/>
                                                    </g>
        
                                                </svg>
                                            </Link>
                                        </div>
                                    )
                                }
                                <Link to={`/gallery/${id}`} onClick={closePreview} className=" fixed text-3xl text-gray-200 z-40 top-6 right-6">X</Link>
                            </div>
                            <div className="fixed z-20 " style={{ left: '50%', transform: 'translate(-50%, -40%)', top: '41%'}}>
                                <div className="border-gray-200 border-4"  >
                                    <img src={displayedImg.image} style={{maxHeight: imgHeight}} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    {
                                        displayedImg.title && <h2 className="text-2xl text-white font-bold flex justify-center">{ displayedImg.title }</h2>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                )
                }
        </div>
    )
}

export default Images