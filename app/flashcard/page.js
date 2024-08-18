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
            margin: 0,
            paddingLeft: 45,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 20,
        }}
        sx={{
            bgcolor: '#181B1E',
            color: 'white',
        }}
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
            }}
            >Deck: {search}
            </Typography>
            <Grid container spacing = {3} style={{
                paddingRight: 15,
            }}>
                <Grid container spacing = {3}>
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
                                                    <Typography variant='h5' component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='h5' component="div">
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
        </Container>
    )
}