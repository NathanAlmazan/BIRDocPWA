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
import { 
    ADD_SECTION_OFFICE, 
    DELETE_SECTION_OFFICE, 
    UPDATE_SECTION_OFFICE 
} from '../../api/offices';
import { OfficeSections } from '../../api/threads/types';

interface AddSectionDialogProps {
    officeId: number;
    section: OfficeSections | null;
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export default function AddSectionDialog(props: AddSectionDialogProps) {
    const [addOfficeSection, { loading: addLoad }] = useMutation<{ addOfficeSection: OfficeSections }, {
        officeId: number,
        sectionName: string 
    }>(ADD_SECTION_OFFICE);

    const [updateOfficeSection, { loading: updateLoad }] = useMutation<{ updateSection: OfficeSections }, {
        sectionId: number,
        sectionName: string 
    }>(UPDATE_SECTION_OFFICE);

    const [deleteOfficeSection, { loading: deleteLoad }] = useMutation<{ deleteOfficeSection: OfficeSections }, {
        sectionId: number
    }>(DELETE_SECTION_OFFICE);

    const [sectionName, setSectionName] = React.useState<string>("");

    React.useEffect(() => {
        if (props.section) setSectionName(props.section.sectionName);
    }, [props.section])

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSectionName(event.target.value);
    
    const handleSubmitOffice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addOfficeSection({
            variables: {
                officeId: props.officeId,
                sectionName: sectionName
            }
        })

        setSectionName("");
        props.onSubmit();
        props.onClose();
    }

    const handleUpdateOffice = async () => {
        if (props.section) {
            await updateOfficeSection({
                variables: {
                    sectionId: props.section.sectionId,
                    sectionName: sectionName
                }
            })

            setSectionName("");
            props.onSubmit();
            props.onClose();
        }
    }

    const handleDeleteSection = async () => {
        if (props.section) {
            await deleteOfficeSection({
                variables: {
                    sectionId: props.section.sectionId
                }
            })

            setSectionName("");
            props.onSubmit();
            props.onClose();
        }
    }

    return (
        <React.Fragment>
            <LoadOverlay open={addLoad || updateLoad || deleteLoad} />
            <Dialog open={props.open} onClose={props.onClose} maxWidth="md">
                <form onSubmit={handleSubmitOffice}>
                    <DialogTitle>{props.section ? "Edit Section" : "Add Section"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="sectionName"
                            label="Section Name"
                            value={sectionName}
                            onChange={handleTextChange}
                            fullWidth
                            variant="standard"
                            required
                            sx={{ width: 400 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        {props.section ? (
                            <>
                                <Button onClick={props.onClose}>Cancel</Button>
                                <Button onClick={handleUpdateOffice}>Update</Button>
                                <Button onClick={handleDeleteSection} color='error' disabled={props.section && props.section.officers.length > 0}>Delete</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={props.onClose}>Cancel</Button>
                                <Button type="submit">Add</Button>
                            </>
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}