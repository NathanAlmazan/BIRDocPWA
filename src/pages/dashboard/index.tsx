import React from 'react';
// mui
import Grid from '@mui/material/Grid';
// project imports
import StatusReportBar from './StatusReportBar';
import TypesReportDonut from './TypesReportDonut';
import UserTasks from './UserTasks';
import { useAppSelector } from '../../redux/hooks';


export default function DashboardPage() {
    const { uid, office } = useAppSelector((state) => state.auth);

    return (
        <Grid container spacing={2} sx={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto', pb: 2, px: 2 }}>
            <Grid item xs={12} md={12}>
                <StatusReportBar officeId={office?.sectionId as number} />
            </Grid>
            <Grid item md={12} lg={3}>
                <TypesReportDonut
                    officeId={office?.sectionId as number}
                    completed={true}
                />
            </Grid>
            <Grid item md={12} lg={3}>
                <TypesReportDonut
                    officeId={office?.sectionId as number}
                    completed={false}
                />
            </Grid>
            <Grid item md={12} lg={6}>
                <UserTasks userId={uid as string} />
            </Grid>
        </Grid>
    )
}