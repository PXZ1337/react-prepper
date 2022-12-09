import { initializeApp } from "firebase/app";
import FirebaseConfig from '../assets/config.json'

export const app = initializeApp(FirebaseConfig);

interface IConfig {
    backendBaseUrl: string
}

const config: IConfig = {
    backendBaseUrl: `${FirebaseConfig.databaseURL}/prepper`,
}

export default config