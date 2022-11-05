import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import AddEmployee from "../../Pages/Employees/AddEmployee";
import Employees from "../../Pages/Employees/Employees";
import UpdateEmployee from "../../Pages/Employees/UpdateEmployee";
import Login from "../../Pages/Login/Login/Login";
import Register from "../../Pages/Login/Register/Register";
import Orders from "../../Pages/Orders/Orders";
import Products from "../../Pages/Products/Products";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Products></Products>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
            {
                path: '/employees',
                loader: () => fetch('https://super-bazar-server.vercel.app/employees'),
                element: <Employees></Employees>
            },
            { path: '/addEmployee', element: <PrivateRoute><AddEmployee></AddEmployee></PrivateRoute> },
            {
                path: '/employees/:id',
                loader: ({ params }) => fetch(`https://super-bazar-server.vercel.app/employees/${params.id}`),
                element: <PrivateRoute><UpdateEmployee></UpdateEmployee></PrivateRoute>
            },
            {
                path: '/checkout/:id',
                loader: ({ params }) => fetch(`https://super-bazar-server.vercel.app/products/${params.id}`),
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            { path: '/orders', element: <PrivateRoute><Orders></Orders></PrivateRoute> },
            { path: '/login', element: <Login></Login> },
            { path: '/register', element: <Register></Register> },
        ]
    }
])