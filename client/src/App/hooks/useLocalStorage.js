export default function useLocalStorage() {
    const getLocalStorage = (key, initialValue) => {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
        } catch (e) {
            // if error, return initial value
            return initialValue;
        }
    }

    const setLocalStorage = (key, value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log('Cannot set localStorage!');
        }
    }

    return {
        getLocalStorage,
        setLocalStorage
    }
}