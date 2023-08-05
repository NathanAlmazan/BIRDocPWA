import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
// loaders
import { SuspenseLoader } from '../components/Loaders';
// layouts
import { EmailLayout, PlainLayout } from "../layouts";

// pages
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Inbox = React.lazy(() => import("../pages/threads/Inbox"));
const SentItems = React.lazy(() => import("../pages/threads/SentItems"));
const Completed = React.lazy(() => import("../pages/threads/Completed"));
const Users = React.lazy(() => import("../pages/users"));

export default function Router() {
    return useRoutes([
        {
            path: '',
            element: <PlainLayout />,
            children: [
                { path: '/', element: <Navigate to={"app/dashboard"} /> }
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
                }
            ]
        }
    ])
}