import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {  toggleSelectedEditingTaskId ,selectEditTaskWindowVisibility, selectSelectedEditingTaskId, toggleEditTaskWindowVisibility } from 'redux/features/uiReducer'
import Shade from './Shade'
import { editTask } from 'redux/features/tasksReducer'
import { useRef } from 'react'


const EditTaskWindow = (props) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (props.visibility) {
      inputRef.current.focus()
    }
  }, [props.visibility])

  const editText = (e) => {
    e.preventDefault()

    if (!text.trim()) return setError(true)

    props.editTask({ taskId: props.taskId, newText: text })
    
    closeWindow()
  }

  const closeWindow = () => {
    setText('')
    setError(false)
    props.toggleEditTaskWindowVisibility()
    props.toggleSelectedEditingTaskId({ taskId: null })
  }

  return <>
    <div className={`edit-task-window ${!props.visibility && 'edit-task-window--hidden'}`}>
      <div className={'edit-task-window__header'}>
        <h2 className={'edit-task-window__title h4'}>Edit Task</h2>
        <button type={'button'} className={'edit-task-window__close-btn'} onClick={closeWindow}>
          <span className="edit-task-window__close-icon material-icons-outlined">
            close
          </span>
        </button>
      </div>
      <form className={'edit-task-window__form'} onSubmit={editText}>
        <div className={`edit-task-window__text-input-wrapper ${error && 'edit-task-window__text-input-wrapper--error'}`}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={'edit-task-window__text-input'}
            placeholder={'New text'}
            ref={inputRef}
          />
        </div>
        <button
          type={'submit'}
          className={'edit-task-window__submit-btn'}
        >
          Edit Task
        </button>
      </form>
    </div>
    <Shade 
      visibility={props.visibility}
      onClick={closeWindow}
    />
  </>
}

const mapStateToProps = (state) => ({
  visibility: selectEditTaskWindowVisibility(state),
  taskId: selectSelectedEditingTaskId(state)
})

const mapDispatchToProps = {
  toggleEditTaskWindowVisibility,
  editTask,
  toggleSelectedEditingTaskId
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskWindow)
