import React from 'react'

const Image = props => {

    return (
        <div>
            {/*
                props.displayedImg && (

                    <div>
                        <div>
                            <Link to={`/gallery/${props.displayedImg.id}`} onClick={props.lastPic} className=" fixed text-3xl text-gray-200 z-40 left-6" style={{ top: '50%'}}>Prev</Link>
                            <Link to={`/gallery/${props.displayedImg.id}`} onClick={props.nextPic} className=" fixed text-3xl text-gray-200 z-40 right-6" style={{ top: '50%'}}>Next</Link>
                            <Link to={`/gallery/`} onClick={props.close} className=" fixed text-3xl text-gray-200 z-40 top-6 right-6">X</Link>
                        </div>
                        <div className="fixed z-20" style={{ left: '50%', transform: 'translate(-50%, -40%)', top: '41%'}}>
                            <div className="border-gray-200 border-4"  >
                                <img src={props.displayedImg.image} style={{ maxHeight: '35rem'}} />
                            </div>
                        </div>
                    </div>
                )
                */}
        </div>
    )
}
export default Image