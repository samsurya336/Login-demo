import {useRef} from 'react'
import useToDo from '../../hooks/useToDo'
import InputField from '../../components/InputField';
import './homeScreenStyles.css'

export default function HomeScreen() {

    const [ toDos, addToDo, removeToDo, markToDo ] = useToDo();

    const titleRef = useRef('')

    return (
        <div style={{marginTop:'50px'}}>

            <h1 className='home_screen_title'>To Do List </h1>

            <InputField 
                placeholder={'Title'}
                name={'title'}
                value={titleRef.current}
                onChange={(e)=>{
                    titleRef.current = e.target.value;
                }}
            />

            <button 
                className='add_todo_button'
                onClick={()=>{
                    if(titleRef.current.trim().length !== 0){
                        addToDo(titleRef.current)
                    }
                }}
            >Add To Do 
            </button>

            <ToDoList toDos={toDos} removeToDo={removeToDo} markToDo={markToDo} />
        </div>
    )
}


function ToDoList(props){

    if(props.toDos.length !== 0){
        return(
            <div>
                {  
                    props.toDos.map((data,index) => {
                        return(
                            <ToDoTile data={data} key={index} index={index} removeToDo={props.removeToDo} markToDo={props.markToDo} />
                        )
                    })
                }
            </div>
        );
    }else{
        return(
            <h4> click To Add Your ToDos </h4>
        )
    }

}


function ToDoTile(props){
    return(
            <div 
                className='todo_Tile_wrapper' 
            >   
            {
                props.data.isDone &&
                <p style={{color:'green'}}> Marked as Done </p> 
            }
                <h3> {props.data.title} </h3>
                <button className='markAsDone_btn' onClick={()=>props.markToDo(props.index)} >
                    {
                        props.data.isDone ?
                        'Un Mark'
                        : 'Mark as Done'
                    }
                </button>
                <button className='delete_btn' onClick={()=>props.removeToDo(props.index)} > Delete</button>
            </div>
    );
}



