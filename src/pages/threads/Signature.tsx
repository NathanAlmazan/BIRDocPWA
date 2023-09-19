import React from 'react';
// mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import SignatureCanvas from 'react-signature-canvas';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// api 
import axios from 'axios';

interface SignatureDialogProps {
    open: boolean;
    imageUrl: string | null;
    onClose: () => void;
    onSubmit: (url: string) => void;
}

export default function SignatureDialog({ open, imageUrl, onSubmit, onClose }: SignatureDialogProps) {
    const sigPad = React.useRef<SignatureCanvas | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmitSignature = () => {
        if (sigPad.current) {
            onSubmit(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
            onClose();
        }
    }

    const handleCancel = () => {
        if (sigPad.current) {
            sigPad.current.clear();
            onClose();
        }
    }

    const handleUploadSignature = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const form = new FormData();
            form.append("files", event.target.files[0])

            try {
                const result = await axios.post(process.env.REACT_APP_MEDIA_URL as string, form);
                onSubmit(result.data.files[0].fileUrl);
                onClose();
            } catch (err) {
                setError((err as Error).message);
                return
            }
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth='md'>
            <DialogTitle>Add Signature</DialogTitle>
            <DialogContent>
                {error && (
                    <Alert severity='error'>{error}</Alert> 
                )}

                <SignatureCanvas 
                    penColor='black'
                    ref={sigPad}
                    canvasProps={{width: 500, height: 200 }}
                />
            </DialogContent>
            <DialogActions>
                <Button component='label'>
                    Upload Signature

                    <input type='file' onChange={handleUploadSignature} hidden />
                </Button>
                <Button onClick={handleSubmitSignature}>Submit Signature</Button>
                <Button color='error' onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}