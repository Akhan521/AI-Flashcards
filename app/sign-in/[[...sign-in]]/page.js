import { SignIn } from "@clerk/nextjs";
import { Box, Typography, AppBar, Container, Toolbar, Button } from "@mui/material";
import Link from "next/link";

export default function SignInPage(){
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
                <Button color="inherit" href='/sign-up'> Sign Up </Button>
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
                }}>Sign In</Typography>
                <SignIn />
            </Box> 
        </Container>
    )
}