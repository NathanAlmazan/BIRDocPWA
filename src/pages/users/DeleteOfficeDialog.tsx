import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// project imports
import { BirOffices } from '../../api/threads/types';
import { useMutation } from '@apollo/client';
import { DELETE_BIR_OFFICE } from '../../api/offices';

interface DeleteOfficeDialogProps {
    open: boolean;
    office: BirOffices
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteOfficeDialog(props: DeleteOfficeDialogProps) {
    const [deleteBirOffice] = useMutation(DELETE_BIR_OFFICE);

    const handleDeleteOffice = async () => {
        await deleteBirOffice({
            variables: {
                officeId: props.office.officeId
            }
        })

        props.onDelete();
        props.onClose();
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.office.officeSections.filter(section => section.sectionName !== 'default').length > 0 ? "Invalid Action" : `Are you sure you want to delete ${props.office.officeName}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.office.officeSections.filter(section => section.sectionName !== 'default').length > 0 ? "You cannot delete this office because it has active sections." : "Please keep in mind that this action cannot be undone."}
                </DialogContentText>
            </DialogContent>
            {props.office.officeSections.filter(section => section.sectionName !== 'default').length === 0 ? (
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button color="error" onClick={handleDeleteOffice} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            ) : (
                <DialogActions>
                    <Button onClick={props.onClose}>Okay</Button>
                </DialogActions>
            )}
        </Dialog>
    )
}