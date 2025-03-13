import React from 'react'

const Button = ({content, color, ref, onClick}) => {
  return (
      <button onClick={onClick} ref={ref} style={{ backgroundColor: color === "green" ? "#007442" : color === "gray" ? "#2C2F2E" : "#740000" }} className={`px-2 w-fit text-amber-50 rounded-2xl py-2 cursor-pointer transition-all delay-50 hover:translate-y-[-2px]`}>
         {content}
      </button>
  )
}

export default Button