import React from 'react';
// mui
import Grid from '@mui/material/Grid';
// project imports
import OfficeList from './OfficeList';
import OfficeSectionList from './OfficeSectionList';

export default function UsersPage() {
    const [selectedOffice, setSelectedOffice] = React.useState<number>(1);

    const handleSelectedOfficeChange = (officeId: number) => setSelectedOffice(officeId);

    return (
        <Grid container spacing={3} alignItems="stretch" sx={{ height: "95%" }}>
            <Grid item md={4}>
                <OfficeList selected={selectedOffice} onSelect={handleSelectedOfficeChange} />
            </Grid>
            <Grid item md={8}>
                <OfficeSectionList officeId={selectedOffice} />
            </Grid>
        </Grid>
    )
}