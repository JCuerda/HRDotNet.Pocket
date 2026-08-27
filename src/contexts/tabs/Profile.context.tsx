/**
 * @project      HRDotNet-Mobile
 * @description  Profile context contains the states and handles for Personaal and Payslip Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 * @date_updated
 */

import React from 'react';
import { APIMethods, ContentTypes } from 'src/constants/Values';
import { useProfileFetch } from 'src/hooks/useProfileFetch';
import { PaySlipStates, PersonalStates, ProfileHandle, ValuesProfile } from 'src/types/Profile';
import { UtilsFetch } from 'src/utils/UtilsFetch';

type ContactsContext = {
  state: PersonalStates;
  setState: React.Dispatch<Partial<PersonalStates>>;
  payslip: PaySlipStates;
  setPayslip: React.Dispatch<Partial<PaySlipStates>>;
  handle: ProfileHandle;
  setHandle: React.Dispatch<Partial<ProfileHandle>>;
  onFetchPayslip: () => void;
  onFetchPayslipDetails: (summaryId: number) => void;
  onStopLoading: () => void;
  updateProfile: () => void;
};

export const Context = React.createContext<ContactsContext>({
  state: ValuesProfile.StatePersonal,
  setState: () => { },
  payslip: ValuesProfile.StatePayslip,
  setPayslip: () => { },
  handle: ValuesProfile.Handle,
  setHandle: () => { },
  onFetchPayslip: () => { },
  onFetchPayslipDetails: () => { },
  onStopLoading: () => { },
  updateProfile: () => { },
});

export const CtxProfile = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useReducer(
    (state: PersonalStates, newState: Partial<PersonalStates>) => ({ ...state, ...newState }),
    ValuesProfile.StatePersonal,
  );

  const [payslip, setPayslip] = React.useReducer(
    (state: PaySlipStates, newState: Partial<PaySlipStates>) => ({ ...state, ...newState }),
    ValuesProfile.StatePayslip,
  );

  const [handle, setHandle] = React.useReducer(
    (state: ProfileHandle, newState: Partial<ProfileHandle>) => ({ ...state, ...newState }),
    ValuesProfile.Handle,
  );

  const onFetchPayslip = () => {
    (async () => {
      await useProfileFetch.Payslip(setPayslip, setHandle);
    })();

    return () => {
      clearTimeout;
    };
  };

  const onFetchPayslipDetails = (summaryId: number) => {
    (async () => {
      await useProfileFetch.PayslipDetails(summaryId, setPayslip, setHandle);
    })();
    return () => {
      clearTimeout;
    };
  };

  const onStopLoading = () => {
    setHandle({
      isLoading: false,
    });
  };

  const updateProfile = async () => {
    const split = state.uri.split('/');
    const formData: any | FormData = new FormData();
    formData.append('Photo', {
      name: split[split.length - 1],
      uri: state.uri,
      type: 'image/*',
    });
    try {
      await UtilsFetch.connect(
        APIMethods.POST,
        ContentTypes.Multipart,
        `${process.env.EXPO_PUBLIC_REQUEST}/employee-management/me/profile/upload`,
        formData,
      )
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <Context.Provider
      value={{
        state,
        setState,
        payslip,
        setPayslip,
        handle,
        setHandle,
        onFetchPayslip,
        onFetchPayslipDetails,
        onStopLoading,
        updateProfile,
      }}
    >
      {children}
    </Context.Provider>
  );
};
