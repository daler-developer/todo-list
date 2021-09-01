import { connect } from "react-redux"
import Task from "./Task"


const Tasks = (props) => {
  return (
    <ul className={'tasks'}>
      {props.tasks.map(task => (
        <Task
          key={task.id}
          task={task}
        />
      ))}
    </ul>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
