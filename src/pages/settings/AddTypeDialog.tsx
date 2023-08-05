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
import { DocumentTypes } from '../../api/threads/types';
import { CREATE_DOCUMENT_TYPE } from '../../api/settings';

interface AddTypeDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function AddTypeDialog(props: AddTypeDialogProps) {
    const [addDocumentType, { loading }] = useMutation<{ addThreadType: DocumentTypes }, { label: string }>(CREATE_DOCUMENT_TYPE);

    const [label, setLabel] = React.useState<string>("");

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setLabel(event.target.value);
    
    const handleSubmitType = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addDocumentType({
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
                    <DialogTitle>Add Document Type</DialogTitle>
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