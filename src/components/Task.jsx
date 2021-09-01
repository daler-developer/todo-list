import { nanoid } from "@reduxjs/toolkit"
import { useRef } from "react"
import { connect } from "react-redux"
import { deleteTask, toggleCompleted } from "redux/features/tasksReducer"
import { toggleEditTaskWindowVisibility, toggleSelectedEditingTaskId } from "redux/features/uiReducer"


const Task = (props) => {
  const { task } = props

  const taskRef = useRef(null)
  const checkboxRef = useRef(null)

  const openEditTaskWindow = () => {
    props.toggleEditTaskWindowVisibility()
    props.toggleSelectedEditingTaskId({ taskId: task.id })
  }

  const toggleCompleted = (e) => {
    props.toggleCompleted({ taskId: task.id })
  }

  const deleteTask = () => {
    taskRef.current.classList.add('task--scale-down')
    setTimeout(() => {
      props.deleteTask({ taskId: task.id })
    }, 400);
  }

  return (
    <li className={'task'} ref={taskRef}>

      <label className={'task__left'} htmlFor={task.id}>
        <input
          id={task.id}
          type={'checkbox'}
          checked={task.completed}
          onChange={toggleCompleted}
          ref={checkboxRef}
          hidden
        />
        <div
          className={'task__custom-checkbox'}
        >
          {task.completed ? (
            <span className={"task__completed-icon material-icons"}>
              done
            </span>
          ) : (
            <span className={"task__not-completed-icon material-icons"}>
              close
            </span>
          )}
        </div>
        <span className={`task__text ${task.completed && 'task__text--completed'}`}>
          {task.text}
        </span>
      </label>

      <div className={'task__actions'}>
        <button
          type={'button'}
          className={'task__action-btn'}
          onClick={openEditTaskWindow}
        >
          <span className={"task__edit-icon material-icons"}>
            edit
          </span>
        </button>
        <button
          type={'button'}
          className={'task__action-btn'}
          onClick={deleteTask}
        >
          <span className={"task__delete-icon material-icons"}>
            delete
          </span>
        </button>
      </div>

    </li>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  deleteTask,
  toggleEditTaskWindowVisibility,
  toggleSelectedEditingTaskId,
  toggleCompleted
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
