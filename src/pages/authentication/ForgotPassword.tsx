import React from 'react';
import { useNavigate } from "react-router-dom"
// material
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// api
import { useMutation, useQuery } from '@apollo/client';
import { BirOffices, Roles, UserAccounts } from '../../api/threads/types';
import { GET_ALL_BIR_OFFICES, GET_ALL_ROLES, USER_REGISTER } from '../../api/offices';
import { getFilteredOffices } from './LoginUser';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export interface RegisterUserForm {
    firstName: string;
    lastName: string;
    officeId: number;
    sectionId: number;
    roleId: number;
    resetCode: string;
    password: string;
}

export default function RegisterUser() {
  const navigate = useNavigate();
  const { data: offices } = useQuery<{ getAllBirOffices: BirOffices[] }>(GET_ALL_BIR_OFFICES);
  const { data: roles } = useQuery<{ getAllRoles: Roles[] }>(GET_ALL_ROLES);
  const [registerUser, { data: userAccount, error }] = useMutation<{ changePassword: UserAccounts }>(USER_REGISTER);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [showSections, setShowSections] = React.useState<boolean>(true);
  const [selectedOffice, setSelectedOffice] = React.useState<BirOffices>();
  const [credentials, setCredentials] = React.useState<RegisterUserForm>({
    firstName: "",
    lastName: "",
    officeId: 3,
    sectionId: 3,
    password: "",
    roleId: 9,
    resetCode: ""
  })
  const { firstName, lastName, officeId, sectionId, roleId, password, resetCode } = credentials;

  React.useEffect(() => {
    if (offices) {
        const selected = offices.getAllBirOffices.find(office => office.officeId === officeId);
        setSelectedOffice(selected);

        if (selected && [3, 4, 5, 6].includes(roleId)) {
            setShowSections(false);
            setCredentials(state => ({ ...state, sectionId: selected.officeSections[0].sectionId }));
        }
        else if (selected && selected.officeSections.length > 1) {
            setShowSections(true);
            setCredentials(state => ({ ...state, sectionId: selected.officeSections[1].sectionId }));
        }
        else if (selected) {
            setShowSections(false);
            setCredentials(state => ({ ...state, sectionId: selected.officeSections[0].sectionId }));
        }
    }
  }, [officeId, offices, roleId]);

  React.useEffect(() => {
    if (roleId === 1) {
        setShowSections(false);
        setCredentials(state => ({ ...state, sectionId: 1, officeId: 1 }));
    } else if (roleId === 2) {
        setShowSections(false);
        setCredentials(state => ({ ...state, sectionId: 2, officeId: 2 }));
    } else if (offices) {
        setCredentials(state => ({ ...state, officeId: offices.getAllBirOffices.filter(office => getFilteredOffices(roleId, office.officeId))[0].officeId }));
    }
  }, [roleId, offices])

  React.useEffect(() => {
    if (userAccount) navigate("/auth/login");
  }, [userAccount, navigate])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        await registerUser({
            variables: {
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    officeId: sectionId,
                    roleId: roleId,
                    resetCode: resetCode,
                    password: password
                }
            }
        })
    } catch (err) {}
  }

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack sx={{ mb: 2 }}>
          <Typography variant="h4" gutterBottom>
              Reset Password
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Enter credentials below to reset password.</Typography>
        </Stack>
        
        {error && (
            <Alert severity='error' sx={{ my: 2 }}>{error.message}</Alert>
        )}

        <Stack spacing={2} component='form' onSubmit={handleRegisterUser}>
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

            {roles && (
                <TextField 
                    name='roleId'
                    label='Position'
                    value={roleId}
                    onChange={handleTextChange}
                    fullWidth
                    required
                    select
                >
                    {roles.getAllRoles.map(role => (
                        <MenuItem key={role.roleId} value={role.roleId}>{role.roleName}</MenuItem>
                    ))}
                </TextField>
            )}

            {offices && (
                <TextField 
                    name='officeId'
                    label='Office'
                    value={officeId}
                    onChange={handleTextChange}
                    fullWidth
                    required
                    select
                >
                    {offices.getAllBirOffices.filter(office => getFilteredOffices(roleId, office.officeId)).map(office => (
                        <MenuItem key={office.officeId} value={office.officeId}>{office.officeName}</MenuItem>
                    ))}
                </TextField>
            )}

            {showSections && selectedOffice && selectedOffice.officeSections.length > 1 && (
                <TextField 
                    name='sectionId'
                    label='Section'
                    value={sectionId}
                    onChange={handleTextChange}
                    fullWidth
                    required
                    select
                >
                    {selectedOffice.officeSections.filter(section => section.sectionName !== "default").map(section => (
                        <MenuItem key={section.sectionId} value={section.sectionId}>{section.sectionName === "default" ? "Main" : section.sectionName}</MenuItem>
                    ))}
                </TextField>
            )}

            <TextField 
                autoComplete='off'
                name='resetCode'
                label='Reset Code'
                value={resetCode}
                onChange={handleTextChange}
                fullWidth
                required
                helperText={'Please ask your Division Chief or System Admin for your Reset Code'}
                inputProps={{ min: 6, max: 6 }}
            />

            <TextField
                fullWidth
                type={visible ? 'text' : 'password'}
                label="New Password"
                name='password'
                required
                value={password}
                onChange={handleTextChange}
                inputProps={{ minLength: 8 }}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setVisible(!visible)} edge="end">
                            {visible ?  <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                )
                }}
            />

            <Button
                type='submit'
                variant='contained'
                color='secondary'
                fullWidth
            >
                Reset Password
            </Button>
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Link variant="subtitle2" onClick={() => navigate("/auth/login")} sx={{ cursor: 'pointer' }}>
            Go Back to Login
          </Link>
        </Typography>
      </ContentStyle>
    </Container>
  );
}

