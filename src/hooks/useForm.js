import { useState } from "react"

export const useForm = (initialState={}) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newFormState = initialState) => {
        setValues(newFormState);
    }

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    //target.name apunta al valor de name= por lo que es name,email,password

    return [values,handleInputChange,reset]
}