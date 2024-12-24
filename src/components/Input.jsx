import React from "react";
import { useId } from "react";
import { forwardRef } from "react";

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1" htmlFor={id} >
                {label}
            </label>}
            <input type={type}
                className={` px-3 py-2 rounded bg-white text-black outline-none w-fu ${className}`}
                ref={ref}
                id={id}
                {...props} />
        </div>
    )
})

export default Input