import React from 'react'

function Button({
    children,
    type = `button`,
    bgColor = "bg-blue-700",
    textColor = "bg-white",
    className = "",
    ...props
}) {

    return (
        <button className={`${bgColor} ${textColor} ${className}`}{...props} >
            {children}
        </button>
    )
}

export default Button