import React, { useState, useEffect } from 'react'
import Slider from './slider'
import Checkbox from './checkbox'
import './Container.scss'
import { generatePassword, setPasswordLength } from '../../utils/Helper'

const CHECKBOX_LIST = [
  {
    id: 0,
    name: 'uppercase',
    label: 'Uppercase',
    isChecked: true,
  },
  {
    id: 1,
    name: 'lowercase',
    label: 'Lowercase',
    isChecked: true,
  },
  {
    id: 2,
    name: 'symbols',
    label: 'Symbols',
    isChecked: true,
  },
  {
    id: 3,
    name: 'numbers',
    label: 'Numbers',
    isChecked: true,
  },
]

const Container = (props) => {
  const [rangeValue, setRangeValue] = useState(12)
  const [minMaxValue] = useState({
    min: 1,
    max: 60,
  })
  const [checkbox, setCheckBox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  })
  const [checked, setChecked] = useState(false)
  const [checkedName, setCheckedName] = useState('')

  const { min, max } = minMaxValue
  const { uppercase, lowercase, symbols, numbers } = checkbox

  const { setPassword, setRange, setPasswordProps } = props

  useEffect(() => {
    setPasswordLength(rangeValue)
    setRange(rangeValue)
    setRangeValue(rangeValue)
    passwordGenerated(checkbox, rangeValue)

    checkBoxCount()
    // eslint-disable-next-line
  }, [uppercase, lowercase, symbols, numbers])

  const onChangeCheckBox = (event) => {
    let { name, checked } = event.target
    CHECKBOX_LIST.map((checkbox) => {
      if (checkbox.name === name) {
        checkbox.isChecked = checked
        setCheckBox((prevState) => ({
          ...prevState,
          [name]: checkbox.isChecked,
        }))
        setPasswordLength(rangeValue)
        setRangeValue(rangeValue)
      }
      return ''
    })
  }

  const checkBoxCount = () => {
    const checkedCount = Object.keys(checkbox).filter((key) => checkbox[key])
    const disabled = checkedCount.length === 1
    const name = checkedCount[0]

    setChecked(disabled)
    setCheckedName(disabled ? name : '')
  }

  const onChangeSlider = (event) => {
    setRangeValue(event.target.value)
    setPasswordLength(event.target.value)
    setRange(event.target.value)
    passwordGenerated(checkbox, event.target.value)
  }

  const passwordGenerated = (checkbox, rangeValue) => {
    setPassword(generatePassword(checkbox, rangeValue > 3 ? rangeValue : 3))
    setPasswordProps(checkbox)
  }

  return (
    <div className='password-settings'>
      <h3 className='h3'>Use the slider, and select from the options</h3>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            &nbsp;
            <Slider
              min={parseInt(min, 10)}
              max={parseInt(max, 10)}
              step={1}
              defaultLength={parseInt(rangeValue, 10)}
              value={parseInt(rangeValue, 10)}
              onChangeValue={onChangeSlider}
            />
          </div>
        </div>
        <div className='col-md-12'>
          <div className='row checkbox-container'>
            {CHECKBOX_LIST.map((checkbox) => (
              <Checkbox
                key={checkbox.id}
                name={checkbox.name}
                checked={checkbox.isChecked}
                label={checkbox.label}
                value={checkbox.isChecked}
                onChange={onChangeCheckBox}
                disabled={
                  checked && checkbox.isChecked && checkedName === checkbox.name
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container
