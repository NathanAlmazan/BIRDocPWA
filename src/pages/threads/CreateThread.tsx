import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// icons
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// api
import { useQuery, useMutation } from '@apollo/client';
import axios from 'axios';
import { 
    DocumentPurpose,
    DocumentTypes, 
    MessageFiles, 
    Messages, 
    OfficeSections, 
    Thread,
    ThreadTags,
    UserAccounts
} from '../../api/threads/types';
import { 
    CREATE_THREAD,
    GET_ALL_THREAD_PURPOSE,
    GET_ALL_THREAD_TAGS,
    GET_ALL_THREAD_TYPES, 
    GET_BIR_OFFICES,
    GET_TEMP_REF_NUM,
    SEND_THREAD_MESSAGE
} from '../../api/threads';
// project imports
import ReplyBox, { MessageCreateInput, MessageInput } from './ReplyBox';
import { LoadOverlay } from '../../components/Loaders';
import { GET_USER_ACCOUNTS_BY_OFFICES } from '../../api/offices';


interface ThreadInput {
    subject: string;
    authorId: string;
    statusId: number;
    recipientId: number[];
    recipientUserId: string[];
    docTypeId?: number;
    purposeId?: number;
    tagId: number | null;
    attachments: boolean;
    purposeNotes: string;
    completed: boolean;
    dateDue: string;
}

interface Queue {
    [key: string]: number
}

interface CreateThreadProps {
    userId: string;
    onDiscardThread: () => void;
    onCreateThread: (threadId: string) => void;
}

export function generateOfficeCode(officeCode?: string, sectionCode?: string) {
    if (officeCode && sectionCode) return ` (${officeCode}-${sectionCode})`;
    else if (officeCode) return ` (${officeCode})`
    else return '';
}

