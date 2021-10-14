import React , {useRef, useState} from 'react'
import './authScreenStyles.css'
import '../../index.css'
import InputField from '../../components/InputField'
import useAuth from '../../hooks/useAuth'


function AuthScreen() {


    const [result, loginUser, registerUser] = useAuth();

    const [error, setError] = useState(false)

    const inputRef = useRef({name:'',password:''})

    const onChange = (e) => {
        inputRef.current[e.target.name] = e.target.value;
    }

    const isInputChecked = () => {
        if(result.status !== undefined){
            return true;
        }else{
            return false;
        }
    }


    const authUser = (isLogin) => {

        let error = false;

        if(
            inputRef.current.name !== null && inputRef.current.name.trim().length !== 0 
            && inputRef.current.password !== null && inputRef.current.password.trim().length !== 0
        ){
            console.log('Allowed To Log')
            error = false;
        }else{
            console.log('Not Allowed To Log')
            error = true;
        }


        if(!error){

            if(isLogin){
                loginUser(inputRef.current.name,inputRef.current.password);
            }else{
                registerUser(inputRef.current.name,inputRef.current.password);
            }


        }else{
            setError(error)
        }


    }



    return (
        <div className='auth_screen_wrapper'>

            <div className="auth_card">
                
                <h3> LOGIN DEMO </h3>

                <InputField 
                    placeholder={'Name'}
                    name={'name'}
                    onChange={onChange}
                    value={inputRef.current.name}
                    error={null}
                />
                <InputField 
                    placeholder={'Password'}
                    name={'password'}
                    value={inputRef.current.password}
                    onChange={onChange}
                />
                
                {
                    error && 
                    <p className='input_field_error'> Fill All Feilds </p>

                }

                <button className='auth_screen_button' onClick={()=>authUser(true)}>LOGIN</button>
                
                <button className='auth_screen_button register'onClick={()=>authUser(false)}>REGISTER</button>

                <input
                    type='checkbox'
                    id='errorToggle'
                    style={{ display:'none' }}
                    checked={isInputChecked()}
                    onChange={(e)=>{}}
                />
                <div className='auth_status' style={{backgroundColor: `${result.status ? 'green' : 'red'}` }}
                    
                >{result.msg}</div>
            </div>
        </div>
    )
}


export default AuthScreen
