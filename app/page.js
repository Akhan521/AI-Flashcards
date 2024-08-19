"use client";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, AppBar, Button, Container, Toolbar, Typography, Grid } from "@mui/material";
import Head from "next/head";
import Spline from "@splinetool/react-spline";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500){
      console.log(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  }

  const {isLoaded, isSignedIn, user} = useUser();

  return (
    
    <Container maxWidth="100vw" style={{margin:0, padding:0}} sx={{
      bgcolor: '#181B1E',
      color: 'white',
      margin: 5,
    }}>
      <Head>
        <title>RecallAI</title>
        <meta name="description" content="Generate and manage flashcards with ease." />
      </Head>

      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" style = {{flexGrow:1}} >RecallAI</Typography>
          <SignedOut>
            <Button color="inherit" href='/sign-in'> Login </Button>
            <Button color="inherit" href='/sign-up'> Sign Up </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      {
      <div style={{ height: '80vh' }}>
            <Spline
        scene="https://prod.spline.design/iJISohO8SUU25GuF/scene.splinecode" 
        />
      </div>
      }
      <Box sx={{
        textAlign: "center",
        my: 4,
        mt: -5,
      }}>
        <Typography variant="h5" align="center" gutterBottom sx={{
          // setting the text to be a gradient color:
          background: 'linear-gradient(90deg, rgba(227,225,244,1) 0%, rgba(84,84,224,1) 25%, rgba(88,137,232,1) 50%, rgba(145,219,255,1) 75%, rgba(0,212,255,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}> Create and manage flashcards with ease. </Typography>
        <Button variant="contained" color="primary" href={user ? "/generate" : "/sign-in"} sx={{mt:2}}> Get Started </Button>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}} style={{padding: 15}}>
        <Typography variant="h4" gutterBottom sx={{
          // setting the text to be a gradient color:
          background: 'linear-gradient(90deg, rgba(206,203,244,1) 0%, rgba(47,47,213,1) 25%, rgba(88,137,232,1) 50%, rgba(145,219,255,1) 75%, rgba(0,212,255,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}> Features </Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={4}>
            <motion.div 
              whileHover={{
                scale: 0.9,
                boxShadow: '0 0 10px rgba(145,219,255,1)',
                borderRadius: 12,
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              <Box sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  minHeight: 150,
                }}>
                <Typography variant="h6" gutterBottom sx={{
                  // setting the text to be a gradient color:
                  background: 'linear-gradient(90deg, rgba(227,225,244,1) 0%, rgba(155,84,224,1) 25%, rgba(189,60,214,1) 50%, rgba(255,145,239,1) 75%, rgba(223,0,255,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}> Smart & Brief Flashcards </Typography>
                <Typography gutterBottom> 
                  {" "}
                  Our AI wisely breaks down your text into concise flashcards, designed for active recall. </Typography>
              </Box>
          </motion.div>
          </Grid>
            <Grid item xs={12} md={4}>
            <motion.div 
              whileHover={{
                scale: 0.9,
                boxShadow: '0 0 10px rgba(145,219,255,1)',
                borderRadius: 12,
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              minHeight: 150,
            }}>
              <Typography variant="h6" gutterBottom sx={{
                  // setting the text to be a gradient color:
                  background: 'linear-gradient(90deg, rgba(227,225,244,1) 0%, rgba(155,84,224,1) 25%, rgba(189,60,214,1) 50%, rgba(255,145,239,1) 75%, rgba(223,0,255,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}> Simple to use and learn. </Typography>
              <Typography gutterBottom> 
                {" "}
                Focus more on studying with less distractions. RecallAI keeps studying to-the-point. </Typography>
            </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
          <motion.div 
              whileHover={{
                scale: 0.9,
                boxShadow: '0 0 10px rgba(145,219,255,1)',
                borderRadius: 12,
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
          <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              minHeight: 150,
            }}>
            <Typography variant="h6" gutterBottom sx={{
                  // setting the text to be a gradient color:
                  background: 'linear-gradient(90deg, rgba(227,225,244,1) 0%, rgba(155,84,224,1) 25%, rgba(189,60,214,1) 50%, rgba(255,145,239,1) 75%, rgba(223,0,255,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}> Personalized Flashcards </Typography>
            <Typography gutterBottom> 
              {" "}
              Let RecallAI create flashcards for you based on the content you provide. </Typography>
          </Box>
          </motion.div>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}} style={{padding: 15}}>
        <Typography variant="h4" gutterBottom sx={{
          // setting the text to be a gradient color:
          background: 'linear-gradient(90deg, rgba(206,203,244,1) 0%, rgba(47,47,213,1) 25%, rgba(88,137,232,1) 50%, rgba(145,219,255,1) 75%, rgba(0,212,255,1) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}> Pricing </Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={6}>
          <motion.div 
              whileHover={{
                scale: 0.9,
                boxShadow: '0 0 10px rgba(145,219,255,1)',
                borderRadius: 12,
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h6" gutterBottom sx={{
                  // setting the text to be a gradient color:
                  background: 'linear-gradient(90deg, rgba(227,225,244,1) 0%, rgba(155,84,224,1) 25%, rgba(189,60,214,1) 50%, rgba(255,145,239,1) 75%, rgba(223,0,255,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}> Basic </Typography>
              <Typography variant="h6" gutterBottom> Free </Typography>
              <Typography gutterBottom> 
                {" "}
                Access to basic features and limited storage.
                 </Typography>
                 <Button variant="contained" color="primary" sx={{mt:2}} href={user ? "/generate" : "/sign-in"}> Start Now</Button>
            </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
          <motion.div 
              whileHover={{
                scale: 0.9,
                boxShadow: '0 0 10px rgba(145,219,255,1)',
                borderRadius: 12,
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              mb: 2,
            }}>
              <Typography variant="h6" gutterBottom  sx={{
                  // setting the text to be a gradient color:
                  background: 'linear-gradient(90deg, rgba(227,225,244,1) 0%, rgba(155,84,224,1) 25%, rgba(189,60,214,1) 50%, rgba(255,145,239,1) 75%, rgba(223,0,255,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}> Pro </Typography>
              <Typography variant="h6" gutterBottom> $5 / Month </Typography>
              <Typography gutterBottom> 
                {" "}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{mt:2}}
                onClick={handleSubmit}
                > Choose Pro
              </Button>
            </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )

}
