import React from 'react';
import { Thread } from '../../api/threads/types';
// mui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// renderer
import { PDFDownloadLink } from '@react-pdf/renderer';
import Form2309 from '../../components/Form2309';


export interface Form2309Data {
    subject: string;
    remarks: string;
}

export default function EditForm2309({ thread }: { thread: Thread }) {
    const [formData, setFormData] = React.useState<Form2309Data>({
        subject: '',
        remarks: ''
    })

    React.useEffect(() => {
        setFormData(state => ({
            ...state,
            subject: thread.subject,
            remarks: thread.messages[0].message
        }))
    }, [thread])

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
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
                        component='a'
                        href={url as string}
                        target='_blank'
                        variant='contained'>
                            Generate Form 2309
                    </Button>
                )}
            </PDFDownloadLink>
        </Stack>
    );
}