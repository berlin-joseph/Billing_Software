import { DatePicker } from 'antd'
import React from 'react'

const CustomDatePicker = ({ onChange, defaultValue, disabled }) => {
  return (
    <div>
      <DatePicker
        className="w-full"
        disabled={disabled}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default CustomDatePicker

// need to disable date change
