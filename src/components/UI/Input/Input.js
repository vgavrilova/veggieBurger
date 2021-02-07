import React from 'react';

import style from './Input.module.css';


const input = (props) => {

    let inputType = null;
    const inputClasses = [style.InputEl];
    let errorMessage = null; 

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(style.Invalid);
        errorMessage = <p className={style.ValidationError}>Please enter a valid {props.valueType}! 
        {props.valueType === 'password' ? ' It should be at least 6 characters long' : null}</p>
                       
    }

    switch (props.inputType){
        case 'input':
            inputType = <input 
                            className={inputClasses.join(' ')} 
                            {...props.inputConfig} 
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
        case 'textarea':
            inputType = <textarea 
                            className={inputClasses.join(' ')} 
                            {...props.inputConfig} 
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
        case 'select':
            inputType = (
                <select
                onChange={props.changed} 
                className={inputClasses.join(' ')}
                value={props.value}>
                    {
                        props.inputConfig.options.map(option => (
                        <option 
                            value={option.value}
                            key={option.value}
                        >{option.displayValue}</option>
                        ))
                    }
                </select>
                );
                break;
        default: 
            inputType = <textarea 
                            className={inputClasses.join(' ')} {...props.inputConfig} 
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
    }

    return (
        <div className={style.Input}>
            <label className={style.Label}>{props.label}</label>
            {inputType}
            {errorMessage}
        </div>
    );
}


export default input;