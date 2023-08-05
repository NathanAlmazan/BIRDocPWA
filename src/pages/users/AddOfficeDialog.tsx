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
import { ADD_BIR_OFFICE } from '../../api/offices';
import { BirOffices } from '../../api/threads/types';

interface AddOfficeDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function AddOfficeDialog(props: AddOfficeDialogProps) {
    const [addBirOffice, { loading }] = useMutation<{ addBirOffice: BirOffices }, {
        data: {
            officeName: string,
            officeSections?: string[]    
        }
    }>(ADD_BIR_OFFICE);

    const [officeName, setOfficeName] = React.useState<string>("");

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setOfficeName(event.target.value);
    
    const handleSubmitOffice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addBirOffice({
            variables: {
                data: {
                    officeName: officeName,
                    officeSections: ['default']
                }
            }
        })

        setOfficeName("");
        props.onSubmit();
        props.onClose();
    }

    return (
        <React.Fragment>
            <LoadOverlay open={loading} />
            <Dialog open={props.open} onClose={props.onClose} maxWidth="md">
                <form onSubmit={handleSubmitOffice}>
                    <DialogTitle>Add Office</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="officeName"
                            label="Office Name"
                            value={officeName}
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