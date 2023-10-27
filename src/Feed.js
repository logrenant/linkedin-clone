import React, {useEffect, useState} from 'react';
import './Feed.css';
import InputOption from './InputOption';
import {EventNote, Image, Create, Subscriptions, CalendarViewDay} from '@mui/icons-material';
import Post from './Post';
import {db} from './firebase';
import {getDocs, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy} from 'firebase/firestore';
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('timestamp', 'desc')));
            const postData = [];
            querySnapshot.forEach((doc) => {
                postData.push({id: doc.id, data: doc.data()});
            });
            setPosts(postData);
        };
        fetchData();

        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => {
                postData.push({id: doc.id, data: doc.data()});
            });
            setPosts(postData);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const sendPost = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, 'posts'), {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || "",
            timestamp: serverTimestamp(),
        });

        setInput('');
    };

    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <Create/>
                    <form onSubmit={sendPost}>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type="text"/>
                        <button type="submit">Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={Image} title="Photo" color="#70B5F9"/>
                    <InputOption Icon={Subscriptions} title="Video" color="#E7A33E"/>
                    <InputOption Icon={EventNote} title="Event" color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDay} title="Article" color="#7FC15E"/>
                </div>
            </div>

            {/* Posts */}
            <FlipMove>
                {posts.map(({id, data: {name, description, message, photoUrl}}) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))}
            </FlipMove>

        </div>
    );
}

export default Feed;
