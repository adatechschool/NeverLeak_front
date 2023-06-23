import 'react-native-url-polyfill/auto.js';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
    getItem: (key) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key, value) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key) => {
        SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = 'https://lchuoywpkbtzfzbcveie.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjaHVveXdwa2J0emZ6YmN2ZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3OTM3NjIsImV4cCI6MTk5OTM2OTc2Mn0.9HDScXz62OQ40ema3Ewc5DrJkdEfqhQlW8Stu_j3Cek';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
