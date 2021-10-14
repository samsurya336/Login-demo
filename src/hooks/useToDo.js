import {useState, useContext, useEffect } from 'react'
import { UserDetailsContext } from '../contexts/UserDetailsContext'


function useToDo() {
    const userContext = useContext(UserDetailsContext)

    const [toDos, setToDos] = useState([])

    useEffect(() => {

        const value = window.localStorage.getItem(userContext.userData.data.userName);

        const obj = JSON.parse(value)

        setToDos(obj.toDos)

    }, [userContext])


    const addToDo = (title) => {

        const newToDos = [...toDos,{title:title,isDone:false}];

        const newObj = {
            ...userContext.userData.data,
            toDos: [...newToDos]
        }

        
        window.localStorage.setItem(userContext.userData.data.userName,JSON.stringify(newObj))

        setToDos([...toDos,{title:title,isDone:false}])
    }
    

    const removeToDo = (index) => {

        const newToDos = toDos.filter((_,i)=> i!==index);

        const newObj = {
            ...userContext.userData.data,
            toDos: [...newToDos]
        }

        
        window.localStorage.setItem(userContext.userData.data.userName,JSON.stringify(newObj))
        
        setToDos([...newToDos])
    }


    const markToDo = (index) => {

        const oldList = toDos;
        oldList[index].isDone = !toDos[index].isDone;

        const newObj = {
            ...userContext.userData.data,
            toDos: [...oldList]
        }

        
        window.localStorage.setItem(userContext.userData.data.userName,JSON.stringify(newObj))
        
        setToDos([...oldList])
    }

    return [ toDos, addToDo, removeToDo, markToDo ]
}

export default useToDo
