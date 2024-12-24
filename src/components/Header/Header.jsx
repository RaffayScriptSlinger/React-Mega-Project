import React from 'react'
import { Container, Footer, LogoutBtn, Logo } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from '../index'
import LogoutBtn from '../index'

function Header() {
  const authStatus = useSelector((state) => state.auth.authStatus)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Login",
      slug: "/Login",
      active: !authStatus
    },
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "SignUp",
      slug: "/SignUp",
      active: !authStatus
    },
    {
      name: "All-Post",
      slug: "/all-Post",
      active: authStatus
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link>
              <Logo width='86px' />
            </Link>
          </div>
          <ul>
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    onClick={() => { navigate(items.slug) }}
                    className='inline-block py-2 px-6 duration-200 rounded hover:bg-blue-100'
                  >
                    {items.name}

                  </button>

                </li>
              ) : null
            )}
          </ul>
          {
            authStatus && (<li><LogoutBtn /></li>)

          }
        </nav>
      </Container>
    </header>
  )
}

export default Header