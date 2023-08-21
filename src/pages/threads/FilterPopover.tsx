import React, { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
// icons
import FilterListIcon from '@mui/icons-material/FilterList';
// api
import { useQuery } from '@apollo/client';
import { GET_ALL_THREAD_TYPES } from '../../api/threads';
import { DocumentTypes } from '../../api/threads/types';

// ----------------------------------------------------------------------

export default function FilterPopover({ selected, onClick }: { selected: number, onClick: (id: number) => void }) {
  const { data: threadTypes } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES);
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          mx: 2,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <FilterListIcon />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 360,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
            <List
                disablePadding
                subheader={
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                        Thread Types
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={() => onClick(-1)} selected={selected === -1}>
                  All
                </ListItemButton>
                <Divider sx={{ borderStyle: 'dashed' }} />

                {threadTypes && threadTypes.getAllThreadTypes.map(thread => (
                  <React.Fragment key={thread.docId}>
                    <ListItemButton onClick={() => onClick(thread.docId)} selected={selected === thread.docId}>
                      {thread.docType}
                    </ListItemButton>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                  </React.Fragment>
                ))}
            </List>
        </Box>
      </Popover>
    </>
  );
}