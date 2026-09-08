// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useEffect, useReducer } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { APIMethods, ContentTypes, ValuesApprovals, ValuesHome } from 'src/constants/Values';
import { useFetch } from 'src/hooks/useFetch';
import { ParamsTabNav, StateHome, TypeHandle, TypeNavStack } from 'src/types/Types';
import { useLoanFetch } from 'src/hooks/useLoanFetch';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { TeamMember } from 'src/types/Teams';
import { useGlobalStore } from 'src/store/GlobalStore';
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { STRINGS } from 'src/constants/Strings';
import { RequestCounts } from 'src/utils/Utils';

type TypeContext = {
  insets: EdgeInsets;
  platform: string;
  params: ParamsTabNav | undefined;
  state: StateHome;
  setState: React.Dispatch<Partial<StateHome>>;
  handle: TypeHandle;
  setHandle: React.Dispatch<Partial<TypeHandle>>;

  onHandleEffectI: () => void;
  onHandleEffectII: () => void;
  onHandleBadge: () => void;
  fetchUserDetails: () => void;
  checkTeamMembers: () => void;
};

export const Context = createContext<TypeContext>({
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
  platform: '',
  params: undefined,
  state: ValuesHome.State,
  setState: () => { },
  handle: ValuesHome.Handle,
  setHandle: () => { },

  onHandleEffectI: () => { },
  onHandleEffectII: () => { },
  onHandleBadge: () => { },
  fetchUserDetails: () => { },
  checkTeamMembers: () => { },
});

export const CtxHome = ({ children }: { children: React.ReactNode }) => {
  const { cutOffPeriod, setApprovalCounts, setReviewalCounts } = useGlobalStore();

  const navigation: TypeNavStack['navigation'] = useNavigation();
  const insets: EdgeInsets = useSafeAreaInsets();
  const platform: string = Platform.OS;
  const params = useRoute().params as ParamsTabNav;

  const [state, setState] = useReducer(
    (state: StateHome, newState: Partial<StateHome>) => ({ ...state, ...newState }),
    ValuesHome.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesHome.Handle,
  );

  const onHandleEffectI = async () => {
    setHandle({ isLoading: false });
  };

  const onHandleEffectII = async () => {
    await useFetch.LeaveBalances(navigation, setState, handle, setHandle);
  };

  const onHandleBadge = () => {
    (async () => {
      await useLoanFetch.LoansBadge(state, setState);
      await useLoanFetch.PendingsBadge(state, setState);
    })();

    return () => clearTimeout;
  };

  const fetchUserDetails = async () => {
    try {
      const response = await UtilsFetch.connect(
        APIMethods.GET,
        ContentTypes.JSON,
        `${process.env.EXPO_PUBLIC_PROFILE}`,
      );
      const profile_uri = response.data.personalInformation?.photo;
      const firstName = response.data.personalInformation?.name?.firstName ?? '';
      const userDetails = state.userDetails;
      let updated_pic_uri = '';
      if (!!profile_uri) {
        const photo = JSON.parse(profile_uri);
        const pic = `${process.env.EXPO_PUBLIC_REQUEST}/Uploads/EE/` + photo.path;
        updated_pic_uri = pic;
      }
      setState({
        userDetails: { ...userDetails, FirstName: firstName, profile_uri: updated_pic_uri },
      });
    } catch (error) {
      throw error;
    }
  };

  const fetchReviewalCounts = async () => {
    if (!cutOffPeriod?.[0] || !cutOffPeriod?.[1]) return;

    const removeDashFrom = DateTimeUtils.getRemoveDash(cutOffPeriod[0]);
    const removeDashTo = DateTimeUtils.getRemoveDash(cutOffPeriod[1]);

    try {
      const counts = await useFetch.ReviewalsCounts(ValuesApprovals.State.buttons.length, removeDashFrom, removeDashTo);
      setReviewalCounts(counts);
    } catch (error) {
      console.error('Reviewal count fetch error:', error);
    }
  };

  const fetchApprovalCounts = async () => {
    if (!cutOffPeriod?.[0] || !cutOffPeriod?.[1]) return;

    const removeDashFrom = DateTimeUtils.getRemoveDash(cutOffPeriod[0]);
    const removeDashTo = DateTimeUtils.getRemoveDash(cutOffPeriod[1]);

    try {
      const counts = await useFetch.ApprovalsCounts(ValuesApprovals.State.buttons.length, removeDashFrom, removeDashTo);
      setApprovalCounts(counts);
    } catch (error) {
      console.error('Approval count fetch error:', error);
    }
  };

  useEffect(() => {
    fetchReviewalCounts();
    fetchApprovalCounts();
  }, [cutOffPeriod]);

  useEffect(() => {
    RequestCounts.refreshReviewalCounts();
    RequestCounts.refreshApprovalCounts();
  }, [cutOffPeriod]);

  const checkTeamMembers = async () => {
    let result: any[] = [];
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_PROFILE_REQUEST}`)
      .then((response: { data: { teamMembers: TeamMember[]; name: string } }) => {
        setState({
          teamMembersCount: response.data.teamMembers?.length ?? 0,
        });
      })
      .catch((error: TypeError) => {
        console.error(error);
      });
    return result;
  };

  return (
    <Context.Provider
      value={{
        insets,
        platform,
        params,
        state,
        setState,
        handle,
        setHandle,

        onHandleEffectI,
        onHandleEffectII,
        onHandleBadge,
        fetchUserDetails,
        checkTeamMembers,
      }}
    >
      {children}
    </Context.Provider>
  );
};
