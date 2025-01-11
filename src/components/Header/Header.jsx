import React from 'react'
import { Container, Logo } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function Header() {

  const currentStatus = useSelector((state) => state.auth.currentStatus);
  const navigate = useNavigate()



  const navItems = [
    {
      name: "Login",
      slug: "/Login",
      active: !currentStatus
    },
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "signup",
      slug: "/signup",
      active: !currentStatus
    },
    {
      name: "All-Post",
      slug: "/all-Post",
      active: currentStatus
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
          <ul className='flex items-center'>
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    onClick={() => navigate(items.slug)}
                    className="inline-block py-2 px-6 duration-200 rounded hover:bg-blue-100"
                  >
                    {items.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          {
            currentStatus && (<li><LogoutBtn /></li>)
          }
        </nav>
      </Container>
    </header>
  )
}

export default Header
