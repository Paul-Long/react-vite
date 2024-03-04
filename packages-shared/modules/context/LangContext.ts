import type {Context} from 'react';
import {createContext} from 'react';

export const LangContext: Context<string> = createContext('en')
