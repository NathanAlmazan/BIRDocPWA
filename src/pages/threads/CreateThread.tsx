import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
    Thread
} from '../../api/threads/types';
import { 
    CREATE_THREAD,
    GET_ALL_THREAD_PURPOSE,
    GET_ALL_THREAD_TYPES, 
    GET_BIR_OFFICES,
    SEND_THREAD_MESSAGE
} from '../../api/threads';
// project imports
import ReplyBox, { MessageCreateInput, MessageInput } from './ReplyBox';
import { LoadOverlay } from '../../components/Loaders';


interface ThreadInput {
    subject: string;
    authorId: string;
    statusId: number;
    recipientId?: number;
    docTypeId?: number;
    purposeId?: number;
    attachments: boolean;
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

export default function CreateThread(props: CreateThreadProps) {
  const theme = useTheme();
  const { data: officeSections } = useQuery<{ getAllOfficeSections: OfficeSections[] }>(GET_BIR_OFFICES);
  const { data: threadTypes } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES);
  const { data: threadPurposes } = useQuery<{ getAllThreadPurpose: DocumentPurpose[] }>(GET_ALL_THREAD_PURPOSE);
  const [createThread] = useMutation<{ createThread: Thread }, { data: ThreadInput }>(CREATE_THREAD);
  const [sendThreadMessage] = useMutation<{ sendMessage: Messages }, { data: MessageCreateInput }>(SEND_THREAD_MESSAGE);
  const [offices, setOffices] = React.useState<Queue>();
  const [types, setTypes] = React.useState<Queue>();
  const [purposes, setPurposes] = React.useState<Queue>();
  const [formData, setFormData] = React.useState<ThreadInput>({
    subject: "",
    authorId: props.userId,
    statusId: 2,
    attachments: true,
    completed: false,
    dateDue: new Date().toISOString()
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
                officeObject[office.sectionOffice.officeName + " — All"] = -(office.sectionOffice.officeId);
                officeObject[office.sectionOffice.officeName + " — Admin"] = office.sectionId;
            } else {
                officeObject[office.sectionOffice.officeName + " — " + office.sectionName] = office.sectionId;
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
  }, [officeSections, threadTypes, threadPurposes])

  if (!offices || !types || !purposes) return <LoadOverlay open={true} />

  const handleSubjectTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, subject: event.target.value });

  const handleThreadTypeChange = (_: any, newValue: string | null) => setFormData({ ...formData, docTypeId: types[newValue as string] });

  const handleThreadPurposeChange = (_: any, newValue: string | null) => setFormData({ ...formData, purposeId: purposes[newValue as string] });

  const handleRecipientChange = (_: any, newValue: string | null) => setFormData({ ...formData, recipientId: offices[newValue as string] });

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
            await sendThreadMessage({ variables: { data: {
                message: messageData.message,
                files: messageFiles,
                senderId: props.userId,
                threadId: threadResult.data.createThread.refId
            }}})

            props.onCreateThread(threadResult.data.createThread.refId);
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
                    <Divider />
                </div>
            
                <Stack direction='row' spacing={2}>
                    <Chip label='To' variant='outlined' sx={{ width: 80 }} />
                    <Autocomplete
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