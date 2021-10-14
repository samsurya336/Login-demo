
import {useState, useContext } from 'react'
import { UserDetailsContext } from '../contexts/UserDetailsContext'

export default function useAuth() {

    const [result, setResult] = useState({})

    const userContext = useContext(UserDetailsContext)


    const navigateUser = (obj) => {
        setTimeout(() => {
            userContext.toggleLogin(obj);
        }, 1500);
    }

    const loginUser = (userName,pwd) => {
        const value = window.localStorage.getItem(userName);

        if (value != null){
            const obj = JSON.parse(value)
            if(obj.pwd === pwd){

                setResult({
                    status: true,
                    msg: 'Logging U In',
                    data: obj,
                })

                navigateUser(obj)

            }else{

                setResult({
                    status: false,
                    msg: 'Password Does not Match'
                })

            }

        }else{
                setResult({
                    status: false,
                    msg: 'Un Registered User'
                })
        }
    }


    const registerUser = (userName,pwd) => {

        const jsonValue = window.localStorage.getItem(userName);

        if (jsonValue === null){

            const obj = JSON.stringify({
                userName: userName,
                pwd: pwd,
                toDos: [],
            })
            
            window.localStorage.setItem(userName,obj);

            setResult({
                status: true,
                msg: 'User Registered',
                data: obj,
            })

            navigateUser({
                userName: userName,
                pwd: pwd,
                toDos: [],
            })


        }else{
            
            setResult({
                status: false,
                msg: 'Already Registered User'
            })
        }
    }


    return [result, loginUser, registerUser]
}
