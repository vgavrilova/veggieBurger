import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import style from './Auth.module.css';


class Auth extends Component {
    state = {
        ctrls: {
            email: {
                inputType: 'input',
                inputConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                value: '',
                validation: {
                    required: true,
                    mail: true
                },
                valid: false,
                touched: false
            },
            password: {
                inputType: 'input',
                inputConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = (value.length >= rules.minLength) && isValid;
        }
        if(rules.mail){
            //isValid = value.includes('@') && isValid;
            const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }
    onChangeHandler = (e, identifier) => {
        
        // we need to change objects, otherwise we're creating only pointers to them
        //console.log(e.target.value);
        const form = {
            ...this.state.ctrls
        };
        const formIds = {
            ...form[identifier],
            value: e.target.value,
            touched: true,
            valid: this.checkValidity(e.target.value, this.state.ctrls[identifier].validation)
        };

        form[identifier] = formIds;


        let formIsValid = true;
        // set formIsValid to true
        // only if the previous AND the current element is true
        for(let identifier in form){
            formIsValid = form[identifier].valid && formIsValid;
        }
        
        //console.log(formIds.valid);
        this.setState({
            ctrls: form,
            formIsValid: formIsValid
        });
    }

    render(){
        const formArr = [];
        for (let key in this.state.ctrls){
            formArr.push({
                config: this.state.ctrls[key],
                id: key
            })
        }

        const inputFields = formArr.map(field => {
            return <Input 
                    inputType={field.config.inputType} 
                    inputConfig={field.config.inputConfig} 
                    value={field.config.value} 
                    key={field.id}
                    changed={(e) => this.onChangeHandler(e, field.id)}
                    invalid={!field.config.valid }
                    touched={field.config.touched}
                    shouldValidate={field.config.validation}
                    valueType={field.id}
                     />
                     
        });
        

        return(
            <div className={style.Auth}>
                <form>
                    {inputFields}
                    <Button btnType="Success">Log in</Button>

                </form>

            </div>
        );
    }
}


export default Auth; 