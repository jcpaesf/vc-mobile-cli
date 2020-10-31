import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { AxiosResponse } from 'axios';

interface SignInCredentials {
    email: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    avatar_url: string;
}

interface Edit {
    email: string;
    password: string;
}

interface AuthContextState {
    user: User;
    loadingApp: boolean;
    emailSignUp: string;
    emailForgot: string;
    setEmail(email: string): void;
    setForgot(email: string): void;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): Promise<void>;
    editUser(edit: Edit): Promise<void>
    updateUser(user: User): Promise<void>
}

interface AuthState {
    token: string;
    user: User;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export function useAuth(): AuthContextState {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [emailSignUp, setEmailSignUp] = useState('');
    const [emailForgot, setEmailForgot] = useState('');
    const [loadingApp, setLoadingApp] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet([
                '@VsConnect:token',
                '@VsConnect:user'
            ]);

            if (token[1] && user[1]) {
                setData({ token: token[1], user: JSON.parse(user[1]) });
                api.defaults.headers['Authorization'] = `Bearer ${token[1]}`;
            }

            setLoadingApp(false);
        }

        loadStorageData();
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password
        });

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@VsConnect:token', token],
            ['@VsConnect:user', JSON.stringify(user)]
        ]);

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        const nfc_id = await AsyncStorage.getItem('@VsConnect:nfcid');

        if (nfc_id) {
            api.post('/productsuser', {
                nfc_id
            }).then(async () => {
                await AsyncStorage.removeItem('@VsConnect:nfcid');

                setData({ token, user });
            }).catch(() => {
                setData({ token, user });
            });
        } else {
            setData({ token, user });
        }
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@VsConnect:token', '@VsConnect:user']);

        setData({} as AuthState);
    }, []);

    const updateUser = useCallback(async (user: User) => {
        await AsyncStorage.setItem('@VsConnect:user', JSON.stringify(user));

        setData({
            token: data.token,
            user
        })
    }, [setData, data.token]);

    const editUser = useCallback(async ({ email, password }): Promise<void> => {
        const response: AxiosResponse<User> = await api.patch('/users/password', {
            email,
            password
        });

        const user = response.data;

        setData({ user, token: data.token });
    }, []);

    const setEmail = useCallback((email: string): void => {
        setEmailSignUp(email);
    }, []);

    const setForgot = useCallback((email: string): void => {
        setEmailForgot(email);
    }, []);

    return (
        <AuthContext.Provider value={{
            user: data.user,
            loadingApp,
            signIn,
            signOut,
            editUser,
            updateUser,
            emailSignUp,
            setEmail,
            emailForgot,
            setForgot
        }}>
            {children}
        </AuthContext.Provider>
    )
}