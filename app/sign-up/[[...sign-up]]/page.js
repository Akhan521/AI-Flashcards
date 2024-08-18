import { SignIn, SignUp } from "@clerk/nextjs";
import { Box, Typography, AppBar, Container, Toolbar, Button } from "@mui/material";
import Link from "next/link";

export default function SignUpPage(){
    return (
        <Container maxWidth='100vw' style={{margin:0, padding:0}} sx={{
            bgcolor: '#181B1E',
            color: 'white',
            height: '100vh',
        }}>
            <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{
                    flexGrow: 1
                }}>RecallAI</Typography>
                <Button color="inherit" href='/'> Home </Button>
                <Button color="inherit" href='/sign-in'> Login </Button>
            </Toolbar>  
            </AppBar> 

            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
            >
                <Typography variant="h4" gutterBottom sx={{
                    mt: 4,
                }}>Sign Up</Typography>
                <SignUp />
            </Box> 
        </Container>
    )
}