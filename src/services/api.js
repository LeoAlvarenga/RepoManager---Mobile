import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api

/**
 * Simulador IOS: localhost
 * Device Físico IOS: IP da máquina
 * Emulador Android: localhost (adb reverse)
 * Emulador Android Studio: 10.0.2.2
 * Emulador Android Genymotion: 10.0.3.2
 * Device Físco Android: IP da máquina
 */