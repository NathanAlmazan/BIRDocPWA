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
import { BirOffices, UserAccounts } from '../../api/threads/types';
import { GET_ALL_BIR_OFFICES, USER_REGISTER } from '../../api/offices';

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
    resetCode: string;
    password: string;
}

export default function RegisterUser() {
  const navigate = useNavigate();
  const { data: offices } = useQuery<{ getAllBirOffices: BirOffices[] }>(GET_ALL_BIR_OFFICES);
  const [registerUser, { data: userAccount, error }] = useMutation<{ changePassword: UserAccounts }>(USER_REGISTER);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<RegisterUserForm>({
    firstName: "",
    lastName: "",
    officeId: 1,
    sectionId: 1,
    password: "",
    resetCode: ""
  })
  const { firstName, lastName, officeId, sectionId, password, resetCode } = credentials;

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
              Register Account
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Enter your credentials below.</Typography>
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
                    {offices.getAllBirOffices.map(office => (
                        <MenuItem key={office.officeId} value={office.officeId}>{office.officeName}</MenuItem>
                    ))}
                </TextField>
            )}

            {offices && (
                <TextField 
                    name='sectionId'
                    label='Section'
                    value={sectionId}
                    onChange={handleTextChange}
                    fullWidth
                    required
                    select
                >
                    {offices.getAllBirOffices.find(office => office.officeId === officeId)?.officeSections.map(section => (
                        <MenuItem key={section.sectionId} value={section.sectionId}>{section.sectionName === "default" ? "Main" : section.sectionName}</MenuItem>
                    ))}
                </TextField>
            )}

            <TextField 
                autoComplete='off'
                name='resetCode'
                label='Register Code'
                value={resetCode}
                onChange={handleTextChange}
                fullWidth
                required
                inputProps={{ min: 6, max: 6 }}
            />

            <TextField
                fullWidth
                type={visible ? 'text' : 'password'}
                label="Password"
                name='password'
                required
                value={password}
                onChange={handleTextChange}
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
                Register
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

