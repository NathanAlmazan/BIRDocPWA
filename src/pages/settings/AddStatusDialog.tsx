import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// project imports
import { LoadOverlay } from '../../components/Loaders';
// api
import { useMutation } from '@apollo/client';
import { DocumentStatus } from '../../api/threads/types';
import { CREATE_DOCUMENT_STATUS } from '../../api/settings';

interface AddStatusDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function AddStatusDialog(props: AddStatusDialogProps) {
    const [addDocumentStatus, { loading }] = useMutation<{ addThreadStatus: DocumentStatus }, { label: string }>(CREATE_DOCUMENT_STATUS);

    const [label, setLabel] = React.useState<string>("");

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setLabel(event.target.value);
    
    const handleSubmitType = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addDocumentStatus({
            variables: {
                label: label
            }
        })

        setLabel("");
        props.onSubmit();
        props.onClose();
    }

    return (
        <React.Fragment>
            <LoadOverlay open={loading} />
            <Dialog open={props.open} onClose={props.onClose} maxWidth="md">
                <form onSubmit={handleSubmitType}>
                    <DialogTitle>Add Document Status</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="label"
                            label="Label"
                            value={label}
                            onChange={handleTextChange}
                            fullWidth
                            variant="standard"
                            required
                            sx={{ width: 400 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}