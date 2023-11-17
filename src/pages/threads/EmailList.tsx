import React from 'react';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';
// icons
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
// project imports
import FilterPopover, { FilterOptions } from './FilterPopover';
import { Thread } from '../../api/threads/types';
import { LoadOverlay } from '../../components/Loaders';


interface EmailListProps {
  mode: string;
  compose: boolean;
  selectedId: string | null;
  mails?: Thread[];
  onRefresh: () => void;
  onComposeThread: () => void;
  onThreadClick: (threadId: string) => void;
}

const emptyMessages: { [key: string]: { title: string, sub: string }} = {
  "inbox": {
    title: "Job Well Done!",
    sub: "You have no active threads"
  },
  "sent": {
    title: "Compose a thread",
    sub: "You have no created threads"
  }
}

const getTagColor = (tagName: string) => {
  if (tagName === "Top Priority") return "error";
  else if (tagName === "Confidential") return "warning";
  return "primary"
}

const formatInboxDate = (date: string | Date) => {
  const target = new Date(date);
  return target.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

export default function EmailList(props: EmailListProps) {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [options, setOptions] = React.useState<FilterOptions>({
    typeId: 0,
    statusId: 0,
    tagId: 0,
    sortBy: "due_desc"
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      props.mails?.filter(mail => 
          (mail.status.statusId === options.statusId || options.statusId === 0) &&
          (mail.docType.docId === options.typeId || options.typeId === 0) &&
          (mail.threadTag?.tagId === options.tagId || options.tagId === 0))
        .sort((a, b) => {
          switch (options.sortBy) {
            case "crt_asc": 
              return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
            case "crt_desc":
              return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
            case "due_asc":
              return new Date(a.dateDue).getTime() - new Date(b.dateDue).getTime();
            default:
              return new Date(b.dateDue).getTime() - new Date(a.dateDue).getTime();
          }
        })
        .slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
    [props.mails, options, page, rowsPerPage],
  );

  return (
    <React.Fragment>
      <LoadOverlay open={props.mails === undefined} />
      <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
        {props.mode !== "completed" && (
          <Button 
            variant='contained' 
            endIcon={<AddIcon />} 
            disabled={props.compose}
            onClick={props.onComposeThread}
          >
              Compose
          </Button>
        )}
        
        <IconButton onClick={props.onRefresh}>
          <RefreshIcon />
        </IconButton>
        <FilterPopover options={options} onChange={option => setOptions(option)} />
      </Stack>
      
      <Paper sx={{ width: '100%' }}>
        <List 
          sx={{ 
            width: '100%', 
            maxHeight: 'calc(100vh - 220px)', 
            overflowY: 'auto',
            "::-webkit-scrollbar": {
              height: "8px",
              width: "8px"
            },

            /* Track */
            "::-webkit-scrollbar-track": {
                background: theme.palette.grey[300] 
            },
            
            /* Handle */
            "::-webkit-scrollbar-thumb": {
                background: theme.palette.secondary.main
            },
            
            /* Handle on hover */
            "::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.primary.dark
            }
          }}>

          {props.mails && props.mails.length === 0 && (
            <Box sx={{ display: 'flex', height: 300, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <FolderCopyIcon color='secondary' sx={{ fontSize: 64, mb: 1 }} />
              <Typography variant="subtitle1">
                  {emptyMessages[props.mode].title}
              </Typography>
              <Typography variant="body1">
                {emptyMessages[props.mode].sub}
              </Typography>
            </Box>
          )}
          
          {visibleRows && visibleRows.map(msg => (
              <React.Fragment key={msg.refId}>
                <ListItemButton selected={Boolean(props.selectedId) && msg.refId === props.selectedId} alignItems="flex-start" onClick={() => props.onThreadClick(msg.refId)}>
                  <ListItemAvatar>
                    <Avatar>
                      {`${msg.author.firstName.charAt(0)}${msg.author.lastName.charAt(0)}`}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ mb: 2 }}>
                          <Typography variant='body1' gutterBottom>
                              {msg.subject}
                          </Typography>
                          <div>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="subtitle2"
                              color="text.primary"
                            >
                              {props.mode === 'regionInbox' ? msg.recipient.sectionOffice.officeName : `${msg.author.firstName} ${msg.author.lastName}`}
                            </Typography>
                            {` — ${msg.docType.docType} request For ${msg.purpose.purposeName}.`}
                          </div>
                      </Box>
                    } 
                    secondary={
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <Chip color={msg.completed ? 'success' : 'info'} label={msg.status.statusLabel} size='small' sx={{ fontSize: 10 }} />
                          
                          {msg.threadTag && (
                            <Chip color={getTagColor(msg.threadTag.tagName)} label={msg.threadTag.tagName} size='small' sx={{ fontSize: 10 }} />
                          )}
                        </div>
                        <Typography variant='caption'>
                          {`Due at ${formatInboxDate(msg.dateDue)}`}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItemButton>
                <Divider variant="inset" component="li" />
              </React.Fragment>
          ))}
        </List>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={props.mails ? props.mails
                  .filter(mail => 
                    (mail.status.statusId === options.statusId || options.statusId === 0) &&
                    (mail.docType.docId === options.typeId || options.typeId === 0) &&
                    (mail.threadTag?.tagId === options.tagId || options.tagId === 0)).length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}
