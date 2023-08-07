import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// mui
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
// project imports
import AccountPopover from './AccountPopover';
import NotificationPopover from './NotificationsPopover';
// paths
import { settings, paths } from '../../routes/paths';
// redux
import { useAppSelector } from '../../redux/hooks';
import subscribeUser from '../../subscription';
// api
import { useQuery } from '@apollo/client';
import { Thread } from '../../api/threads/types';
import { GET_SENT_THREAD, GET_THREAD_INBOX } from '../../api/threads';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: 'none',
  backdropFilter: `blur(6px)`,
  WebkitBackdropFilter: `blur(6px)`,
  backgroundColor: theme.palette.background.paper,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const formatInboxDate = (date: string | Date) => {
  const target = new Date(date);
  return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function EmailLayout() {
  const navigate = useNavigate();
  const { uid, office } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const theme = useTheme();

  const { data: threadInbox } = useQuery<{ getThreadInbox: Thread[] }>(GET_THREAD_INBOX, {
    variables: {
      userId: uid
    }
  });
  const { data: threadCompleted } = useQuery<{ getThreadInbox: Thread[] }>(GET_THREAD_INBOX, {
    variables: {
      userId: uid,
      completed: true
    }
  });
  const { data: sentThread } = useQuery<{ getSentThread: Thread[] }>(GET_SENT_THREAD, {
    variables: {
      userId: uid
    }
  });

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>('');
  const [selected, setSelected] = React.useState<Thread | null>(null);
  const [options, setOptions] = React.useState<Thread[]>([]);

  React.useEffect(() => {
    if (!uid) navigate("/auth/login")
    else subscribeUser(uid);
  }, [uid, navigate])

  React.useEffect(() => {
    if (threadInbox && threadCompleted && sentThread) {
      setOptions(threadInbox.getThreadInbox.concat(threadCompleted.getThreadInbox).concat(sentThread.getSentThread));
    }
  }, [threadInbox, threadCompleted, sentThread])

  React.useEffect(() => {
    if (selected) {
      if (selected.author.accountId === uid) navigate(`/app/sent/${selected.refId}`);
      else if (selected.completed) navigate(`/app/sent/${selected.refId}`);
      else navigate(`/app/inbox/${selected.refId}`);
    }
  }, [selected, navigate, uid])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log(options);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <IconButton
                color="secondary"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Autocomplete 
                autoHighlight
                options={options}
                value={selected}
                onChange={(_: any, newValue: Thread | null) => {
                  setSelected(newValue);
                }}
                inputValue={query}
                onInputChange={(_, newInputValue) => {
                  setQuery(newInputValue);
                }}
                filterOptions={option => query.length === 0 ? [] : option.filter(mail => 
                  mail.subject.includes(query) || mail.docType.docType.includes(query) || mail.author.firstName.includes(query) || 
                  mail.author.lastName.includes(query) || formatInboxDate(mail.dateCreated).includes(query)
                )}
                noOptionsText={'Please type a search query'}
                getOptionLabel={(option) => option.subject}
                renderOption={(props, option) => (
                  <Stack component='li' direction="row" alignItems="center" spacing={2} {...props}>
                    <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                        <Typography color="inherit" variant="subtitle2" noWrap>
                            {option.subject}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {`${option.author.firstName} ${option.author.lastName} — ${option.docType.docType}`}
                        </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                        {`Created at ${formatInboxDate(option.dateCreated)}`}
                    </Typography>
                  </Stack>
                )}
                sx={{ minWidth: 450 }}
                renderInput={(params) => (
                  <TextField 
                    {...params}
                    variant='outlined'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: 
                        <InputAdornment position='end'>
                          <SearchIcon />
                        </InputAdornment>
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <NotificationPopover uid={uid as string} />
              <AccountPopover />
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {paths.map(path => (
            <ListItem key={path.url} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(path.url)}
                selected={path.url === pathname}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {path.icon}
                </ListItemIcon>
                <ListItemText primary={path.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {office && office.admin && (
          <List>
            {settings.map(path => (
              <ListItem key={path.url} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(path.url)}
                  selected={path.url === pathname}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {path.icon}
                  </ListItemIcon>
                  <ListItemText primary={path.label} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
      <Box 
        component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#EEEEEE", height: "100vh" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
