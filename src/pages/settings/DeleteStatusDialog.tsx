import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DocumentStatus } from '../../api/threads/types';
// project imports
import { useMutation } from '@apollo/client';
import { DELETE_DOCUMENT_STATUS } from '../../api/settings';

interface DeleteStatusDialogProps {
    open: boolean;
    status: DocumentStatus
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteStatusDialog(props: DeleteStatusDialogProps) {
    const [deleteStatus] = useMutation(DELETE_DOCUMENT_STATUS);

    const handleDeleteStatus = async () => {
        await deleteStatus({
            variables: {
                statusId: props.status.statusId
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
                {props.status.threadCount !== undefined && props.status.threadCount > 0 ? "Invalid Action" : `Are you sure you want to delete ${props.status.statusLabel}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.status.threadCount !== undefined && props.status.threadCount > 0 ? "You cannot delete this status because it has active threads." : "Please keep in mind that this action cannot be undone."}
                </DialogContentText>
            </DialogContent>
            {props.status.threadCount !== undefined && props.status.threadCount === 0 ? (
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button color="error" onClick={handleDeleteStatus} autoFocus>
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