import React from 'react';
// mui
import Grid from '@mui/material/Grid';
// project imports
import DocumentTypeList from './DocumentTypeList';
import DocumentStatusList from './DocumentStatusList';

export default function SettingsPage() {
    return (
        <Grid container spacing={3} alignItems="stretch" sx={{ height: "95%" }}>
            <Grid item md={4}>
                <DocumentTypeList />
            </Grid>
            <Grid item md={4}>
                <DocumentStatusList />
            </Grid>
        </Grid>
    )
}