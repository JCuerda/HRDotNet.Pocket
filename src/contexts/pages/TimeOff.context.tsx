// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer } from 'react';
import { useRoute } from '@react-navigation/native';

import { ValuesTimeOff } from 'src/constants/Values';
import {
    StateTimeOff,
    TypeHandle,
    TypeTimeOff,
} from 'src/types/Types';
import { useFetch } from 'src/hooks/useFetch';

type TypeContext = {
    params: TypeTimeOff | undefined
    state: StateTimeOff
    setState: React.Dispatch<Partial<StateTimeOff>>
    handle: TypeHandle
    setHandle: React.Dispatch<Partial<TypeHandle>>

    onHandleEffectI: () => void
    onHandleFetchLeaveLedger: () => void;
}

export const Context = createContext<TypeContext>({
    params: undefined,
    state: ValuesTimeOff().State,
    setState: () => { },
    handle: ValuesTimeOff().Handle,
    setHandle: () => { },

    onHandleEffectI: () => { },
    onHandleFetchLeaveLedger: () => { }
})

export const CtxTimeOff = ({ children }: { children: React.ReactNode }) => {
    const params = useRoute().params as TypeTimeOff

    const [state, setState] = useReducer((state: StateTimeOff, newState: Partial<StateTimeOff>) =>
        ({ ...state, ...newState }), ValuesTimeOff(params).State
    )

    const [handle, setHandle] = useReducer((state: TypeHandle, newState: Partial<TypeHandle>) =>
        ({ ...state, ...newState }), ValuesTimeOff(params).Handle
    )

    const onHandleEffectI = async () => {
        const render = setTimeout(() => {
            setState({ data: params?.data?.entries })
            setHandle({ isLoading: false, refreshing: false })
        }, 50)
        return () => clearTimeout(render)
    }

    const onHandleFetchLeaveLedger = async () => {
        try {
            await useFetch.LeaveLedger(state, setState, handle, setHandle)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Context.Provider value={{
            params,
            state,
            setState,
            handle,
            setHandle,
            onHandleEffectI,
            onHandleFetchLeaveLedger
        }}>
            {children}
        </Context.Provider>
    )
}
