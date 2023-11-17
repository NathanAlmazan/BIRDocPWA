import React, { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Drawer from '@mui/material/Drawer';
// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
// api
import { useQuery } from '@apollo/client';
import { GET_ALL_THREAD_STATUS, GET_ALL_THREAD_TAGS, GET_ALL_THREAD_TYPES } from '../../api/threads';
import { DocumentStatus, DocumentTypes, ThreadTags } from '../../api/threads/types';

// ----------------------------------------------------------------------

export type SortOptions = "crt_asc" | "crt_desc" | "due_asc" | "due_desc"

export interface FilterOptions {
  typeId: number;
  statusId: number;
  tagId: number;
  sortBy: SortOptions
}

export default function FilterPopover({ options, onChange }: { options: FilterOptions, onChange: (options: FilterOptions) => void }) {
  const { data: threadTypes } = useQuery<{ getAllThreadTypes: DocumentTypes[] }>(GET_ALL_THREAD_TYPES);
  const { data: threadStatus } = useQuery<{ getAllThreadStatus: DocumentStatus[] }>(GET_ALL_THREAD_STATUS);
  const { data: threadTags } = useQuery<{ getAllThreadTags: ThreadTags[] }>(GET_ALL_THREAD_TAGS);
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => setOpen(!open);

  const handleClearFilter = () => {
    onChange({
      typeId: 0,
      statusId: 0,
      tagId: 0,
      sortBy: "due_desc"
    })
  }

  return (
    <>
      <IconButton
        onClick={handleToggle}
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

      <Drawer
        anchor='right'
        open={open}
        onClose={handleToggle}
      >
        <Stack spacing={2} sx={{ py: 10, px: 3, minWidth: 300 }}>
          <Stack direction='row' justifyContent='flex-end'>
            <Button variant='outlined' startIcon={<ClearAllIcon />} onClick={handleClearFilter}>Clear Filters</Button>
          </Stack>

          <FormControl>
            <FormLabel>Filter by Status</FormLabel>
            <RadioGroup value={options.statusId} onChange={(event) => onChange({ ...options, statusId: parseInt(event.target.value) })}>
              <FormControlLabel value={0} control={<Radio />} label="None" />
              {threadStatus && threadStatus.getAllThreadStatus.map(status => (
                <FormControlLabel key={status.statusId} value={status.statusId} control={<Radio />} label={status.statusLabel} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Filter by Tags</FormLabel>
            <RadioGroup value={options.tagId} onChange={(event) => onChange({ ...options, tagId: parseInt(event.target.value) })}>
              <FormControlLabel value={0} control={<Radio />} label="None" />
              {threadTags && threadTags.getAllThreadTags.map(tag => (
                <FormControlLabel key={tag.tagId} value={tag.tagId} control={<Radio />} label={tag.tagName} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Filter by Document Type</FormLabel>
            <RadioGroup value={options.typeId} onChange={(event) => onChange({ ...options, typeId: parseInt(event.target.value) })}>
              <FormControlLabel value={0} control={<Radio />} label="None" />
              {threadTypes && threadTypes.getAllThreadTypes.map(type => (
                <FormControlLabel key={type.docId} value={type.docId} control={<Radio />} label={type.docType} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Sort By</FormLabel>
            <RadioGroup value={options.sortBy} onChange={(event) => onChange({ ...options, sortBy: event.target.value as SortOptions })}>
              <FormControlLabel value="crt_asc" control={<Radio />} label="Date Created Ascending" />
              <FormControlLabel value="crt_desc" control={<Radio />} label="Date Created Descending" />
              <FormControlLabel value="due_asc" control={<Radio />} label="Date Due Ascending" />
              <FormControlLabel value="due_desc" control={<Radio />} label="Date Due Descending" />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Drawer>
    </>
  );
}