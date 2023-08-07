import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
// loaders
import { SuspenseLoader } from '../components/Loaders';
// layouts
import { EmailLayout, PlainLayout } from "../layouts";
import { useAppSelector } from '../redux/hooks';

// pages
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Inbox = React.lazy(() => import("../pages/threads/Inbox"));
const SentItems = React.lazy(() => import("../pages/threads/SentItems"));
const Completed = React.lazy(() => import("../pages/threads/Completed"));
const Users = React.lazy(() => import("../pages/users"));
const Settings = React.lazy(() => import("../pages/settings"));
const RegisterUser = React.lazy(() => import("../pages/authentication/RegisterUser"));
const LoginUser = React.lazy(() => import("../pages/authentication/LoginUser"));

export default function Router() {
    const { uid } = useAppSelector((state) => state.auth);
    
    return useRoutes([
        {
            path: '',
            element: <PlainLayout />,
            children: [
                { path: '/', element: <Navigate to={uid ? "app/dashboard" : "auth/login"} /> }
            ]
        },
        {
            path: 'app',
            element: <EmailLayout />,
            children: [
                {
                    path: 'dashboard',
                    element: <SuspenseLoader children={<Dashboard />} />
                },
                {
                    path: 'inbox',
                    element: <SuspenseLoader children={<Inbox />} />
                },
                {
                    path: 'sent',
                    element: <SuspenseLoader children={<SentItems />} />
                },
                {
                    path: 'completed',
                    element: <SuspenseLoader children={<Completed />} />
                }
            ]
        },
        {
            path: 'admin',
            element: <EmailLayout />,
            children: [
                {
                    path: 'users',
                    element: <SuspenseLoader children={<Users />} />
                },
                {
                    path: 'settings',
                    element: <SuspenseLoader children={<Settings />} />
                }
            ]
        },
        {
            path: 'auth',
            element: <PlainLayout />,
            children: [
                {
                    path: 'register',
                    element: <SuspenseLoader children={<RegisterUser />} />
                },
                {
                    path: 'login',
                    element: <SuspenseLoader children={<LoginUser />} />
                }
            ]
        }
    ])
}