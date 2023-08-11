import React from 'react'
// mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// icons
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ReplyIcon from '@mui/icons-material/Reply';
// project imports
import LinkDialog from './AddLinkDialog';
import { MessageFiles, Messages } from '../../api/threads/types';
// api
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { SEND_THREAD_MESSAGE } from '../../api/threads';


export interface MessageInput {
    message: string;
    files: File[];
    links: string[];
}

export interface MessageCreateInput {
    message: string;
    senderId: string;
    threadId: string;
    files: Pick<MessageFiles, "fileName" | "fileUrl" | "fileType">[]
}

interface ReplyBoxProps {
    userId: string;
    threadId?: string;
    attached?: boolean;
    onChange?: (data: MessageInput) => void;
    onSubmit?: () => void;
}

export default function ReplyBox({ userId, threadId, attached, onChange, onSubmit }: ReplyBoxProps) {
  const [sendThreadMessage] = useMutation<{ sendMessage: Messages }, { data: MessageCreateInput }>(SEND_THREAD_MESSAGE);
  const [open, setOpen] = React.useState<boolean>(false);
  const [attachments, setAttachments] = React.useState<string[]>([]);
  const [formData, setFormData] = React.useState<MessageInput>({
    message: "",
    files: [],
    links: []
  })
  const [formError, setFormError] = React.useState<string>();

  React.useEffect(() => {
    const fileNames = formData.files.map(file => file.name);
    setAttachments(fileNames.concat(formData.links))
  }, [formData, onChange]);

  React.useEffect(() => {
    if (onChange) onChange(formData);
  }, [formData, onChange])

  const handleMessageTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, message: event.target.value });

  const handleAddFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) 
        setFormData({ ...formData, files: [ ...formData.files, event.target.files[0] ] });
  }

  const handleAddLink = (link: string) => {
    setFormData({ ...formData, links: [ ...formData.links, link ] });
    setOpen(false);
  }

  const handleDelete = (name: string) => {
    const link = formData.links.find(l => l === name);
    const file = formData.files.find(f => f.name === name);

    if (link) setFormData({ ...formData, links: formData.links.filter(l => l !== name) });
    if (file) setFormData({ ...formData, files: formData.files.filter(f => f.name !== name) });
  }

  const handleCloseSnackbar = () => setFormError(undefined);

  const handleSendThreadMessage = async () => {
    // validation
    if (!threadId) return

    if (attached && formData.files.length === 0 && formData.links.length === 0) {
        setFormError("Attached file is required.");
        return
    }

    // create initial message
    let uploadedFiles: MessageFiles[] = [];
    let insertedLinks: MessageFiles[] = [];

    // upload files if any
    if (formData.files.length > 0) {
        const form = new FormData();
        formData.files.forEach((file) => {
            form.append("files", file);
        })

        try {
            const result = await axios.post(process.env.REACT_APP_MEDIA_URL as string, form);
            uploadedFiles = result.data.files;
        } catch (err) {
            setFormError((err as Error).message);
            return
        }
    }

    // arrange links if any
    if (formData.links.length > 0) {
        insertedLinks = formData.links.map(link => ({
            fileName: link.split('/').pop() as string,
            fileType: "",
            fileUrl: link
        }))
    }

    // combine link array
    const messageFiles = uploadedFiles.concat(insertedLinks);

    // send first message
    try {
        await sendThreadMessage({ variables: { data: {
            message: formData.message,
            files: messageFiles,
            senderId: userId,
            threadId: threadId
        }}})

        // reset form
        setFormData({
            message: "",
            files: [],
            links: []
        })

        if (onSubmit) onSubmit();
    } catch (err) {
        setFormError((err as Error).message);
        return
    }
  }


  return (
    <Box sx={{ width: '100%', backgroundColor: '#F2F3F4', position: 'relative' }}>
        <TextField 
            name='message'
            value={formData.message}
            onChange={handleMessageTextChange}
            multiline
            rows={6}
            fullWidth
        />
        <Stack 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 1 }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title='Upload File'>
                    <IconButton component="label">
                        <FileUploadIcon />
                        <input type="file" onChange={handleAddFiles} hidden />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Insert Link'>
                    <IconButton onClick={() => setOpen(true)}>
                        <InsertLinkIcon />
                    </IconButton>
                </Tooltip>
                <Box sx={{ display: 'flex', flexDirection: 'row', maxWidth: 500, overflowX: 'auto' }}>
                    {attachments.map(name => (
                        <Chip
                            key={name}
                            label={name}
                            sx={{ mx: 1 }}
                            onDelete={() => handleDelete(name)}
                        />
                    ))}
                </Box>
            </Box>

            {threadId && (
                <Button 
                    variant='contained' 
                    size='large' 
                    endIcon={<ReplyIcon />}
                    onClick={handleSendThreadMessage}
                    disabled={formData.files.length === 0 && formData.links.length === 0 && formData.message.length === 0}
                >
                    Reply
                </Button>
            )}
        </Stack>

        <LinkDialog open={open} onClose={() => setOpen(false)} onSubmit={handleAddLink} />

        <Snackbar open={formError !== undefined} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {formError && formError}
            </Alert>
        </Snackbar>
    </Box>
  )
}