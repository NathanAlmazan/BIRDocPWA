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
import MenuItem from '@mui/material/MenuItem';
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
    roleId: number;
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
    const [deleteMode, setDeleteMode] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<AccountRegister>({
        accountId: '',
        firstName: '',
        lastName: '',
        officeId: props.section.sectionId,
        roleId: props.section.positions ? props.section.positions[0].roleId : 0,
        resetCode: null
    })
    const { firstName, lastName, roleId, resetCode, officeId, accountId } = formData;

    React.useEffect(() => {
        if (props.officer) {
            setFormData({
                accountId: props.officer.accountId,
                firstName: props.officer.firstName,
                lastName: props.officer.lastName,
                officeId: props.section.sectionId,
                roleId: props.officer.role.roleId,
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
                    roleId: roleId
                }
            }
        })

        setFormData({
            accountId: '',
            firstName: '',
            lastName: '',
            officeId: props.section.sectionId,
            roleId: 9,
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
                    roleId: roleId
                }
            }
        })

        setFormData({
            accountId: '',
            firstName: '',
            lastName: '',
            officeId: props.section.sectionId,
            roleId: 9,
            resetCode: null
        })

        props.onSubmit();
        props.onClose();
    }

    const handleConfirmDelete = () => setDeleteMode(!deleteMode);

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
            roleId: 9,
            resetCode: null
        })

        props.onSubmit();
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth='md'>
            <DialogTitle>
                {deleteMode ? (
                    <Typography variant='h6'>
                        {`Are you sure you want to delete ${props.officer?.firstName}?`}
                    </Typography>
                ) : (
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='h6'>
                            {props.officer ? "Update Officer" : "Register Officer"}
                        </Typography>
                        
                        {props.officer && (
                            <IconButton color='error' onClick={handleConfirmDelete}>
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        )}
                    </Stack>
                )}
            </DialogTitle>
            <DialogContent>
                {deleteMode ? (
                    <Stack spacing={3} sx={{ width: 500, mt: 2 }}>
                        <Typography variant='body1'>
                            This action cannot be undone.
                        </Typography>
                        <Stack spacing={1} direction='row' justifyContent='flex-end'>
                            <Button 
                                variant='contained'
                                onClick={handleDeleteOfficer}
                                fullWidth
                                color='error'
                            >
                                Delete
                            </Button>

                            <Button 
                                variant='outlined'
                                onClick={handleConfirmDelete}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                ) : (
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

                        {props.section.positions && (
                            <TextField 
                                name='roleId'
                                label='Position'
                                value={roleId}
                                onChange={handleTextChange}
                                fullWidth
                                required
                                select
                            >
                                {props.section.positions.map(role => (
                                    <MenuItem key={role.roleId} value={role.roleId}>{role.roleName}</MenuItem>
                                ))}
                            </TextField>
                        )}

                        {resetCode && (
                            <TextField 
                                name='resetCode'
                                label='Reset/Registration Code'
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
                )}
            </DialogContent>
        </Dialog>
    )
}