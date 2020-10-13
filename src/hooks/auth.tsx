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
}

interface Edit {
    email: string;
    password: string;
}

interface AuthContextState {
    user: User;
    loadingApp: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): Promise<void>;
    editUser(edit: Edit): Promise<void>
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

        setData({ token, user });
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@VsConnect:token', '@VsConnect:user']);

        setData({} as AuthState);
    }, []);

    const editUser = useCallback(async ({ email, password }): Promise<void> => {
        console.log(email, password);
        
        const response: AxiosResponse<User> = await api.patch('/users/password', {
            email,
            password
        });

        const user = response.data;

        setData({ user, token: data.token });
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, loadingApp, signIn, signOut, editUser }}>
            {children}
        </AuthContext.Provider>
    )
}