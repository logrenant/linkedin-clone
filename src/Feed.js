import React, { useEffect, useState } from 'react';
import './Feed.css';
import InputOption from './InputOption';
import { EventNote, Image, Create, Subscriptions, CalendarViewDay } from '@mui/icons-material';
import Post from './Post';
import { db } from './firebase';
import { getDocs, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

function Feed() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('timestamp', 'desc')));
            const postData = [];
            querySnapshot.forEach((doc) => {
                postData.push({ id: doc.id, data: doc.data() });
            });
            setPosts(postData);
        };
        fetchData();

        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => {
                postData.push({ id: doc.id, data: doc.data() });
            });
            setPosts(postData);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const querySnapshot = await getDocs(collection(db, 'posts'));
    //         const postData = [];
    //         querySnapshot.forEach((doc) => {
    //             postData.push({ id: doc.id, data: doc.data() });
    //         });
    //         setPosts(postData);
    //     };
    //     fetchData();
    //
    //     const unsubscribe = onSnapshot(collection(db, 'posts'),(snapshot) => {
    //         const postData = [];
    //         snapshot.forEach((doc) => {
    //             postData.push({ id: doc.id, data: doc.data() });
    //         });
    //         setPosts(postData);
    //     });
    //
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    const sendPost = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, 'posts'), {
            name: 'logg',
            description: 'this is a test',
            message: input,
            photoURL: '',
            timestamp: serverTimestamp(),
        });

        setInput('');
    };

    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <Create />
                    <form onSubmit={sendPost}>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={Image} title="Photo" color="#70B5F9" />
                    <InputOption Icon={Subscriptions} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNote} title="Event" color="#C0CBCD" />
                    <InputOption Icon={CalendarViewDay} title="Article" color="#7FC15E" />
                </div>
            </div>

            {/* Posts */}
            {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                <Post
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photoUrl={photoUrl}
                />
            ))}
        </div>
    );
}

export default Feed;
