import React from 'react'
import '../index.css'

function InputField(props) {
    return (
            <input
            className='input_field'
                placeholder={props.placeholder}
                type='text'
                name={props.name}
                onChange={props.onChange}
            />
    )
}

export default InputField
