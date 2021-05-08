import React from 'react'

const Input = props => {
    const { inputType, type, name, placeholder, changeVal, value, err, height } = props

    let inType = null 


    switch(inputType) {
        case 'input' :
            inType = <input type={type} name={name} placeholder={placeholder} onChange={changeVal} 
            className="w-full focus:outline-none p-2 border-b-2 border-gray-800 mb-5" value={value}/>
            break
        case 'textarea': 
            inType = <textarea type={type} name={name} placeholder={placeholder} onChange={changeVal} 
                    className="w-full focus:outline-none p-2 border-b-2 border-gray-800 mb-5" value={value}
                    style={{ height: height}}
                    ></textarea>
            break
        case 'file':
            inType = <input type={type} name={name} onChange={changeVal} className="block" />
            break
        }


    return (
        <div>
            { inType }
            { err && <span className="font-bold text-red-600">{err}</span> }
        </div>
    )
}

export default Input