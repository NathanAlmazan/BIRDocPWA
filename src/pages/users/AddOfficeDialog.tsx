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
    ADD_BIR_OFFICE, 
    DELETE_BIR_OFFICE, 
    UPDATE_BIR_OFFICE 
} from '../../api/offices';
import { BirOffices } from '../../api/threads/types';

interface AddOfficeDialogProps {
    open: boolean;
    office: BirOffices | null;
    onClose: () => void;
    onSubmit: () => void;
}

export default function AddOfficeDialog(props: AddOfficeDialogProps) {
    const [addBirOffice, { loading: addLoad }] = useMutation<{ addBirOffice: BirOffices }, {
        data: {
            officeName: string,
            officeSections?: string[]    
        }
    }>(ADD_BIR_OFFICE);

    const [updateBirOffice, { loading: updateLoad }] = useMutation<{ updateBirOffice: BirOffices }, {
        officeId: number,
        officeName: string
    }>(UPDATE_BIR_OFFICE);

    const [deleteBirOffice, { loading: deleteLoad }] = useMutation<{ deleteBirOffice: BirOffices }, {
        officeId: number
    }>(DELETE_BIR_OFFICE);

    const [officeName, setOfficeName] = React.useState<string>("");

    React.useEffect(() => {
        if (props.office) setOfficeName(props.office.officeName);
    }, [props.office])

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

    const handleUpdateOffice = async () => {
        if (props.office) {
            await updateBirOffice({
                variables: {
                    officeId: props.office.officeId,
                    officeName: officeName
                }
            })
    
            setOfficeName("");
            props.onSubmit();
            props.onClose();
        }
    }

    const handleDeleteOffice = async () => {
       if (props.office) {
            await deleteBirOffice({
                variables: {
                    officeId: props.office.officeId
                }
            })

            setOfficeName("");
            props.onSubmit();
            props.onClose();
       }
    }


    return (
        <React.Fragment>
            <LoadOverlay open={addLoad || updateLoad || deleteLoad} />
            <Dialog open={props.open} onClose={props.onClose} maxWidth="md">
                <form onSubmit={handleSubmitOffice}>
                    <DialogTitle>{props.office ? "Edit Office" : "Add Office"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="officeName"
                            label="Office Name"
                            value={officeName}
                            onChange={handleTextChange}
                            fullWidth
                            variant="outlined"
                            required
                            sx={{ width: 400 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        {props.office ? (
                            <>
                                <Button onClick={props.onClose}>Cancel</Button>
                                <Button onClick={handleUpdateOffice}>Update</Button>
                                <Button 
                                    color='error' 
                                    onClick={handleDeleteOffice}
                                    disabled={props.office && props.office.officeSections.filter(section => section.sectionName !== 'default').length > 0}
                                >
                                    Delete
                                </Button>
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