import { connect } from 'react-redux'
import { selectSearchText, setSearchText } from 'redux/features/uiReducer'


const Search = (props) => {
  return (
    <div className={'search'}>
      <span className="search__search-icon material-icons-outlined">
        search
      </span>
      <input
        className={'search__input'}
        value={props.value}
        onChange={(e) => props.setSearchText({ value: e.target.value })}
        placeholder={'Search'}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  value: selectSearchText(state)
})

const mapDispatchToProps = {
  setSearchText
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
