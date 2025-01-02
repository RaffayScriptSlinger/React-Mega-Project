import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    const Navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.currentStatus)
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            Navigate("/")
        } else if (!authentication && authStatus !== authentication) {
            Navigate("/")
        }
        else {

        }
        setLoader(false)

    }, [authStatus, Navigate, authentication])

    return loader ? <div>Loading...</div> : <>{children}</>
}

