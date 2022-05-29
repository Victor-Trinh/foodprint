import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch'

export default function InputForm() {
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();

        // to backend
        // const endpoint = "http://127.0.0.1:3000/analyze/"
        // fetch(endpoint, {
        //     method: 'GET',
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         'Content-Type': 'application/json'
        //         },
        // })
        
        navigate('/Analyze/')
    }
    
    return (
    <React.Fragment>
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 7, md: 3 } }}>
                <form onSubmit={handleSubmit}>

                    <Divider spacing={2}>Submit</Divider>

                    <Grid item xs={12}>
                        <Button
                        variant="contained"
                        component="label"
                        >
                        Submit and Analyze
                        <input
                            type="submit"
                            hidden
                        />
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    </React.Fragment>
  )
}