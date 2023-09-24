import React from 'react';
// mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
// csv
import { CSVLink } from 'react-csv';
// icons
import IosShareIcon from '@mui/icons-material/IosShare';
// api
import { useQuery } from '@apollo/client';
import { GET_DOCUMENT_SUMMARY_ANALYTICS } from '../../api/offices';
import { Thread } from '../../api/threads/types';
import { useAppSelector } from '../../redux/hooks';


function optionYears() {
    const current = new Date().getFullYear();

    return [current - 3, current - 2, current - 1, current]
}

function getTagColor(tagName: string) {
    if (tagName === "Top Priority") return "error";
    else if (tagName === "Confidential") return "warning";
    return "primary"
  }
  

const formatSummaryDate = (date: string | Date) => {
    const target = new Date(date);
    return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function RequestSummaryTable() {
    const { uid } = useAppSelector((state) => state.auth);
    const { data: summary, refetch } = useQuery<{ getThreadSummary: Thread[] }>(GET_DOCUMENT_SUMMARY_ANALYTICS, {
        variables: {
           userId: uid,
           dateCreated: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
        }
    });
    const [month, setMonth] = React.useState<number>(new Date().getMonth());
    const [year, setYear] = React.useState<number>(new Date().getFullYear())
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    const [emptyRows, setEmptyRows] = React.useState<number>(0);

    React.useEffect(() => {
        if (summary) {
            setEmptyRows(page > 0 ? Math.max(0, (1 + page) * rowsPerPage - summary.getThreadSummary.length) : 0);
        }
    }, [summary, page, rowsPerPage])

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMonth(parseInt(event.target.value));
        refetch({
            userId: uid,
            dateCreated: new Date(new Date().getFullYear(), parseInt(event.target.value), 1).toISOString()
        })
    }

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(parseInt(event.target.value));
        refetch({
            userId: uid,
            dateCreated: new Date(parseInt(event.target.value), new Date().getMonth(), 1).toISOString()
        })
    }

    const handlePageChange = (event:  unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleRowPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    return (
        <Card>
            <CardHeader 
                title='Requests Summary'
                action={
                    <Stack direction='row' spacing={2}>
                        <TextField 
                            name='report-month'
                            label="Month"
                            value={month}
                            onChange={handleMonthChange}
                            select
                        >
                            {months.map((month, index) => (
                                <MenuItem key={month} value={index}>{month}</MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            name='report-year'
                            label='Year'
                            value={year}
                            onChange={handleYearChange}
                            select
                        >
                            {optionYears().map(year => (
                                <MenuItem key={year} value={year}>{year.toString()}</MenuItem>
                            ))}
                        </TextField>
                        {summary && (
                            <CSVLink filename={`${new Date(year, month, 1).toISOString().split('T')[0]}.csv`} data={[
                                ["Reference #", "Received From", "Office Concerned", "For", "Document Type", "Date Received", "Date Due", "Status"],
                                ...summary.getThreadSummary.map(thread => [
                                    thread.refSlipNum,
                                    `${thread.author.firstName} ${thread.author.lastName} (${thread.author.officeSection.sectionOffice.officeName})`,
                                    `${thread.recipient.sectionOffice.officeName} ${thread.recipient.sectionName === "default" ? "" : thread.recipient.sectionName}`,
                                    thread.purpose.purposeName,
                                    thread.docType.docType,
                                    formatSummaryDate(thread.dateCreated),
                                    formatSummaryDate(thread.dateDue),
                                    thread.status.statusLabel
                                ])
                            ]}>
                                <Button
                                    variant='contained'
                                    startIcon={<IosShareIcon />}
                                    sx={{ minHeight: 50 }}
                                >
                                    Export
                                </Button>
                            </CSVLink>
                        )}
                    </Stack>
                }
            />
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Reference #</TableCell>
                                <TableCell>Sender</TableCell>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Details</TableCell>
                                <TableCell>Date Sent</TableCell>
                                <TableCell>Date Due</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {summary && summary.getThreadSummary.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            ).map(thread => (
                                <TableRow key={thread.refId}>
                                    <TableCell>
                                        <Typography variant='body1' sx={{ fontWeight: 800 }}>
                                            {thread.refSlipNum}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='body1'>
                                            {thread.author.firstName + ' ' + thread.author.lastName}
                                        </Typography>
                                        <Typography variant='subtitle2'>
                                            {thread.author.role.roleName}
                                        </Typography>
                                        <Typography variant='caption'>
                                            {`${thread.author.officeSection.sectionOffice.officeName} ${thread.author.officeSection.sectionName === "default" ? "" : thread.author.officeSection.sectionName}`}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='body1'>
                                            {thread.recipient.sectionOffice.officeName}
                                        </Typography>
                                        <Typography variant='caption'>
                                            {`${thread.recipient.sectionName === "default" ? "All Sections" : thread.recipient.sectionName}`}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='body1'>
                                            {`For ${thread.purpose.purposeName}`}
                                        </Typography>
                                        <Typography variant='caption'>
                                            {thread.docType.docType}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{formatSummaryDate(thread.dateCreated)}</TableCell>
                                    <TableCell>{formatSummaryDate(thread.dateDue)}</TableCell>
                                    <TableCell align="right">
                                        <Chip size="small" label={thread.status.statusLabel} color={thread.completed ? "success" : "info"} sx={{ m: 1 }} />

                                        {thread.threadTag && (
                                            <Chip size="small" label={thread.threadTag.tagName} color={getTagColor(thread.threadTag.tagName)} sx={{ m: 1 }}/>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 60 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination 
                    rowsPerPageOptions={[5, 10, 15]}
                    component='div'
                    count={summary ? summary.getThreadSummary.length : 0}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowPerPageChange}
                />
            </CardContent>
        </Card>
    )
}