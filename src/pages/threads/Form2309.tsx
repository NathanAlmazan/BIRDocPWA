import React from 'react';
import { Thread } from '../../api/threads/types';
// mui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// renderer
import { PDFDownloadLink } from '@react-pdf/renderer';
import Form2309 from '../../components/Form2309';
import axios from 'axios';


export interface Form2309Data {
    subject: string;
    remarks: string;
}

export default function EditForm2309({ thread, onGenerate }: { thread: Thread, onGenerate: () => void }) {
    const [formData, setFormData] = React.useState<Form2309Data>({
        subject: '',
        remarks: ''
    });
    const [upload, setUpload] = React.useState<File | null>(null);

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

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
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

    return (
        <Stack spacing={3} sx={{ p: 2 }}>
            <TextField
                multiline
                rows={2}
                name='subject'
                label='Subject'
                value={formData.subject}
                onChange={handleTextChange}
            />

            <TextField
                multiline
                rows={3}
                name='remarks'
                label='Remarks'
                value={formData.remarks}
                onChange={handleTextChange}
            />

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
        </Stack>
    );
}