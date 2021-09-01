import { useRef } from 'react'
import { connect } from 'react-redux'
import { selectAllTasks, selectTasksByCompleted, deleteCompletedTasks } from 'redux/features/tasksReducer'


const Footer = (props) => {
  const btnRef = useRef(null)

  const deleteCompletedTasks = () => {
    props.deleteCompletedTasks()

    // btnRef.current.classList.add('footer__delete-btn--pressed')
    // btnRef.current.addEventListener('animationend', (e) => {
    //   e.target.classList.remove('footer__delete-btn--pressed')
    // })
  }

  const clearAnimClasses = (target) => {
    target.classList.remove('footer__delete-btn--scale-up')
    target.classList.remove('footer__delete-btn--scale-down')
  }

  const scaleDown = (e) => {
    clearAnimClasses(e.target)
    e.target.classList.add('footer__delete-btn--scale-down')
  }

  const scaleUp = (e) => {
    clearAnimClasses(e.target)
    e.target.classList.add('footer__delete-btn--scale-up')
  }

  const completed = props.completedCount === props.length

  return (
    <footer className={'footer'}>
      <span className={`footer__stat ${completed ? 'footer__stat--completed' : 'footer__stat--not-completed'}`}>
        Completed: {props.completedCount}/{props.length}
      </span>
      <button
        type={'button'}
        className={'footer__delete-btn'}
        onClick={deleteCompletedTasks}
        onMouseDown={scaleDown}
        onMouseUp={scaleUp}
        ref={btnRef}
      >
        Delete completed
      </button>
    </footer>
  )
}

const mapStateToProps = (state) => ({
  completedCount: selectTasksByCompleted(state).length,
  length: selectAllTasks(state).length
})

const mapDispatchToProps = {
  deleteCompletedTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
