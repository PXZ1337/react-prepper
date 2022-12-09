import { initializeApp } from "firebase/app";

const firebaseConfig = {
    databaseURL: "DATABASE_URI",
    apiKey: "API_KEY"
};

export const app = initializeApp(firebaseConfig);

interface IConfig {
    backendBaseUrl: string
}

const config: IConfig = {
    backendBaseUrl: 'DATABASE_URI',
}

export default config