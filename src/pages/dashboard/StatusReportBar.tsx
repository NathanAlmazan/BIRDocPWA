import React from 'react';
// mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chart from 'react-apexcharts';
// api
import { useQuery } from '@apollo/client';
import { GET_DOCUMENT_TYPE_ANALYTICS } from '../../api/offices';
import { DocumentStatus, DocumentTypes, Analytics } from '../../api/threads/types';
import { GET_ALL_THREAD_STATUS, GET_ALL_THREAD_TYPES } from '../../api/threads';
import { chartColors } from '.';


function getWeekBeforeDate() {
    const current = new Date();
    current.setDate(current.getDate() - 7);

    return current;
}

export default function StatusReportBar({ officeId }: { officeId: number }) {
    const theme = useTheme();
    const [startDate, setStartDate] = React.useState<string>(getWeekBeforeDate().toISOString());
    const [endDate, setEndDate] = React.useState<string>(new Date().toISOString());
    const { data: analytics, refetch } = useQuery<{ getThreadTypeAnalytics: Analytics[] }>(GET_DOCUMENT_TYPE_ANALYTICS, {
        variables: {
            officeId: officeId,
            startDate: startDate,
            endDate: endDate
        }
    });
    const { data: threadTypes } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES);
    const { data: threadStatus } = useQuery<{ getAllThreadStatus: DocumentStatus[] }>(GET_ALL_THREAD_STATUS);

    const [chartOptions, setChartOptions] = React.useState<any>();
    const [chartSeries, setChartSeries] = React.useState<{
        name: string;
        data: number[];
    }[]>([])

    React.useEffect(() => {
        if (analytics && threadTypes && threadStatus) {
            const { primary } = theme.palette.text;
            const grey200 = theme.palette.grey[200];
            const grey500 = theme.palette.grey[500];

            setChartOptions({
                chart: {
                    id: 'bar-chart',
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: true
                    }
                },
                colors: chartColors,
                responsive: [
                    {
                        breakpoint: 500,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0
                            }
                        }
                    }
                ],
                xaxis: {
                    type: 'category',
                    categories: threadTypes.getAllThreadTypes.map(type => type.docType),
                    labels: {
                        style: {
                            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary],
                            fontSize: '8px'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: [primary]
                        }
                    }
                },
                grid: {
                    borderColor: grey200,
                    show: true
                },
                tooltip: {
                    theme: 'light'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '50%'
                    }
                },
                legend: {
                    show: true,
                    position: 'top',
                    fontSize: '14px',
                    fontFamily: `'Roboto', sans-serif`,
                    offsetX: 20,
                    labels: {
                        useSeriesColors: false,
                        colors: grey500
                    },
                    markers: {
                        width: 16,
                        height: 16,
                        radius: 5
                    },
                    itemMargin: {
                        horizontal: 15,
                        vertical: 8
                    },
                },
                fill: {
                    type: 'solid'
                },
                dataLabels: {
                    enabled: false
                }
            })

            setChartSeries(threadStatus.getAllThreadStatus.map(status => ({
                name: status.statusLabel,
                data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75, 35, 125, 35, 35, 35, 80, 35, 20]
            })))

            // setChartSeries(threadStatus.getAllThreadStatus.map(status => ({
            //     name: status.statusLabel,
            //     data: threadTypes.getAllThreadTypes.map(type => {
            //         const data = analytics.getThreadTypeAnalytics.filter(s => s.status.statusId === status.statusId && s.docType.docId === type.docId);

            //         if (data.length > 0) return data.reduce((sum, d) => sum + d.count, 0);
            //         return 0;
            //     })
            // })))
        }
    }, [analytics, threadTypes, threadStatus, theme]);

    const handleStartDateChange = (date: Dayjs | null) => {
        if (date) {
            setStartDate(date.toISOString());
            refetch({
                officeId: officeId,
                startDate: date.toISOString(),
                endDate: endDate
            })
        }
    }

    const handleEndDateChange = (date: Dayjs | null) => {
        if (date) {
            setEndDate(date.toISOString());
            refetch({
                officeId: officeId,
                startDate: startDate,
                endDate: date.toISOString()
            })
        }
    }

    return (
        <Card>
            <CardHeader 
                title={
                    <Box>
                        <Typography variant='h4'>
                            1260
                        </Typography>
                        <Typography variant='body2'>
                            Total Documents
                        </Typography>
                    </Box>
                }
                action={
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack direction='row' spacing={1}>
                                <DatePicker 
                                    label="Report Start Date"
                                    views={["year", "month", "day"]}
                                    value={dayjs(startDate)} 
                                    onChange={handleStartDateChange} 
                                    format="MMMM DD, YYYY"
                                />
                                <DatePicker 
                                    label="Report End Date"
                                    views={["year", "month", "day"]}
                                    value={dayjs(endDate)} 
                                    onChange={handleEndDateChange} 
                                    format="MMMM DD, YYYY"
                                />
                        </Stack>
                    </LocalizationProvider>
                }
            />
            <CardContent>
                {chartOptions && (
                    <Chart type='bar' height={500} options={chartOptions} series={chartSeries} />
                )}
            </CardContent>
        </Card>
    )
}


