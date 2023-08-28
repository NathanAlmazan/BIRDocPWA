import React from 'react';
// mui
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
// icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// project imports
import { useAppSelector } from '../../redux/hooks';
// api
import { useMutation, useQuery } from '@apollo/client';
import { UserAccounts } from '../../api/threads/types';
import { GET_USER_BY_ID, UPDATE_OFFICER } from '../../api/offices';


interface EditProfileDialogProps {
    open: boolean;
    onClose: () => void;
}

interface EditProfileData {
    firstName: string;
    lastName: string;
    pass: string, 
    confirmPass: string
}

export default function EditProfileDialog(props: EditProfileDialogProps) {
    const { uid } = useAppSelector((state) => state.auth);

    const { data: account } = useQuery<{ getAccountByUid: UserAccounts }>(GET_USER_BY_ID, {
        variables: {
          uid: uid
        }
    });
    const [updateUser, { error: updateError }] = useMutation<{ changePassword: UserAccounts }>(UPDATE_OFFICER);

    const [formData, setFormData] = React.useState<EditProfileData>({
        firstName: '',
        lastName: '',
        pass: '',
        confirmPass: ''
    });
    const { firstName, lastName, pass, confirmPass } = formData;
    const [error, setError] = React.useState<string | null>(null);
    const [passVisible, setPassVisible] = React.useState<boolean>(false);
    const [confirmPassVisible, setConfirmPassVisible] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (account) {
            setFormData(state => ({ ...state, firstName: account.getAccountByUid.firstName, lastName: account.getAccountByUid.lastName }));
        }
    }, [account]);

    React.useEffect(() => {
        if (updateError) {
            setError(updateError.message);
        }
    }, [updateError])

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmitNewPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (pass !== confirmPass) setError("Password did not match.");

        if (account) {
            await updateUser({
                variables: {
                    data: {
                        accountId: account.getAccountByUid.accountId,
                        firstName: firstName,
                        lastName: lastName,
                        roleId: account.getAccountByUid.role.roleId,
                        password: pass
                    }
                }
            });

            props.onClose();
        }
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth="md">
            <form onSubmit={handleSubmitNewPassword}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2, minWidth: 500 }}>
                        <TextField 
                            name='firstName'
                            label='First Name'
                            value={firstName}
                            onChange={handleTextChange}
                            fullWidth
                            required
                        />

                        <TextField 
                            name='lastName'
                            label='Last Name'
                            value={lastName}
                            onChange={handleTextChange}
                            fullWidth
                            required
                        />

                        <TextField
                            fullWidth
                            type={passVisible ? 'text' : 'password'}
                            label="Password"
                            name='pass'
                            value={pass}
                            onChange={handleTextChange}
                            error={error !== null}
                            inputProps={{ minLength: 8 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setPassVisible(!passVisible)} edge="end">
                                            {passVisible ?  <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            fullWidth
                            type={confirmPassVisible ? 'text' : 'password'}
                            label="Confirm Password"
                            name='confirmPass'
                            value={confirmPass}
                            onChange={handleTextChange}
                            error={error !== null}
                            helperText={error && error}
                            inputProps={{ minLength: 8 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setConfirmPassVisible(!confirmPassVisible)} edge="end">
                                            {confirmPassVisible ?  <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}