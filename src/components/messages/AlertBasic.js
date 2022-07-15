import React, { useEffect, useRef } from 'react';
import { Alert, Stack } from '@mui/material';

const AlertBasic = ({ severity, message }) => {
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={severity}>
                {message}
            </Alert>
        </Stack>
    )
};

export default AlertBasic;