'use client';
import {useUser} from "@clerk/nextjs";
import {useState} from "react";
import {useRouter} from "next/navigation";
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
import { db } from "@/firebase";
import { doc, getDoc, setDoc, collection, writeBatch } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Generate(){
    const {isLoaded, isSignedIn, user} = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);   
    const router = useRouter();

    const handleSubmit = async () => {
        fetch('api/generate', {
                method: 'POST',
                body: text,  
        }).then((response) => response.json()).then((data) => {
            setFlashcards(data);
        });
        // When we submit our text, we want to reset the flipped state of all cards.
        setFlipped(new Array(flashcards.length).fill(false));
    };

    const handleCardFlip = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const  handleSave = async () => {
        if (!name) {
            alert('Please enter a name for the deck');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);

        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find((f) => f.name === name)) {
                alert('Deck with that name already exists');
                return;
            }
            else {
                collections.push({
                    name,
                });
                batch.set(userDocRef, {flashcards: collections}, {merge: true});
            }
        }
        else {
            batch.set(userDocRef, {flashcards: [{name}]});
        }

        const colref = collection(userDocRef, name);

        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colref);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
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
            transition={{ duration: 1 }}
            >
            <Box sx={{
                display: 'flex',
                justifyContent: 'right',
                padding: 1,
            }}>
                <Button variant='contained' color='primary' href='/' sx={{
                    marginRight: 1,
                }}>Home</Button>
                <Button variant='contained' color='primary' href='/flashcards'>View Decks</Button>
            </Box>
            <Box 
                style={{
                    padding:20,
                }}
                sx={{
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Typography variant='h4' sx={{
                    mt: 4,
                    // setting the text to be a gradient color:
                    background: 'linear-gradient(90deg, rgba(153,143,238,1) 0%, rgba(109,134,232,1) 25%, rgba(111,159,210,1) 50%, rgba(145,175,255,1) 75%, rgba(0,137,255,1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>Generate Flashcards</Typography>
                <Paper sx={{p: 4, width: '100%', mb: 2}}>
                    <TextField value={text}
                        onChange={(e) => setText(e.target.value)}
                        label='Enter Text to Create Flashcards From' 
                        multiline rows={4}
                        fullWidth
                        variant='outlined' 
                        sx={{mb: 2}}
                    />
                    <Button 
                        variant='contained'
                        onClick={handleSubmit}
                        color='primary'
                        fullWidth
                    >Submit</Button>
                </Paper>
            </Box>

            {flashcards.length > 0 && (
                <Box
                    style={{
                        padding:20,
                    }}
                    sx={{
                        mt: 4,
                        bgcolor: '#181B1E',
                        color: 'white',
                    }}
                >
                    <Typography variant='h4' gutterBottom sx={{
                        textAlign: 'center',
                        mb: 4,
                        // setting the text to be a gradient color:
                        background: 'linear-gradient(90deg, rgba(153,143,238,1) 0%, rgba(109,134,232,1) 25%, rgba(111,159,210,1) 50%, rgba(145,175,255,1) 75%, rgba(0,137,255,1) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>Flashcards Preview</Typography>
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
                                                        <Typography variant='h5' component="div" sx={{
                                                            textAlign: 'center',
                                                        }}>
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant='h5' component="div" sx={{
                                                            textAlign: 'center',
                                                        }}>
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
                    <Box sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                    }}>
                        <Button variant='contained' color='secondary' onClick={handleOpen} sx={{
                            mb: 2,
                        }}>Save Deck</Button>
                    </Box>
                </Box>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Deck</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your flashcard deck.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Deck Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
            </Dialog>
            </motion.div>
        </Container>
    )
}