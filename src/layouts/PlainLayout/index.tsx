import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PlainLayout() {
    return (
        <div>
            <Outlet />
        </div>
    )
}