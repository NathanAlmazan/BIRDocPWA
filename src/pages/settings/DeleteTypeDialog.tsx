import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DocumentTypes } from '../../api/threads/types';
// project imports
import { useMutation } from '@apollo/client';
import { DELETE_DOCUMENT_TYPE } from '../../api/settings';

interface DeleteTypeDialogProps {
    open: boolean;
    docType: DocumentTypes
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteTypeDialog(props: DeleteTypeDialogProps) {
    const [deleteType] = useMutation(DELETE_DOCUMENT_TYPE);

    const handleDeleteType = async () => {
        await deleteType({
            variables: {
                typeId: props.docType.docId
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
                {props.docType.threadCount && props.docType.threadCount > 0 ? "Invalid Action" : `Are you sure you want to delete ${props.docType.docType}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.docType.threadCount && props.docType.threadCount > 0 ? "You cannot delete this type because it has active threads." : "Please keep in mind that this action cannot be undone."}
                </DialogContentText>
            </DialogContent>
            {props.docType.threadCount !== undefined && props.docType.threadCount === 0 ? (
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button color="error" onClick={handleDeleteType} autoFocus>
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