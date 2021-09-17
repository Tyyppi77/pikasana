import React, { useState } from 'react'

const useField = (type, onChangeCallback) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
        onChangeCallback(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return [{
        type,
        value,
        onChange,
    }, reset]
}

export default useField
