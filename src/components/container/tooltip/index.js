import React from 'react'
import PropTypes from 'prop-types'
import './Tooltip.scss'

const Tooltip = (props) => {
  const { message, position, displayTooltip } = props
  return (
    <React.Fragment>
      {displayTooltip ? (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className='tooltip-message'>{message}</div>
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  displayTooltip: PropTypes.bool.isRequired,
}

export default Tooltip
