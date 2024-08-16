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
        <Container maxWidth='md'>
            <Box sx={{
                mt: 4,
                mb: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2}}
            >
                <Typography variant='h4'>Generate Flashcards</Typography>
                <Paper sx={{p: 4, width: '100%'}}>
                    <TextField value={text}
                        onChange={(e) => setText(e.target.value)}
                        label='Enter Text' 
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
                    sx={{
                        mt: 4,
                    }}
                >
                    <Typography variant='h5' gutterBottom>Flashcards Preview</Typography>
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
                    <Box sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                    }}>
                        <Button variant='contained' color='secondary' onClick={handleOpen}>Save Deck</Button>
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

        </Container>
    )
}