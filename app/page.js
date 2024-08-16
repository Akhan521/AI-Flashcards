"use client";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, AppBar, Button, Container, Toolbar, Typography, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth="100vw" >
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Generate and manage flashcards with ease." />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style = {{flexGrow:1}} >Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href='/sign-in'> Login </Button>
            <Button color="inherit" href='/sign-up'> Sign Up </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{
        textAlign: "center",
        my: 4
      }}>
        <Typography variant="h2" align="center" gutterBottom> Welcome to Flashcard SaaS </Typography>
        <Typography variant="h5" align="center" gutterBottom> Create and manage flashcards with ease. </Typography>
        <Button variant="contained" color="primary" sx={{mt:2}}> Get Started </Button>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom> Features </Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom> Smart Flashcards </Typography>
            <Typography gutterBottom> 
              {" "}
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying. </Typography>
          </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom> Simple to use and learn. </Typography>
              <Typography gutterBottom> 
                {" "}
                Study with ease. </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom> Easily generate flashcards using AI. </Typography>
            <Typography gutterBottom> 
              {" "}
              Let our AI generate flashcards for you based on the content you provide. </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" gutterBottom> Pricing </Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h6" gutterBottom> Basic </Typography>
              <Typography variant="h6" gutterBottom> $5 / Month </Typography>
              <Typography gutterBottom> 
                {" "}
                Access to basic features and limited storage.
                 </Typography>
                 <Button variant="contained" color="primary" sx={{mt:2}}> Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h6" gutterBottom> Pro </Typography>
              <Typography variant="h6" gutterBottom> $10 / Month </Typography>
              <Typography gutterBottom> 
                {" "}
                Unlimited flashcards and storage, with priority support.
                 </Typography>
                 <Button variant="contained" color="primary" sx={{mt:2}}> Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )

}
