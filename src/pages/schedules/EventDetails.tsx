import React from 'react';
// mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
// icons
import EventIcon from '@mui/icons-material/Event';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
// project components
import { ReportFiles, Reports, Schedules } from '../../api/schedules/types';
import ReplyBox, { MessageInput } from '../threads/ReplyBox';
import ReportCard from './ReportCard';
import { useAppSelector } from '../../redux/hooks';
import { MessageFiles } from '../../api/threads/types';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_REPORTS, SUBMIT_REPORT } from '../../api/schedules';
import { formatSummaryDate } from '.';


interface ReportCreateInput {
    message: string;
    schedId: string;
    authorId: string;
    reportDate: string;
    files: Pick<ReportFiles, "fileName" | "fileUrl" | "fileType">[]
}

interface EventDetailsProps {
    event: Schedules | null;
    selectedDate: string;
    onEdit: () => void;
    onSubmit: () => void;
}

export default function EventDetails(props: EventDetailsProps) {
    const theme = useTheme();
    const [sendReport] = useMutation<{ sendReport: Reports }, { data: ReportCreateInput }>(SUBMIT_REPORT);
    const [getReports, { data: reports }] = useLazyQuery<{ getAllReports: Reports[] }>(GET_ALL_REPORTS, {
        fetchPolicy: 'network-only'
    });

    const [tabValue, setTabValue] = React.useState<number>(0);
    const { uid, role } = useAppSelector((state) => state.auth);
    const [messageData, setMessageData] = React.useState<MessageInput>({
        message: "",
        files: [],
        links: []
    })
    const [formError, setFormError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (props.selectedDate && props.event) {
            getReports({
                variables: {
                    schedId: props.event.schedId,
                    reportDate: new Date(props.selectedDate)
                }
            })
        }
    }, [props.selectedDate, props.event, getReports])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleSubmitReport = async () => {
        // validation
        if (!props.event) return;

        if (messageData.files.length === 0 && messageData.links.length === 0) {
            setFormError("Attached file is required.");
            return
        }

        // create initial message
        let uploadedFiles: MessageFiles[] = [];
        let insertedLinks: MessageFiles[] = [];

        // upload files if any
        if (messageData.files.length > 0) {
            const form = new FormData();
            messageData.files.forEach((file) => {
                form.append("files", file);
            })

            try {
                const result = await axios.post(process.env.REACT_APP_MEDIA_URL as string, form);
                uploadedFiles = result.data.files;
            } catch (err) {
                setFormError((err as Error).message);
                return
            }
        }

        // arrange links if any
        if (messageData.links.length > 0) {
            insertedLinks = messageData.links.map(link => ({
                fileName: link.name,
                fileType: "url",
                fileUrl: link.link
            }))
        }

        // combine link array
        const messageFiles = uploadedFiles.concat(insertedLinks);

        // send first message
        try {
            await sendReport({ variables: { data: {
                message: messageData.message,
                files: messageFiles,
                authorId: uid as string,
                reportDate: new Date(props.selectedDate).toISOString(),
                schedId: props.event.schedId
            }}})

            // reset form
            setMessageData({
                message: "",
                files: [],
                links: []
            })

            setFormError(null);

            props.onSubmit();

        } catch (err) {
            setFormError((err as Error).message);
            return
        }
    }

    return (
        <Card sx={{ width: 900 }}>
            {props.event ? (
                <>
                    <CardHeader 
                        title={props.event.subject} 
                        subheader={formatSummaryDate(props.selectedDate)}
                        action={
                            role && role.superuser ? <Button variant='outlined' onClick={props.onEdit}>Edit</Button> : undefined
                        }
                    />
                    <CardContent>
                        <Stack spacing={1}>
                            <Stack direction='row' spacing={1}>
                                {props.event.recipients.map(recipient => (
                                    <Chip key={recipient.roleId} label={recipient.roleName} />
                                ))}
                            </Stack>
                            <Typography variant='body1' sx={{ pt: 3 }}>{props.event.description}</Typography>
                            
                            <Divider />

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                                    <Tab label="Submission" value={0} />
                                    <Tab label="Submitted Reports" value={1} />
                                </Tabs>
                            </Box>

                            {tabValue === 0 && (
                                <Stack spacing={2}>
                                    <ReplyBox userId={uid as string} onChange={(data) => setMessageData(data)} />

                                    {formError && (
                                        <Alert color='error'>{formError}</Alert>
                                    )}

                                    {reports && reports.getAllReports.find(report => report.author.accountId === uid) !== undefined && (
                                        <Alert color='success'>{`You already submitted report for ${formatSummaryDate(props.selectedDate)}`}</Alert>
                                    )}

                                    <Button 
                                        variant='contained' 
                                        onClick={handleSubmitReport} 
                                        disabled={reports && reports.getAllReports.find(report => report.author.accountId === uid) !== undefined}
                                    >
                                        Submit Report
                                    </Button>
                                </Stack>
                            )}

                            {(tabValue === 1 && reports) && (
                                <Box sx={{
                                    maxHeight: 'calc(100vh - 430px)', 
                                    overflowY: 'auto',
                                    "::-webkit-scrollbar": {
                                        height: "8px",
                                        width: "8px"
                                    },

                                    /* Track */
                                    "::-webkit-scrollbar-track": {
                                        background: theme.palette.grey[300] 
                                    },
                                    
                                    /* Handle */
                                    "::-webkit-scrollbar-thumb": {
                                        background: theme.palette.secondary.main
                                    },
                                    
                                    /* Handle on hover */
                                    "::-webkit-scrollbar-thumb:hover": {
                                        background: theme.palette.primary.dark
                                    },
                                    padding: 3
                                }}>
                                    {reports.getAllReports.map(report => (
                                        <ReportCard 
                                            key={report.reportId}  
                                            content={report}
                                        />
                                    ))}

                                    {reports.getAllReports.length === 0 && (
                                        <Stack justifyContent='center' alignItems='center' sx={{ minHeight: 300 }}>
                                            <FolderCopyIcon color='primary' sx={{ width: 50, height: 50 }} />
                                            <Typography variant='body1'>No Reports Submitted</Typography>
                                        </Stack>
                                    )}
                                </Box>
                            )}
                        </Stack>
                    </CardContent>
                </>
            ) : (
                <CardContent>
                    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ minHeight: 500 }}>
                        <EventIcon sx={{ width: 50, height: 50 }} />
                        <Typography variant='body2'>No Event Selected</Typography>
                    </Stack>
                </CardContent>
            )}
        </Card>
    )
}