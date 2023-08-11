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
import { GET_ALL_BIR_OFFICES, USER_LOGIN } from '../../api/offices';
// redux
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slice/auth';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
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
    password: string;
}

export default function LoginUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: offices } = useQuery<{ getAllBirOffices: BirOffices[] }>(GET_ALL_BIR_OFFICES);
  const [userLogin, { data: userAccount, error }] = useMutation<{ userLogin: UserAccounts }>(USER_LOGIN);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [credentials, setCredentials] = React.useState<RegisterUserForm>({
    firstName: "",
    lastName: "",
    officeId: 1,
    sectionId: 1,
    password: ""
  })
  const { firstName, lastName, officeId, sectionId, password } = credentials;

  React.useEffect(() => {
    if (userAccount) {
        dispatch(login({
            uid: userAccount.userLogin.accountId,
            username: userAccount.userLogin.firstName + " " + userAccount.userLogin.lastName,
            position: userAccount.userLogin.position,
            office: {
                sectionId: userAccount.userLogin.officeSection.sectionId,
                sectionName: userAccount.userLogin.officeSection.sectionName,
                admin: userAccount.userLogin.officeSection.admin,
                officers: [],
                sectionOffice: {
                    officeId: userAccount.userLogin.officeSection.sectionOffice.officeId,
                    officeName: userAccount.userLogin.officeSection.sectionOffice.officeName,
                    officeSections: []
                }
            }
        }));
        navigate("/app/dashboard");
    }
  }, [userAccount, navigate, dispatch])

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  const handleRegisterUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        await userLogin({
            variables: {
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    officeId: sectionId,
                    password: password
                }
            }
        })
    } catch (err) {}
  }

  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4" gutterBottom>
              Sign In
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
                    {offices.getAllBirOffices.find(office => office.officeId === officeId)?.officeSections.filter((section, index, arr) => section.sectionName !== "default" || arr.length === 1).map(section => (
                        <MenuItem key={section.sectionId} value={section.sectionId}>{section.sectionName === "default" ? "Main" : section.sectionName}</MenuItem>
                    ))}
                </TextField>
            )}

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
                Login
            </Button>
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <Link variant="subtitle2" onClick={() => navigate("/auth/register")} sx={{ cursor: 'pointer' }}>
            Register Account
          </Link>
        </Typography>
      </ContentStyle>
    </Container>
  );
}

