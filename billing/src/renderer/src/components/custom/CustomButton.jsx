import React from 'react'
import { Button } from 'antd'

const CustomButton = ({ onClick, button }) => {
  return (
    <div>
      <Button className=" w-full" onClick={onClick}>
        {button}
      </Button>
    </div>
  )
}

export default CustomButton
