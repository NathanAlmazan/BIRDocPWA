import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface LinkDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string, link: string) => void;
}

export default function LinkDialog(props: LinkDialogProps) {
  const [name, setName] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(name, link);
    setLink("");
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md">
        <form onSubmit={handleSubmit} >
            <DialogTitle>Add Link</DialogTitle>
            <DialogContent>
              <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="File Name"
                    fullWidth
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    variant="standard"
                    sx={{ minWidth: 300 }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="link"
                    label="File Link"
                    type="url"
                    fullWidth
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                    variant="standard"
                    sx={{ minWidth: 300 }}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button type='submit'>Add Link</Button>
            </DialogActions>
        </form>
    </Dialog>
  );
}
