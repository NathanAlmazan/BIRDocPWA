import React from 'react';
// mui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// api
import { useMutation } from '@apollo/client';
import { BirOffices, OfficeSections, UserAccounts } from '../../api/threads/types';
import { DELETE_OFFICER, REGISTER_OFFICER, UPDATE_OFFICER } from '../../api/offices';

interface AccountRegister {
    accountId: string;
    firstName: string;
    lastName: string;
    position: string;
    resetCode: string | null;
    officeId: number;
}

interface AddOfficerDrawerProps {
    open: boolean;
    section: OfficeSections;
    office: BirOffices;
    officer: UserAccounts | null;
    onClose: () => void;
    onSubmit: () => void;
}

export default function OfficerDrawer(props: AddOfficerDrawerProps) {
    const [registerOfficer] = useMutation(REGISTER_OFFICER);
    const [updateOfficer] = useMutation(UPDATE_OFFICER);
    const [deleteOfficer] = useMutation(DELETE_OFFICER);
    const [formData, setFormData] = React.useState<AccountRegister>({
        accountId: '',
        firstName: '',
        lastName: '',
        officeId: props.section.sectionId,
        position: '',
        resetCode: null
    })
    const { firstName, lastName, position, resetCode, officeId, accountId } = formData;

    React.useEffect(() => {
        if (props.officer) {
            setFormData({
                accountId: props.officer.accountId,
                firstName: props.officer.firstName,
                lastName: props.officer.lastName,
                officeId: props.section.sectionId,
                position: props.officer.position,
                resetCode: props.officer.resetCode
            })
        }
    }, [props.officer, props.section])

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmitOfficer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await registerOfficer({
            variables: {
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    officeId: officeId,
                    position: position
                }
            }
        })

        setFormData({
            accountId: '',
            firstName: '',
            lastName: '',
            officeId: props.section.sectionId,
            position: '',
            resetCode: null
        })

        props.onSubmit();
        props.onClose();
    }

    const handleUpdateOfficer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await updateOfficer({
            variables: {
                data: {
                    accountId: accountId,
                    firstName: firstName,
                    lastName: lastName,
                    position: position
                }
            }
        })

        setFormData({
            accountId: '',
            firstName: '',
            lastName: '',
            officeId: props.section.sectionId,
            position: '',
            resetCode: null
        })

        props.onSubmit();
        props.onClose();
    }

    const handleDeleteOfficer = async () => {
        await deleteOfficer({
            variables: {
                accountId: accountId
            }
        })

        setFormData({
            accountId: '',
            firstName: '',
            lastName: '',
            officeId: props.section.sectionId,
            position: '',
            resetCode: null
        })

        props.onSubmit();
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth='md'>
            <DialogTitle>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='h6'>
                        {props.officer ? "Update Officer" : "Register Officer"}
                    </Typography>
                    
                    {props.officer && (
                        <IconButton color='error' onClick={handleDeleteOfficer}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    )}
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Stack component='form' onSubmit={props.officer ? handleUpdateOfficer : handleSubmitOfficer} spacing={3} sx={{ width: 500, mt: 2 }}>
                    <TextField 
                        name='firstName'
                        label='First Name'
                        value={firstName}
                        onChange={handleTextChange}
                        required
                    />

                    <TextField 
                        name='lastName'
                        label='Last Name'
                        value={lastName}
                        onChange={handleTextChange}
                        required
                    />

                    <TextField 
                        name='Office'
                        label='Office'
                        value={props.office.officeName}
                        required
                    />

                    {props.section.sectionName !== "default" && (
                        <TextField 
                            name='section'
                            label='Section'
                            value={props.section.sectionName}
                            required
                        />
                    )}

                    <TextField 
                        name='position'
                        label='Position'
                        value={position}
                        onChange={handleTextChange}
                        required
                    />

                    {resetCode && (
                        <TextField 
                            name='resetCode'
                            label='Reset Code'
                            value={resetCode}
                        />
                    )}
                 

                    <Stack spacing={1}>
                        <Button 
                            type='submit'
                            variant='contained'
                            fullWidth
                        >
                            {props.officer ? "Update" : "Register"}
                        </Button>

                        <Button 
                            variant='outlined'
                            onClick={props.onClose}
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </Stack>

                </Stack>
            </DialogContent>
        </Dialog>
    )
}