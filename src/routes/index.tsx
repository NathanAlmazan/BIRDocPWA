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
const SentItems = React.lazy(() => import("../pages/threads/Sent"));

const RegionInbox = React.lazy(() => import("../pages/threads/RegionInbox"));
const RegionMemos = React.lazy(() => import("../pages/threads/RegionMemos"));

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

                // ========================= INBOX ITEMS ========================= //

                {
                    path: 'inbox/tasks',
                    element: <SuspenseLoader children={<Inbox type="pending" />} />
                },
                {
                    path: 'inbox/memos',
                    element: <SuspenseLoader children={<Inbox type="memos" />} />
                },
                {
                    path: 'inbox/finished',
                    element: <SuspenseLoader children={<Inbox type="finished" />} />
                },
                {
                    path: 'inbox/tasks/:refId',
                    element: <SuspenseLoader children={<Inbox type="pending" />} />
                },
                {
                    path: 'inbox/memos/:refId',
                    element: <SuspenseLoader children={<Inbox type="memos" />} />
                },
                {
                    path: 'inbox/finished/:refId',
                    element: <SuspenseLoader children={<Inbox type="finished" />} />
                },


                // ========================= SENT ITEMS ========================= //

                {
                    path: 'sent/pending',
                    element: <SuspenseLoader children={<SentItems type="pending" />} />
                },
                {
                    path: 'sent/memos',
                    element: <SuspenseLoader children={<SentItems type="memos" />} />
                },
                {
                    path: 'sent/completed',
                    element: <SuspenseLoader children={<SentItems type="finished" />} />
                },
                {
                    path: 'sent/archived',
                    element: <SuspenseLoader children={<SentItems type="archived" />} />
                },
                {
                    path: 'sent/pending/:refId',
                    element: <SuspenseLoader children={<SentItems type="pending" />} />
                },
                {
                    path: 'sent/memos/:refId',
                    element: <SuspenseLoader children={<SentItems type="memos" />} />
                },
                {
                    path: 'sent/completed/:refId',
                    element: <SuspenseLoader children={<SentItems type="finished" />} />
                },
                {
                    path: 'sent/archived/:refId',
                    element: <SuspenseLoader children={<SentItems type="archived" />} />
                }
            ]
        },
        {
            path: 'admin',
            element: <EmailLayout />,
            children: [
                {
                    path: 'inbox/requests',
                    element: <SuspenseLoader children={<RegionInbox />} />
                },
                {
                    path: 'inbox/memos',
                    element: <SuspenseLoader children={<RegionMemos />} />
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