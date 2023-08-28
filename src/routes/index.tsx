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
const RegionInbox = React.lazy(() => import("../pages/threads/RegionInbox"));

const Users = React.lazy(() => import("../pages/users"));
const Settings = React.lazy(() => import("../pages/settings"));

const RegisterUser = React.lazy(() => import("../pages/authentication/RegisterUser"));
const LoginUser = React.lazy(() => import("../pages/authentication/LoginUser"));
const ForgotPassword = React.lazy(() => import("../pages/authentication/ForgotPassword"))

const Page404 = React.lazy(() => import("../pages/Page404"));

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
                    path: 'inbox/:refId',
                    element: <SuspenseLoader children={<Inbox />} />
                },
                {
                    path: 'sent',
                    element: <SuspenseLoader children={<SentItems />} />
                },
                {
                    path: 'sent/:refId',
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
                    path: 'inbox',
                    element: <SuspenseLoader children={<RegionInbox />} />
                },
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
                },
                {
                    path: 'reset',
                    element: <SuspenseLoader children={<ForgotPassword />} />
                }
            ]
        },
        {
            element: <PlainLayout />,
            children: [
                { element: <Navigate to={uid ? "app/dashboard" : "auth/login"} />, index: true },
                { path: '/', element: <Navigate to={uid ? "app/dashboard" : "auth/login"} /> },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ])
}