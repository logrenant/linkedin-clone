import React, {useEffect} from 'react';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import {login, logout, selectUser} from "./features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import Login from "./Login";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";
import Widgets from "./Widgets";


function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(login({
                    email: user.email,
                    uid: user.uid,
                    displayName: user.displayName,
                    photoUrl: user.photoURL,
                }));
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    return (
        <div className="app">
            <Header/>

            {!user ? (
                <Login/>
            ) : (
                <div className="app_body">
                    <Sidebar/>
                    <Feed/>
                    <Widgets/>
                </div>
            )}
        </div>
    );
}

export default App;
