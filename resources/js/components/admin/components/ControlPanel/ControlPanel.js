import React from 'react'

const ControlPanel = props => {
    return (
        <div className="flex flex-col mobile:flex-row">
                <button className="mobile:self-start self-auto py-2 px-4 bg-green-600 rounded-md text-white text-xl mb-2 mobile:mr-2" onClick={ props.toggleEditing}>{ props.editing ? 'Cancel' : 'Edit' }</button>
                
                { 
                !props.editing && <button className="mobile:self-start self-auto py-2 px-4 bg-red-600 rounded-md text-white text-xl mb-2" onClick={props.delete}>Delete</button>
                }
                {
                    props.editing ? <button className="mobile:self-start self-start py-2 px-4 bg-blue-700 text-white text-xl rounded-md" onClick={props.submitForm}>Submit changes</button> : null
                }
            </div>
    )
}

export default ControlPanel