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
import CloseIcon from '@mui/icons-material/Close';
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
import { 
  settings, 
  dashboardPaths,
  inboxPaths,
  regionPaths,
  sentPaths 
} from '../../routes/paths';
// redux
import { useAppSelector } from '../../redux/hooks';
import subscribeUser from '../../subscription';
// api
import { useLazyQuery } from '@apollo/client';
import { Thread } from '../../api/threads/types';
import { SEARCH_THREAD } from '../../api/threads';

const drawerWidth = 280;

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
  const { uid, role } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const theme = useTheme();
  const [searchThread, { data: options, loading }] = useLazyQuery<{ searchThread: Thread[] }>(SEARCH_THREAD);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>('');
  const [selected, setSelected] = React.useState<Thread | null>(null);

  React.useEffect(() => {
    if (!uid) navigate("/auth/login")
    else subscribeUser(uid);
  }, [uid, navigate])

  React.useEffect(() => {
    if (selected) {
      if (selected.author.accountId === uid) {
        if (!selected.active) navigate(`/app/sent/archived/${selected.refId}`);
        else if (!selected.completed && selected.actionable) navigate(`/app/sent/pending/${selected.refId}`);
        else if (!selected.actionable) navigate(`/app/sent/memos/${selected.refId}`)
        else if (selected.completed && selected.actionable) navigate(`/app/sent/completed/${selected.refId}`)
      } else {
        if (!selected.completed && selected.actionable) navigate(`/app/inbox/tasks/${selected.refId}`);
        else if (!selected.actionable) navigate(`/app/inbox/memos/${selected.refId}`)
        else if (selected.completed && selected.actionable) navigate(`/app/inbox/finished/${selected.refId}`)
      }
    }
  }, [selected, navigate, uid])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    setQuery('');
    setSelected(null);
    navigate('/app/inbox/tasks')
  }

  const handleNavigateToPage = (url: string) => {
    setQuery('');
    setSelected(null);
    navigate(url)
  }

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                options={options ? options.searchThread : [] as Thread[]}
                value={selected}
                loading={loading}
                onChange={(_: any, newValue: Thread | null) => {
                  setSelected(newValue);
                }}
                inputValue={query}
                onInputChange={(_, newInputValue) => {
                  setQuery(newInputValue);
                  searchThread({
                    variables: {
                      userId: uid,
                      query: newInputValue
                    }
                  })
                }}
                isOptionEqualToValue={(option, value) => option.refId === value.refId}
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
                          {selected ? (
                            <IconButton onClick={handleRefresh}>
                              <CloseIcon />
                            </IconButton>
                          ): (
                            <SearchIcon />
                          )}
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
          {dashboardPaths.map(path => (
            <ListItem key={path.url} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleNavigateToPage(path.url)}
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

        <Divider textAlign='left' sx={{ fontSize: 12 }}>{open && "My Inbox"}</Divider>

        <List>
          {inboxPaths.map(path => (
            <ListItem key={path.url} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleNavigateToPage(path.url)}
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

        <Divider textAlign='left' sx={{ fontSize: 12 }}>{open && "Sent Requests"}</Divider>

        <List>
          {sentPaths.map(path => (
            <ListItem key={path.url} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleNavigateToPage(path.url)}
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

        {role && role.superuser && (
          <>
           <Divider textAlign='left' sx={{ fontSize: 12 }}>{open && "Regional Inbox"}</Divider>

            <List>
              {regionPaths.map(path => (
                <ListItem key={path.url} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleNavigateToPage(path.url)}
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
          </>
        )}

        {role && !['Technical Staff', 'Administrative Officer/Staff'].includes(role.roleName) && (
          <>
            <Divider textAlign='left' sx={{ fontSize: 12 }}>{open && "Configurations"}</Divider>
            <List>
              {settings.filter(setting => setting.label !== "Settings" || role.superuser).map(path => (
                <ListItem key={path.url} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleNavigateToPage(path.url)}
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
          </>
        )}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#EEEEEE", height: "100vh" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
