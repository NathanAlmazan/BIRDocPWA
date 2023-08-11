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

export const chartColors = ['#9288F8', '#FFD2D7', '#461959', '#7A316F', '#CD6688', '#AED8CC', '#9A208C', '#E11299', '#35155D', '#512B81', '#4477CE', '#8CABFF', '#6F61C0', '#A084E8', '#8BE8E5', '#D5FFE4', '#4682A9', '#749BC2', '#91C8E4', '#F6F4EB', '#FFE7A0', '#322653', '#8062D6', '#FFEAEA', '#F5C6EC'];