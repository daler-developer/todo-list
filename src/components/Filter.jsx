import { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { selectFilter, setFilter } from 'redux/features/uiReducer'


const Filter = (props) => {
  const [dropdownOpened, setDropdownOpened] = useState(false)

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!document.querySelector('.filter__select').contains(e.target)) {
        setDropdownOpened(false)
      }
    })
  }, [])

  const selectOptions = [
    { filter: 'all', content: 'All' },
    { filter: 'completed', content: 'Completed' },
    { filter: 'not_completed', content: 'Not completed' },
  ]

  const toggleDropdownOpened = () => setDropdownOpened(!dropdownOpened)

  const changeFilter = (to) => {
    props.setFilter({ to })
    setDropdownOpened(false)
  }

  return (
    <div className={'filter'}>

      <div className={'filter__select'}>
        <button
          type={'button'}
          className={'filter__select-btn'}
          onClick={toggleDropdownOpened}
        >
          <span className={'filter__select-btn-text'}>
            {selectOptions.find(o => o.filter === props.filter).content}
          </span>
          <span
            className={`filter__arrow-icon material-icons-outlined ${dropdownOpened ? 'filter__arrow-icon--rotated' : ''}`}
          >
            expand_more
          </span>
        </button>
        <ul className={`filter__dropdown ${!dropdownOpened && 'filter__dropdown--hidden'}`}>
          {selectOptions.map((option) => (
            <li
              key={option.filter}
              className={`filter__dropdown-item ${props.filter === option.filter ? 'filter__dropdown-item--selected' : ''}`}
              onClick={() => changeFilter(option.filter)}
            >
              {option.content}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => ({
  filter: selectFilter(state)
})

const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
