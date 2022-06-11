import { useState } from "react";

//Lo que hace este custom hook es leer el valor de un campo cuando cambia
//Establecer un nuevo estado con la funcion handleInputChange
//Resetear el formulario

const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState(initialState);

    const reset = ( newState = initialState ) =>{
        setValues(newState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };

    return [values, handleInputChange,reset];
}

export default useForm