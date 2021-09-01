import { connect } from 'react-redux'


const Shade = (props) => {

  const handleClick = () => {
    props.onClick()
  }

  return (
    <div
      className={`shade ${!props.visibility && 'shade__hidden'}`}
      onClick={handleClick}
    >
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Shade)
