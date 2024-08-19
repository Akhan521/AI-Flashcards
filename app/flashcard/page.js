'use client';

import {useUser} from "@clerk/nextjs";
import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { db } from "@/firebase";
import { doc, getDoc, setDoc, collection, writeBatch, getDocs } from "firebase/firestore";
import { 
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    CardActionArea,
    CardContent,
    Grid
 } from "@mui/material";
import { motion } from "framer-motion";

export default function Flashcard(){
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const router = useRouter();

    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcard(){
            if (!search || !user) return;
            
            const colRef = collection(doc(collection(db, "users"), user.id), search);
            const docs = await getDocs(colRef);
            const flashcards = [];
            
            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()});
            });
            setFlashcards(flashcards);
        }
        getFlashcard();
    }, [user, search]);

    const handleCardFlip = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <Container maxWidth='100vw'
        style={{
            width: '100%',
            height: '100%',
            paddingTop: 10,
            paddingBottom: 20,
            paddingRight: 10,
        }}
        sx={{
            bgcolor: '#181B1E',
            color: 'white',
        }}
        >
            <motion.div
            // animating the page entrance with a clip path
            initial={{ clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)" }}
            transition={{ duration: 1.5 }}
            >
            <Box sx={{
                display: 'flex',
                justifyContent: 'right',
            }}>
                <Button variant='contained' color='primary' href='/generate' sx={{
                    marginRight: 1,
                }}>Create New Deck</Button>
                <Button variant='contained' color='primary' href='/flashcards'>View Decks</Button>
            </Box>
            <Typography variant='h4' style={{padding: 20,}} sx={{
                mb: 4,
                textAlign: 'center',
                // setting the text to be a gradient color:
                background: 'linear-gradient(90deg, rgba(153,143,238,1) 0%, rgba(109,134,232,1) 25%, rgba(111,194,210,1) 50%, rgba(145,219,255,1) 75%, rgba(0,180,255,1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
            >Deck: {search}
            </Typography>
            <Grid container spacing = {3}>
                <Grid container spacing = {3} style={{
                    paddingLeft: 25,
                    paddingRight: 15,
                }}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea onClick={() => handleCardFlip(index)}>
                                    <CardContent>
                                        <Box
                                            sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: '0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    height: '200px',
                                                    width: '100%',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    height: '100%',
                                                    width: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}
                                        >
                                            <div>
                                                <div>
                                                    <Typography variant='h5' component="div" sx={{textAlign:'center'}}>
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='h5' component="div" sx={{textAlign:'center'}}>
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            </motion.div>
        </Container>
    )
}