import React, {useState} from "react";
import "./Login.css"
import {auth} from "./firebase";
import {useDispatch} from "react-redux";
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from "firebase/auth"
import {login} from "./features/userSlice";


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                const {email, uid, displayName, photoUrl} = user;

                dispatch(
                    login({
                        email,
                        uid,
                        displayName,
                        photoUrl,
                    })
                );
                console.log("User singed in");
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    };


    const register = async (e) => {
        if (name.length === 0) {
            alert("Name cannot be empty");
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                const user = userCredential.user;
                console.log(`User ${user.uid} created`);

                await updateProfile(user, {
                    displayName: name,
                    photoUrl: profilePic,
                });

                dispatch(
                    login({
                        email: user.email,
                        uid: user.uid,
                        displayName: name,
                        photoUrl: profilePic,
                    })
                );
                console.log("User profile updated");
            } catch (error) {
                console.error("Error during registration:", error.message);
            }
        }
    }

    return <div className="login">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png"
            alt=""
        />

        <form>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name (required for registering)"
                type="text"
            />

            <input
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                placeholder="Profile pic URl (optional)"
                type="text"
            />

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
            />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />

            <button type="submit" onClick={loginToApp}>Sing In</button>
        </form>
        <p> Not a member?{" "}
            <span className="login_register" onClick={register}>Register Now</span>
        </p>
    </div>
}

export default Login