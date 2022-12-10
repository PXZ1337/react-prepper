import { initializeApp } from "firebase/app";
import FirebaseConfig from '../assets/firebaseConfig.json'
import AppConfig from '../assets/appConfig.json'

export const app = initializeApp(FirebaseConfig);

interface IConfig {
    backendBaseUrl: string
}

const config: IConfig = {
    backendBaseUrl: `${FirebaseConfig.databaseURL}/${AppConfig.database}`,
}

export default config