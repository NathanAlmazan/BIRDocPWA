import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// project imports
import { LoadOverlay } from '../../components/Loaders';
// api
import { useMutation, useQuery } from '@apollo/client';
import { 
    ADD_SECTION_OFFICE, 
    DELETE_SECTION_OFFICE, 
    GET_ALL_ROLES, 
    UPDATE_SECTION_OFFICE 
} from '../../api/offices';
import { OfficeSections, Roles } from '../../api/threads/types';

interface AddSectionDialogProps {
    officeId: number;
    section: OfficeSections | null;
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddSectionDialog(props: AddSectionDialogProps) {
    const { data: roles } = useQuery<{ getAllRoles: Roles[] }>(GET_ALL_ROLES);
    const [addOfficeSection, { loading: addLoad }] = useMutation<{ addOfficeSection: OfficeSections }, {
        officeId: number,
        sectionName: string,
        positions: number[]
    }>(ADD_SECTION_OFFICE);

    const [updateOfficeSection, { loading: updateLoad }] = useMutation<{ updateSection: OfficeSections }, {
        sectionId: number,
        sectionName: string,
        positions: number[]
    }>(UPDATE_SECTION_OFFICE);

    const [deleteOfficeSection, { loading: deleteLoad }] = useMutation<{ deleteOfficeSection: OfficeSections }, {
        sectionId: number
    }>(DELETE_SECTION_OFFICE);

    const [sectionName, setSectionName] = React.useState<string>("");
    const [positions, setPositions]  = React.useState<string[]>([]);

    React.useEffect(() => {
        if (props.section) setSectionName(props.section.sectionName);
    }, [props.section])

    React.useEffect(() => {
        if (props.section) {
            setPositions(props.section.positions ? props.section.positions.map(pos => pos.roleId.toString()) : [])
        }
    }, [props.section])

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setSectionName(event.target.value);

    const handlePositionChange = (event: SelectChangeEvent<typeof positions>) => {
        const {
          target: { value },
        } = event;
        setPositions(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };
    
    const handleSubmitOffice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await addOfficeSection({
            variables: {
                officeId: props.officeId,
                sectionName: sectionName,
                positions: positions.map(pos => parseInt(pos))
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
                    sectionName: sectionName,
                    positions: positions.map(pos => parseInt(pos))
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
                       <Stack spacing={2} sx={{ my: 2 }}>
                        <TextField
                                autoFocus
                                margin="dense"
                                name="sectionName"
                                label="Section Name"
                                value={sectionName}
                                onChange={handleTextChange}
                                fullWidth
                                variant="outlined"
                                required
                                sx={{ width: 400 }}
                            />
                             <FormControl sx={{ maxWidth: 400 }}>
                                <InputLabel id="demo-multiple-name-label">Positions</InputLabel>
                                <Select
                                    multiple
                                    value={positions}
                                    onChange={handlePositionChange}
                                    input={<OutlinedInput label="Positions" />}
                                    MenuProps={MenuProps}
                                >
                                    {roles && roles.getAllRoles.map(role => (
                                        <MenuItem key={role.roleId} value={role.roleId}>{role.roleName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                       </Stack>
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