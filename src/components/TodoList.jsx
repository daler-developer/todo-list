import 'scss/index.scss'

import { connect } from 'react-redux'
import CreateTaskWindow from './CreateTaskWindow'
import EditTaskWindow from './EditTaskWindow'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import { loadTasksFromStorage } from 'redux/features/tasksReducer'
import { useEffect } from 'react'


const TodoList = (props) => {
  
  useEffect(() => {
    props.loadTasksFromStorage()
  }, [])

  return (
    <div className={'todo-list'}>

      <CreateTaskWindow />
      <EditTaskWindow />

      <Header />
      <Main />
      <Footer />

    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  loadTasksFromStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
