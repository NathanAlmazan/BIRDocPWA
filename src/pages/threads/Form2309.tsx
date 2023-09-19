import React from 'react';
import { Thread, UserAccounts } from '../../api/threads/types';
// mui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// project imports
import SignatureDialog from './Signature';
// renderer
import { PDFDownloadLink } from '@react-pdf/renderer';
import Form2309 from '../../components/Form2309';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { UPLOAD_SIGNATURE } from '../../api/offices';


export interface Form2309Data {
    subject: string;
    remarks: string;
    signatureUrl: string | null;
}

export default function EditForm2309({ userId, thread, onGenerate }: { userId: string, thread: Thread, onGenerate: () => void }) {
    const [uploadSignature, { error }] = useMutation<{ updateSignature: UserAccounts }>(UPLOAD_SIGNATURE);
    const [formData, setFormData] = React.useState<Form2309Data>({
        subject: '',
        remarks: '',
        signatureUrl: null
    });
    const [upload, setUpload] = React.useState<File | null>(null);
    const [open, setOpen] = React.useState<boolean>(false);

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

    const handleToggleSignature = () => setOpen(!open);

    const handleSubmitESignature = async (url: string) => {
        setFormData({ ...formData, signatureUrl: url });
        await uploadSignature({
            variables: {
                userId: userId,
                signImage: url
            }
        })
    }

    const handleRemoveSignature = async () => {
        setFormData({ ...formData, signatureUrl: null });
        await uploadSignature({
            variables: {
                userId: userId,
                signImage: null
            }
        })
    }

    return (
        <Stack spacing={3} sx={{ p: 2 }}>

            {error && (
                <Alert severity='error'>{error.message}</Alert> 
            )}


            <Stack direction='row' spacing={1} justifyContent='flex-end' alignItems='center'>
                <Button variant='outlined' onClick={handleToggleSignature}>Add Signature</Button>
                {thread.author.signImage && (
                    <Button variant='outlined' color='error' onClick={handleRemoveSignature}>Remove Signature</Button>
                )}
            </Stack>

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

            <SignatureDialog 
                open={open}
                imageUrl={formData.signatureUrl}
                onSubmit={handleSubmitESignature}
                onClose={handleToggleSignature}
            />
        </Stack>
    );
}