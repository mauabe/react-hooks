import React, { useState, useEffect, useReducer } from 'react';
import uuid from 'uuid/v4';

const initialTasksState ={
  tasks: [],
  completedTasks: []
};

const TYPES = {
  ADD_TASK: 'ADD_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

const taskReducer = (state, action) => {
  console.log('state', state, 'action', action);

  switch(action.type){
    case TYPES.ADD_TASK: 
      return {
        ...state, 
        tasks: [...state.tasks, action.task]
    };
    case TYPES.COMPLETE_TASK:
      const { compTask } = action;
      return {
        ...state,
        completedTasks: [...state.completedTasks, compTask],
        tasks: state.tasks.filter(t => t.id !== compTask.id)
      }
    case TYPES.DELETE_TASK:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(t => t.id !== action.task.id)
      }
    default: return state;
  }
};

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';

const storeTasks = (taskMap) => {
  localStorage.setItem (
    TASKS_STORAGE_KEY,
    JSON.stringify(taskMap)
  );
}

const readStoredTasks = () => {
  const tasksMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY));
  return tasksMap ? tasksMap : initialTasksState;
}

function Tasks(){
  const [taskText, setTaskText] = useState('');
  const storedTasks = readStoredTasks();

  const [state, dispatch] = useReducer(taskReducer, storedTasks);
  const { tasks, completedTasks} = state; 

  useEffect(() =>{
    storeTasks({ tasks, completedTasks })
  });

  const updateTaskText= event => {
    setTaskText(event.target.value);
  }

  const addTask = () => {
    dispatch({ type: TYPES.ADD_TASK, task: { taskText, id: uuid() } });
  }

  const handleKeyPressTasks = event => {
    if(event.key === 'Enter') {
      addTask();
    }
  }

  const completeTask = compTask => () => {
    dispatch({ type: TYPES.COMPLETE_TASK, compTask });
      }

  const deleteTask = task => () => {
    dispatch({ type: TYPES.DELETE_TASK, task });
  }

  console.log('tasks', tasks);
  console.log('completedTasks', completedTasks);
 

  return (
    <div>
      <h3>Tasks</h3>
      <div className='form'>
        <input value={taskText} onChange={updateTaskText} onKeyPress={handleKeyPressTasks} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='task-list'>
        {
          tasks.map(task => {
            const { id, taskText } = task;
            return (
            <div key={id} onClick={completeTask(task)}>
              {taskText}
            </div>
            );
          })
        }
      </div>
      <div className='completed-list'>
        {
          completedTasks.map(task => {
            const {id, taskText } = task;
            
            return (
              <div key={id}>{taskText}
              <span onClick={deleteTask(task)} className='delete-task'> x</span></div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Tasks;
