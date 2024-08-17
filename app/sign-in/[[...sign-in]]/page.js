import { SignIn } from "@clerk/nextjs";
import { Box, Typography, AppBar, Container, Toolbar, Button } from "@mui/material";
import Link from "next/link";

export default function SignUpPage(){
    return (
        <Container maxWidth='100vw' style={{margin:0, padding:0}}>
            <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{
                    flexGrow: 1
                }}>RecallAI</Typography>
                <Button color='inherit'>
                    <Link href='/sign-in' passHref>
                        Login
                    </Link>
                </Button>
                <Button color='inherit'>
                    <Link href='/sign-up' passHref>
                        Sign Up
                    </Link>
                </Button>
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