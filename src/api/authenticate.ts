import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from "../common/config";

const Authenticate = async () => {
    const auth = getAuth(app)
    const userCredential = await signInAnonymously(auth)
    const token = await userCredential.user.getIdToken()

    localStorage.setItem('token', token)
}

export default Authenticate