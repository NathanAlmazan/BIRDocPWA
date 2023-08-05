import React from 'react';
// icons
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

interface Paths {
    label: string;
    url: string;
    icon: React.ReactNode
}

export const paths: Paths[] = [
    {
        label: 'Dashboard',
        url: '/app/dashboard',
        icon: <SpaceDashboardIcon />
    },
    {
        label: 'Inbox',
        url: '/app/inbox',
        icon: <AllInboxIcon />
    },
    {
        label: 'Sent',
        url: '/app/sent',
        icon: <SendOutlinedIcon />
    },
    {
        label: 'Completed',
        url: '/app/completed',
        icon: <ArchiveIcon />
    },
];

export const settings: Paths[] = [
    {
        label: 'Settings',
        url: '/admin/settings',
        icon: <SettingsIcon />
    },
    {
        label: 'Accounts',
        url: '/admin/users',
        icon: <SupervisorAccountIcon />
    }
]