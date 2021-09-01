import { connect } from 'react-redux'
import { selectAllTasks, selectTasksByFilterAndTextIncluded, selectTasksByTextIncluded } from 'redux/features/tasksReducer'
import { selectFilter, selectSearchText } from 'redux/features/uiReducer'
import Filter from './Filter'
import Search from './Search'
import Tasks from './Tasks'


const Main = (props) => {
  return (
    <main className={'main'}>

      <div className={'main__top'}>
        <Search />
        <Filter />
      </div>

      <Tasks tasks={props.filteredTasks} />

      {props.allTasks.length !== 0 && props.filteredTasks.length  === 0 && (
        <div className={'main__warning'}>
          Not found
        </div>
      )}
      
      {props.allTasks.length === 0 && (
        <div className={'main__warning'}>
          No tasks
        </div>
      )}

    </main>
  )
}

const mapStateToProps = (state) => ({
  allTasks: selectAllTasks(state),
  filteredTasks: selectTasksByFilterAndTextIncluded(
    state,
    selectFilter(state),
    selectSearchText(state)
  )
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
