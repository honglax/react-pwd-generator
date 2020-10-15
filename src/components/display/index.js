import React, { useState, useRef } from 'react'
import './Display.scss'
import Container from '../container/'
import Button from '../container/button'
import Tooltip from '../container/tooltip'
import { generatePassword, copyToClipBoard } from '../../utils/Helper'

const Display = () => {
  const [password, setPassword] = useState('')
  const [rangeValue, setRange] = useState()
  const [passwordProps, setPasswordProps] = useState()
  const [tooltip, setTooltip] = useState(false)

  const passwordRef = useRef(null)
  const pwdStrength = {
    badPassword: {
      range: [0, 5],
      description: 'Bad password',
      bgColor: '#cb473e',
    },
    weakPassword: {
      range: [6, 10],
      description: 'Weak password',
      bgColor: '#f07d58',
    },
    strongPassword: {
      range: [10, Number.MAX_VALUE],
      description: 'Strong password',
      bgColor: '#55a95d',
    },
  }

  let pwdDescription

  const isNumberBetween = (num, [min, max]) => {
    return num >= min && num <= max
  }

  const setBackgroundColor = (password) => {
    const pwdLength = password ? password.length : 0
    const pwdStrengthArr = Object.values(pwdStrength)

    for (let i = 0, arrLength = pwdStrengthArr.length; i < arrLength; i++) {
      if (isNumberBetween(pwdLength, pwdStrengthArr[i].range)) {
        pwdDescription = pwdStrengthArr[i].description
        return pwdStrengthArr[i].bgColor
      }
    }
  }

  const copyClipBoard = () => {
    copyToClipBoard(passwordRef.current)
    setTooltip(true)
    setTimeout(() => {
      setTooltip(false)
    }, 2000)
  }

  const generatenewPassword = () => {
    setPassword(
      generatePassword(passwordProps, rangeValue > 3 ? rangeValue : 3)
    )
  }

  return (
    <React.Fragment>
      <div className='row'>
        <div
          className='col-12 password-display-container'
          style={{ backgroundColor: setBackgroundColor(password) }}
        >
          <div style={{ width: '100%' }}>
            <div className='password-display'>
              <input
                type='text'
                className='password-display-input'
                ref={passwordRef}
                value={password}
                readOnly
              />
            </div>
            <div className='password-description'>
              <i
                className={'fas'.concat(
                  password && password.length > 10
                    ? ' fa-check-circle'
                    : ' fa-exclamation-circle'
                )}
              ></i>
              <span style={{ marginLeft: '15px' }}>{pwdDescription}</span>
            </div>
          </div>
          <div className='password-display-icons'>
            <Button
              className='copy-btn'
              iconClass='far fa-copy'
              handleClick={copyClipBoard}
            />
            <Button
              className='generate-btn'
              iconClass='fas fa-sync-alt'
              handleClick={generatenewPassword}
            />
            <Tooltip
              message='Copied'
              position='left'
              displayTooltip={tooltip}
            />
          </div>
        </div>
      </div>
      <Container
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
      />
    </React.Fragment>
  )
}

export default Display
