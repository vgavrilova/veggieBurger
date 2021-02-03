import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';


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
        isSignUp: true,
        formIsValid: false
    }

    // redirect users from the authentication page
    // if his/her burger was already built 
    componentDidMount(){
        if(this.props.buildingBurger && this.props.redirectPath !== '/'){
            this.props.onPathRedirectHandler();
        }
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
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.ctrls.email.value, this.state.ctrls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        })
    }

    

    render(){
        const formArr = [];
        for (let key in this.state.ctrls){
            formArr.push({
                config: this.state.ctrls[key],
                id: key
            })
        }

        let inputFields = formArr.map(field => {
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
        if (this.props.loading && this.props.error == null){
            inputFields = <Spinner />;
        };

        let errorMessage = null;
        if (this.props.error){
            errorMessage = <p 
            style={{color: 'red', backgroundColor: '#fce4e4', border: '1px solid #fcc2c3', padding: '5px'}}>
                {this.props.error.message}</p>;
        };

        // redirect depending on the burger was being changed/built or not
        let redirectLogged = null;
        if (this.props.isLoggedIn){
            redirectLogged = <Redirect to={this.props.redirectPath} />
        }
    
        return(
            <div className={style.Auth}>
                {redirectLogged}
                <form onSubmit={(e) => this.onSubmitHandler(e)}>
                    {errorMessage}
                    {inputFields}
                    <Button btnType='Success'>{this.state.isSignUp ? 'Sign Up' : 'Log In'}</Button>

                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType='Danger'>Switch to {this.state.isSignUp ? 'Log In' : 'Sign Up'}</Button>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.token !== null,
        authPath: state.auth.authPath,
        buildingBurger: state.auth.bulding,
        redirectPath: state.auth.authPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authAction(email, password, isSignUp)),
        onPathRedirectHandler: () => dispatch(actions.setAuthPath('/'))
    };
    
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth); 