export default function CreateThread(props: CreateThreadProps) {
  const theme = useTheme();
  const { data: tempRefNum } = useQuery<{ getThreadRefNum: string }>(GET_TEMP_REF_NUM, 
    { 
        variables: { authorId: props.userId },
        fetchPolicy: 'network-only'
    });
  const { data: officeSections } = useQuery<{ getAllOfficeSections: OfficeSections[] }>(GET_BIR_OFFICES);
  const { data: threadTypes } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES);
  const { data: threadPurposes } = useQuery<{ getAllThreadPurpose: DocumentPurpose[] }>(GET_ALL_THREAD_PURPOSE);
  const { data: threadTags } = useQuery<{ getAllThreadTags: ThreadTags[] }>(GET_ALL_THREAD_TAGS);
  const { data: threadOfficers, refetch: refetchOfficers } = useQuery<{ getAccountsByOffice: UserAccounts[] }>(GET_USER_ACCOUNTS_BY_OFFICES, { variables: { officeIds: [] } });
  const [createThread] = useMutation<{ createThread: Thread[] }, { data: ThreadInput }>(CREATE_THREAD);
  const [sendThreadMessage] = useMutation<{ sendMessage: Messages }, { data: MessageCreateInput }>(SEND_THREAD_MESSAGE);
  const [offices, setOffices] = React.useState<Queue>();
  const [types, setTypes] = React.useState<Queue>();
  const [purposes, setPurposes] = React.useState<Queue>();
  const [officers, setOfficers] = React.useState<{ [key: string]: string }>();
  const [formData, setFormData] = React.useState<ThreadInput>({
    subject: "",
    authorId: props.userId,
    statusId: 2,
    attachments: true,
    completed: false,
    dateDue: new Date().toISOString(),
    tagId: null,
    recipientId: [],
    recipientUserId: [],
    purposeNotes: ''
  })
  const [messageData, setMessageData] = React.useState<MessageInput>({
    message: "",
    files: [],
    links: []
  })
  const [formError, setFormError] = React.useState<{ 
    recipient?: string, 
    subject?: string, 
    type?: string, 
    general?: string,
    purpose?: string
  }>();

  React.useEffect(() => {
    if (officeSections && threadTypes && threadPurposes) {
        let officeObject: Queue = {};
        officeSections.getAllOfficeSections.forEach(office => {
            if (office.sectionName === "default") {
                officeObject[office.sectionOffice.officeName + " — All" + generateOfficeCode(office.sectionOffice.refNum, office.refNum)] = -(office.sectionOffice.officeId);
                officeObject[office.sectionOffice.officeName + " — Admin" + generateOfficeCode(office.sectionOffice.refNum, office.refNum)] = office.sectionId;
            } else {
                officeObject[office.sectionOffice.officeName + " — " + office.sectionName + generateOfficeCode(office.sectionOffice.refNum, office.refNum)] = office.sectionId;
            }
        })
        
        setOffices(officeObject);

        let typesObject: Queue = {};
        threadTypes.getAllThreadTypes.forEach(type => {
            typesObject[type.docType] = type.docId;
        })
        setTypes(typesObject);

        let purposesObject: Queue = {};
        threadPurposes.getAllThreadPurpose.forEach(purpose => {
            purposesObject[purpose.purposeName] = purpose.purposeId;
        })
        setPurposes(purposesObject);

    }
  }, [officeSections, threadTypes, threadPurposes]);

  React.useEffect(() => {
    if (threadOfficers) {
        let officersObject: { [key: string]: string } = {};
        threadOfficers.getAccountsByOffice.forEach(officer => {
            officersObject[officer.firstName + " " + officer.lastName] = officer.accountId
        })

        setOfficers(officersObject);
    }
  }, [threadOfficers])

  if (!offices || !types || !purposes || !officers) return <LoadOverlay open={true} />

  const handleSubjectTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, subject: event.target.value });

  const handleThreadTypeChange = (_: any, newValue: string | null) => setFormData({ ...formData, docTypeId: types[newValue as string] });

  const handleThreadPurposeChange = (_: any, newValue: string | null) => setFormData({ ...formData, purposeId: purposes[newValue as string] });

  const handlePurposeNotesChange = (_: any, newValue: string) => setFormData({ ...formData, purposeNotes: newValue });

  const handleTegChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value === 0) setFormData({ ...formData, tagId: null });
    else setFormData({ ...formData, tagId: value });
  }

  const handleRecipientChange = (_: any, newValue: string[]) => {
    setFormData({ ...formData, recipientId: newValue.map(value => offices[value]) });
    refetchOfficers({ officeIds: newValue.map(value => offices[value]).filter(id => id > 0) })
  }

  const handleOfficersChange = (_: any, newValue: string[]) => {
    setFormData({ ...formData, recipientUserId: newValue.map(value => officers[value]) });
  }

  const handleToggleAttachments = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, attachments: event.target.checked });

  const handleDateDueChange = (date: Dayjs | null) => {
    if (date) setFormData({ ...formData, dateDue: date.toISOString() });
  }

  const handleCloseSnackbar = () => setFormError({ ...formError, general: undefined });

  const handleCreateThread = async () => {
    // validation
    if (!formData.recipientId) {
        setFormError({ ...formError, recipient: "Recipient is required." });
        return
    }

    if (!formData.purposeId) {
        setFormError({ ...formError, purpose: "Purpose is required." });
        return
    }

    if (!formData.docTypeId) {
        setFormError({ ...formError, type: "Type is required." });
        return
    }

    if (formData.subject.length === 0) {
        setFormError({ ...formError, recipient: "Subject is required." });
        return
    }

    // create thread
    try {
        const threadResult = await createThread({ variables: { data: formData }});

        if (!threadResult.data) {
            setFormError({ ...formError, general: "Failed to create thread." });
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
                setFormError({ ...formError, general: (err as Error).message });
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
            for (let i = 0; i < threadResult.data.createThread.length; i++) {
                const thread = threadResult.data.createThread[i]

                await sendThreadMessage({ variables: { data: {
                    message: messageData.message,
                    files: messageFiles,
                    senderId: props.userId,
                    threadId: thread.refId
                }}})
            }

            props.onCreateThread(threadResult.data.createThread[0].refId);
        } catch (err) {
            setFormError({ ...formError, general: (err as Error).message });
            return
        }

    } catch (err) {
        setFormError({ ...formError, general: (err as Error).message });
        return
    }
  }

  return (
    <Paper sx={{ width: '100%' }}>
        <Box 
            sx={{ 
                width: '100%', 
                maxHeight: 'calc(100vh - 105px)', 
                overflowY: 'auto',
                overflowX: 'hidden',
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
                }
            }}
        >
            <Stack spacing={3} sx={{ p: 2 }}>
                <div>
                    <Stack direction='row' justifyContent='space-between' alignItems='end'>
                        <Stack direction='row' spacing={1} alignItems='center' sx={{ py: 1 }}>
                            <Button 
                                variant='contained' 
                                endIcon={<SendIcon />}
                                onClick={handleCreateThread}
                            >
                                Send
                            </Button>
                            <Tooltip title='Discard'>
                                <IconButton onClick={props.onDiscardThread}>
                                    <DeleteOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        
                        {tempRefNum && (
                            <Typography variant='body2' sx={{ fontWeight: 800 }}>
                                {`${tempRefNum.getThreadRefNum}`}
                            </Typography>
                        )}
                    </Stack>
                    <Divider /> 
                </div>

                <Stack direction='row' spacing={2}>
                    <Chip label='To' variant='outlined' sx={{ width: 80 }} />
                    <Autocomplete
                        multiple
                        freeSolo
                        fullWidth
                        options={Object.keys(offices)}
                        onChange={handleRecipientChange}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                variant='standard' 
                                error={formError?.recipient !== undefined}
                                helperText={formError && formError.recipient}
                            />
                        }
                    />
                </Stack>

                <Stack direction='row' spacing={2}>
                    <Chip label='Officers' variant='outlined' sx={{ width: 80 }} />
                    <Autocomplete
                        multiple
                        freeSolo
                        fullWidth
                        options={Object.keys(officers)}
                        onChange={handleOfficersChange}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                variant='standard'
                            />
                        }
                    />
                </Stack>
            
                <Stack direction='row' spacing={2}>
                    <Chip label='Subject' variant='outlined' sx={{ width: 80 }} />
                    <TextField 
                        name='subject'
                        variant='standard'
                        value={formData.subject}
                        onChange={handleSubjectTextChange}
                        fullWidth
                        error={formError?.subject !== undefined}
                        helperText={formError && formError.subject}
                    />
                </Stack>

                <Stack direction='row' spacing={2}>
                    <Chip label='Purpose' variant='outlined' sx={{ width: 80 }} />
                    <Autocomplete
                        freeSolo
                        fullWidth
                        onInputChange={handlePurposeNotesChange}
                        onChange={handleThreadPurposeChange}
                        options={Object.keys(purposes)}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                variant='standard' 
                                error={formError?.purpose !== undefined}
                                helperText={formError && formError.purpose}
                            />
                        }
                    />
                </Stack>
                
                <Stack direction='row' spacing={2}>
                    <Chip label='Type' variant='outlined' sx={{ width: 80 }} />
                    <Autocomplete
                        freeSolo
                        fullWidth
                        onChange={handleThreadTypeChange}
                        options={Object.keys(types)}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                variant='standard' 
                                error={formError?.type !== undefined}
                                helperText={formError && formError.type}
                            />
                        }
                    />
                </Stack>

                <Stack direction='row' spacing={2}>
                    <Chip label='Tag' variant='outlined' sx={{ width: 80 }} />
                    <TextField
                        fullWidth
                        name='tagId'
                        variant='standard'
                        select
                        value={formData.tagId ? formData.tagId : 0}
                        onChange={handleTegChange}
                    >
                        <MenuItem value={0}>None</MenuItem>
                        {threadTags && threadTags.getAllThreadTags.map(tag => (
                            <MenuItem key={tag.tagId} value={tag.tagId}>{tag.tagName}</MenuItem>
                        ))}
                    </TextField>
                </Stack>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Date Due"
                        views={["year", "month", "day"]}
                        value={dayjs(formData.dateDue)} 
                        onChange={handleDateDueChange} 
                        format="MMMM DD, YYYY"
                    />
                </LocalizationProvider>

                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={formData.attachments} 
                            onChange={handleToggleAttachments} 
                        />
                    } 
                    label="Attachments Required" 
                />

                <ReplyBox userId={props.userId} onChange={(data) => setMessageData(data)} />

                <Snackbar open={formError?.general !== undefined} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {formError && formError.general}
                    </Alert>
                </Snackbar>
            </Stack>
        </Box>
    </Paper>
  )
}