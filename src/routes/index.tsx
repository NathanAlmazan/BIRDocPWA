import React from 'react';
import { useRoutes } from 'react-router-dom';
// loaders
import { SuspenseLoader } from '../components/Loaders';
// layouts
import { EmailLayout } from "../layouts";

// pages
const EmailPage = React.lazy(() => import("../pages/email"))

export default function Router() {
    return useRoutes([
        {
            path: '',
            element: <EmailLayout />,
            children: [
                {
                    path: '',
                    element: <SuspenseLoader children={<EmailPage />} />
                }
            ]
        }
    ])
}