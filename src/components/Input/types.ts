import { InputHTMLAttributes, ReactNode } from 'react';
import { ComponentVariant } from '../types';

export type InputDecoration = {
    start?: ReactNode;
    end?: ReactNode;
};

export type SimpleInputProps = InputHTMLAttributes<HTMLInputElement> & {
    fluid?: boolean;
    filled?: boolean;
    variant?: ComponentVariant;
};

export type AdvancedInputProps = SimpleInputProps & {
    decoration?: InputDecoration;
};

export type InputProps = AdvancedInputProps;
