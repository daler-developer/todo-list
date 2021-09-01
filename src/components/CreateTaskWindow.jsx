import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { selectCreateTaskWindowVisibility, toggleCreateTaskWindowVisibility } from 'redux/features/uiReducer'
import { createTask } from 'redux/features/tasksReducer'
import Shade from './Shade'
import { useRef } from 'react'

const CreateTaskWindow = (props) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (props.visibility) {
      inputRef.current.focus()
    }
  }, [props.visibility])

  const createTask = (e) => {
    e.preventDefault()

    if (!text.trim()) return setError(true)

    props.createTask({ text: text.trim() })
    
    closeWindow()
  }

  const closeWindow = () => {
    setText('')
    setError(false)
    props.toggleCreateTaskWindowVisibility()
  }

  return <>
    <div className={`create-task-window ${!props.visibility && 'create-task-window--hidden'}`}>
      <div className={'create-task-window__header'}>
        <h2 className={'create-task-window__title h4'}>Create Task</h2>
        <button
          onClick={closeWindow}
          className={'create-task-window__close-btn'}
          type={'button'}
        >
          <span className="create-task-window__close-icon material-icons-outlined">
            close
          </span>
        </button>
      </div>
      <form className={'create-task-window__form'} onSubmit={createTask}>
        <div className={`create-task-window__text-input-wrapper ${error && 'create-task-window__text-input-wrapper--error'}`}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={'create-task-window__text-input'}
            placeholder={'Task'}
            ref={inputRef}
          />
        </div>
        <button
          type={'submit'}
          className={'create-task-window__submit-btn'}
        >
          Create
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
  visibility: selectCreateTaskWindowVisibility(state)
})

const mapDispatchToProps = {
  toggleCreateTaskWindowVisibility,
  createTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskWindow)
