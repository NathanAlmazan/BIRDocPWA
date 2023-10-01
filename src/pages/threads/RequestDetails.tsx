import React from 'react';
import { DocumentPurpose, DocumentTypes, Thread, ThreadTags, UserAccounts } from '../../api/threads/types';
// mui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// icons
import SaveIcon from '@mui/icons-material/Save';
// project imports
import SignatureDialog from './Signature';
import { LoadOverlay } from '../../components/Loaders';
// renderer
import { PDFDownloadLink } from '@react-pdf/renderer';
import Form2309 from '../../components/Form2309';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import { UPLOAD_SIGNATURE } from '../../api/offices';
import { 
    GET_ALL_THREAD_PURPOSE, 
    GET_ALL_THREAD_TAGS, 
    GET_ALL_THREAD_TYPES, 
    UPDATE_THREAD
} from '../../api/threads';



export interface Form2309Data {
    subject: string;
    remarks: string;
    signatureUrl: string | null;
}

interface Queue {
    [key: string]: number
}

interface ThreadUpdate {
    subject: string;
    docTypeId: number;
    purposeId: number;
    tagId: number | null;
    purposeNotes: string;
    dateDue: string;
}

export default function RequestDetails({ userId, thread, onGenerate }: { userId: string, thread: Thread, onGenerate: () => void }) {
    // Queries
    const { data: threadTypes } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES);
    const { data: threadPurposes } = useQuery<{ getAllThreadPurpose: DocumentPurpose[] }>(GET_ALL_THREAD_PURPOSE);
    const { data: threadTags } = useQuery<{ getAllThreadTags: ThreadTags[] }>(GET_ALL_THREAD_TAGS);

    // Mutations
    const [uploadSignature, { error: signError }] = useMutation<{ updateSignature: UserAccounts }>(UPLOAD_SIGNATURE);
    const [updateThread, { error: updateError }] = useMutation<{ updateThread: Thread[] }>(UPDATE_THREAD);
    const [formData, setFormData] = React.useState<Form2309Data>({
        subject: '',
        remarks: '',
        signatureUrl: null
    });
    const [threadUpdate, setThreadUpdate] = React.useState<ThreadUpdate>({
        subject: thread.subject,
        dateDue: new Date(thread.dateDue).toISOString(),
        tagId: thread.threadTag ? thread.threadTag.tagId : null,
        purposeNotes: thread.purposeNotes ? thread.purposeNotes : '',
        docTypeId: thread.docType.docId,
        purposeId: thread.purpose.purposeId
      })
    const [types, setTypes] = React.useState<Queue>();
    const [purposes, setPurposes] = React.useState<Queue>();
    const [upload, setUpload] = React.useState<File | null>(null);
    const [open, setOpen] = React.useState<boolean>(false);
    const [updated, setUpdated] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (threadTypes && threadPurposes) {
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
      }, [threadTypes, threadPurposes]);

    React.useEffect(() => {
        setFormData(state => ({
            ...state,
            subject: thread.subject,
            remarks: thread.messages[0].message
        }))
    }, [thread])

    React.useEffect(() => {
        const uploadForm = async () => {
            if (upload) {
                const form = new FormData();
                form.append("form", upload);
                form.append("requestId", thread.refId);

                try {
                    const result = await axios.post(process.env.REACT_APP_FORMS_URL as string, form);
                    window.open(result.data.fileUrl, "_blank");

                    onGenerate();
                } catch (err) {
                    console.log(err);
                    return
                }

                setUpload(null);
            }
        }

        uploadForm();
    }, [upload, onGenerate, thread.refId]);

    React.useEffect(() => {
        setThreadUpdate(state => ({ ...state, subject: formData.subject }))
    }, [formData.subject])

    if (!types || !purposes) return <LoadOverlay open={true} />

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleThreadTypeChange = (_: any, newValue: string | null) => setThreadUpdate({ ...threadUpdate, docTypeId: types[newValue as string] });

    const handleThreadPurposeChange = (_: any, newValue: string | null) => setThreadUpdate({ ...threadUpdate, purposeId: purposes[newValue as string] });

    const handlePurposeNotesChange = (_: any, newValue: string) => setThreadUpdate({ ...threadUpdate, purposeNotes: newValue });

    const handleTegChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (value === 0) setThreadUpdate({ ...threadUpdate, tagId: null });
        else setThreadUpdate({ ...threadUpdate, tagId: value });
    }

    const handleDateDueChange = (date: Dayjs | null) => {
        if (date) setThreadUpdate({ ...threadUpdate, dateDue: date.toISOString() });
    }
    

    const handleUploadForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setUpload(event.target.files[0]);
    }

    const handleGenerateForm = async (blob: Blob | null, url: string | null) => {
        if (url && blob) {
            window.open(url, "_blank");

            const file = new File([blob], `${thread.refSlipNum}.pdf`, {
                type: "application/pdf",
            });

            const form = new FormData();
            form.append("form", file);
            form.append("requestId", thread.refId);

            try {
                await axios.post(process.env.REACT_APP_FORMS_URL as string, form);
                onGenerate();
            } catch (err) {
                console.log(err);
                return
            }
        }
    }

    const handleToggleSignature = () => setOpen(!open);

    const handleSubmitESignature = async (url: string) => {
        setFormData({ ...formData, signatureUrl: url });
        await uploadSignature({
            variables: {
                userId: userId,
                signImage: url
            }
        })
        setUpdated(true);
    }

    const handleRemoveSignature = async () => {
        setFormData({ ...formData, signatureUrl: null });
        await uploadSignature({
            variables: {
                userId: userId,
                signImage: null
            }
        })
        setUpdated(true);
    }

    const handleUpdateThread = async () => {
        await updateThread({ variables: { data: { ...threadUpdate, refNum: thread.refSlipNum }}});
        onGenerate();
        setUpdated(true);
    }

    return (
        <Stack spacing={3} sx={{ p: 2 }}>

            <Stack direction='row' spacing={1} justifyContent='flex-end' alignItems='center'>
                <Button variant='contained' startIcon={<SaveIcon />} onClick={handleUpdateThread}>Save Changes</Button>
                <Button variant='outlined' onClick={handleToggleSignature}>Add Signature</Button>
                {thread.author.signImage && (
                    <Button variant='outlined' color='error' onClick={handleRemoveSignature}>Remove Signature</Button>
                )}
            </Stack>

            <Stack direction='row' spacing={2}>
                <Chip label='Subject' variant='outlined' sx={{ width: 80 }} /> 
                <TextField
                    multiline
                    fullWidth
                    variant='standard'
                    name='subject'
                    value={formData.subject}
                    onChange={handleTextChange}
                />
            </Stack>

            <Stack direction='row' spacing={2}>
                <Chip label='Purpose' variant='outlined' sx={{ width: 80 }} />
                <Autocomplete
                    freeSolo
                    fullWidth
                    defaultValue={thread.purpose.purposeName}
                    onInputChange={handlePurposeNotesChange}
                    onChange={handleThreadPurposeChange}
                    options={Object.keys(purposes)}
                    renderInput={(params) => 
                        <TextField 
                            {...params} 
                            variant='standard' 
                        />
                    }
                />
            </Stack>
            
            <Stack direction='row' spacing={2}>
                <Chip label='Type' variant='outlined' sx={{ width: 80 }} />
                <Autocomplete
                    freeSolo
                    fullWidth
                    defaultValue={thread.docType.docType}
                    onChange={handleThreadTypeChange}
                    options={Object.keys(types)}
                    renderInput={(params) => 
                        <TextField 
                            {...params} 
                            variant='standard' 
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
                    value={threadUpdate.tagId ? threadUpdate.tagId : 0}
                    onChange={handleTegChange}
                >
                    <MenuItem value={0}>None</MenuItem>
                    {threadTags && threadTags.getAllThreadTags.map(tag => (
                        <MenuItem key={tag.tagId} value={tag.tagId}>{tag.tagName}</MenuItem>
                    ))}
                </TextField>
            </Stack>

            <Stack direction='row' spacing={2}>
                <Chip label='Remarks' variant='outlined' sx={{ width: 80 }} /> 
                <TextField
                    multiline
                    fullWidth
                    variant='standard'
                    name='remarks'
                    value={formData.remarks}
                    onChange={handleTextChange}
                />
            </Stack>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Date Due"
                    views={["year", "month", "day"]}
                    value={dayjs(threadUpdate.dateDue)} 
                    onChange={handleDateDueChange} 
                    format="MMMM DD, YYYY"
                />
            </LocalizationProvider>

            <PDFDownloadLink document={<Form2309 thread={thread} details={formData} />} fileName={`${thread.subject}.pdf`}>
                {({ blob, url, loading, error }) => (
                     <Button 
                        fullWidth 
                        onClick={() => handleGenerateForm(blob, url)}
                        variant='contained'>
                            Generate Form 2309
                    </Button>
                )}
            </PDFDownloadLink>
           
            <Button 
                fullWidth 
                disabled={upload !== null}
                component='label'
                variant='outlined'>
                    Upload Form 2309

                    <input type='file' hidden onChange={handleUploadForm} />
            </Button>

            <SignatureDialog 
                open={open}
                imageUrl={formData.signatureUrl}
                onSubmit={handleSubmitESignature}
                onClose={handleToggleSignature}
            />

            <Snackbar open={updated} autoHideDuration={6000} onClose={() => setUpdated(false)}>
                <Alert onClose={() => setUpdated(false)} severity={updateError || signError ? "error" : "success"} sx={{ width: '100%' }}>
                    {updateError || signError ? "Failed to save changes." : "Saved changes successfully!"}
                </Alert>
            </Snackbar>
        </Stack>
    );
}