import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/store.js"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, RouterProvider, Routes,createBrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import SignUp from "./components/SginUp/SignUp.jsx"
import { Login } from './components/index.js'
import AllPosts from "./components/pages/AllPosts.jsx"
import AddPost from "./components/pages/AddPost.jsx"
import Post from "./components/pages/Post.jsx"
import EditPost from "./components/pages/EditPost.jsx"
import AuthLayout from "./components/authLayout.jsx"

// <BrowserRouter>
//   <Routes>
//     <Route path='/' element={Home} />
//     <Route path='/Login' element={<Protected authentication={false}><Login /></Protected>} />
//     <Route path='/SignUp' element={<Protected authentication={false}><SignUp /></Protected>} />
//     <Route path='/AllPosts' element= {AllPosts} />
    
//   </Routes>


// </BrowserRouter>

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUp />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)