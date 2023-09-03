import React from 'react';
// icons
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

interface Paths {
    label: string;
    url: string;
    icon: React.ReactNode
}

export const dashboardPaths: Paths[] = [
    {
        label: 'Dashboard',
        url: '/app/dashboard',
        icon: <SpaceDashboardIcon />
    }
];

export const inboxPaths: Paths[] = [
    {
        label: 'My Tasks',
        url: '/app/inbox/tasks',
        icon: <AllInboxIcon />
    },
    {
        label: 'Memos',
        url: '/app/inbox/memos',
        icon: <StickyNote2Icon />
    },
    {
        label: 'Finished',
        url: '/app/inbox/finished',
        icon: <ArchiveIcon />
    }
];

export const sentPaths: Paths[] = [
    {
        label: 'Pending',
        url: '/app/sent/pending',
        icon: <SendOutlinedIcon />
    },
    {
        label: 'Sent Memos',
        url: '/app/sent/memos',
        icon: <StickyNote2Icon />
    },
    {
        label: 'Completed',
        url: '/app/sent/completed',
        icon: <ArchiveIcon />
    }
]

export const regionPaths: Paths[] = [
    {
        label: 'All Requests',
        url: '/admin/inbox/requests',
        icon: <AllInboxIcon />
    },
    {
        label: 'All Memos',
        url: '/admin/inbox/memos',
        icon: <StickyNote2Icon />
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