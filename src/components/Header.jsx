import { connect } from "react-redux"
import { toggleCreateTaskWindowVisibility } from "redux/features/uiReducer"

const Header = (props) => {

  const openCreateTaskWindow = () => {
    props.toggleCreateTaskWindowVisibility()
  }

  return (
    <header className={'header'}>
      <h1 className={'header__title h3'}>Todo-List</h1>
      <div className={'header__right'}>
        <button
          type={'button'}
          className={'header__add-btn'}
          onClick={openCreateTaskWindow}
        >
          <span className={"header__add-icon material-icons"}>
            add
          </span>
        </button>
      </div>
    </header>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  toggleCreateTaskWindowVisibility,

}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
