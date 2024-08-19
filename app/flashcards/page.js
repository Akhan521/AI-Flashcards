'use client';

import {useUser} from "@clerk/nextjs";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import { db } from "@/firebase";
import { doc, getDoc, setDoc, collection, writeBatch } from "firebase/firestore";
import { 
    Container,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
    Button
} from "@mui/material";
import { motion } from "framer-motion";


export default function Flashcards(){
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function getFlashcards(){
            if (!user) return;
            
            const docRef = doc(collection(db, "users"), user.id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                setFlashcards(collections);
            }
            else {
                await setDoc(docRef, {flashcards: []});
            }
        }
        getFlashcards();
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardFlip = (id) => {
        router.push(`/flashcard?id=${id}`);
    };

    return (
        <Container maxWidth='100vw' 
        style={{
            width: '100%',
            height: '100vh',
            margin: 0,
            padding: 0,
        }}
        sx={{
            bgcolor: '#181B1E',
            color: 'white',
        }}>
            <motion.div
            // animating the page entrance with a clip path
            initial={{ clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)" }}
            transition={{ duration: 1.5 }}
            >
            <Box sx={{
                display: 'flex',
                justifyContent: 'right',
                padding: 1,
            }}>
                <Button variant='contained' color='primary' href='/generate'>Create New Deck</Button>
            </Box>
            <Typography variant='h4' style={{padding: 20}} sx={{
                textAlign: 'center',
                // setting the text to be a gradient color:
                background: 'linear-gradient(90deg, rgba(153,143,238,1) 0%, rgba(109,134,232,1) 25%, rgba(111,194,210,1) 50%, rgba(145,219,255,1) 75%, rgba(0,180,255,1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
            >Flashcard Decks</Typography>
            <Grid container spacing={3} style={{padding: 20}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardFlip(flashcard.name)}>
                                <CardContent>
                                    <Typography variant='h6' sx={{textAlign:'center'}}>{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            </motion.div>
        </Container>
    )
}
