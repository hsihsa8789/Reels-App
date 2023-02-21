import React from 'react'
import BackupIcon from '@mui/icons-material/Backup';
import Button from "@mui/material/Button";
import LinearProgress from '@mui/material/LinearProgress';
// import IconButton  from '@mui/material/IconButton';

function Upload() {
    return (
        <div className='upload-btn'>
            <Button
                color="secondary"
                variant="outlined"
                component="label"
                size='small'
                startIcon={<BackupIcon />}
            >
                {/* <IconButton color="secondary">
                    <BackupIcon />
                </IconButton> */}
                Upload Videos
                <input hidden accept="image/*" multiplem type="file" />
            </Button>
            <LinearProgress color='secondary' variant="determinate" value={30} sx={{mt:"0.2rem"}} /> 
        </div>
    )
}

export default Upload