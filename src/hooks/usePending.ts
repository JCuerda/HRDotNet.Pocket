/**
 * @project      HRDotNet-Mobile
 * @description  Use Pending Fetch for the Pending Component
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */
//--- React Modules
//--- Own Modules
import { APIMethods, ContentTypes } from 'src/constants/Values';
import { TypeError } from 'src/types/Types';
import { UtilsFetch } from 'src/utils/UtilsFetch';
//--- Types
import { StateHome } from 'src/types/Types';
import { DocStatus, PendingApplications, PendingData, PendingHandles, PendingStates } from 'src/types/Pending';
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { ERRORS } from 'src/constants/Errors';

export const useFetchPending = {
  Pending: async (
    state: PendingStates,
    setState: React.Dispatch<Partial<PendingStates>>,
    handle: PendingHandles,
    setHandle: React.Dispatch<Partial<PendingHandles>>,
  ) => {
    setHandle({
      isLoading: true,
    });

    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_PENDING}`)
      .then((response: { data: PendingData }) => {
        const pendingApplicationsData = response.data.pendingApplications;

        // console.log("pEEED", pendingApplicationsData)

        const pendingApplications = Array.isArray(pendingApplicationsData)
          ? pendingApplicationsData
          : pendingApplicationsData
            ? [pendingApplicationsData]
            : [];

        let filteredApplications;
        if (state.selectedButtonIndex === 0) {
          filteredApplications = pendingApplications.filter(
            (application: any) =>
              application.filingStatus.name === 'Filed' || application.filingStatus.id === DocStatus.Filed,
          );
        } else {
          filteredApplications = (pendingApplications as any).filter(
            (application: any) =>
              application.filingStatus.name === 'Reviewed' || application.filingStatus.id === DocStatus.Reviewed,
          );
        }

        let searchApplications;
        if (state.searchFilterIndex === 0) {
          searchApplications = filteredApplications;
        } else if (state.searchFilterIndex === 1) {
          searchApplications = filteredApplications.filter((applications: PendingApplications) => {
            if (!state.filterText) {
              return true;
            } else {
              const targetValue = applications.applicationType?.toLowerCase() || '';
              const searchText = state.filterText?.toLowerCase() || '';
              return targetValue === searchText;
            }
          });
        } else if (state.searchFilterIndex === 2) {
          searchApplications = filteredApplications.filter((applications: PendingApplications) => {
            const dateTransaction = new Date(applications.dateTransaction);
            const fromDate = new Date(DateTimeUtils.formatToDefaultDate(state.fromDate));
            const toDate = new Date(DateTimeUtils.formatToDefaultDate(state.toDate));
            if (!state.fromDate && !state.toDate) {
              return true;
            } else {
              return dateTransaction >= fromDate && dateTransaction <= toDate;
            }
          });
        } else if (state.searchFilterIndex === 3) {
          searchApplications = filteredApplications.filter((applications: PendingApplications) => {
            if (!state.filterText) {
              return true;
            } else {
              const targetValue = applications.documentNo?.toLowerCase() || '';
              const searchText = state.filterText?.toLowerCase() || '';

              return (
                targetValue.startsWith(searchText) ||
                targetValue.endsWith(searchText) ||
                targetValue.includes(searchText) ||
                targetValue === searchText
              );
            }
          });
        } else {
          searchApplications = filteredApplications.filter((applications: PendingApplications) => {
            const dateFrom = new Date(applications.dateRange.dateFrom);
            const dateTo = new Date(applications.dateRange.dateTo);
            const fromDate = new Date(DateTimeUtils.formatToDefaultDate(state.fromDate));
            const toDate = new Date(DateTimeUtils.formatToDefaultDate(state.toDate));

            if (!state.fromDate && !state.toDate) {
              return true;
            } else {
              return dateFrom >= fromDate && dateTo <= toDate;
            }
          });
        }

        setHandle({
          isLoading: true,
        });
        setState({
          data: response.data,
          pendingApplications: searchApplications,
          badgeCount: filteredApplications.length,
          count: searchApplications.length,
        });
      })
      .catch(async (error: TypeError) => {
        console.error(error);
        const errors = await UtilsFetch.catchErrors(error);
        await UtilsFetch.catchEvent({
          error: error,
          setHandle: setHandle,
          toastSet: errors.code === 0 ? 0 : 1,
          toastMessage: UtilsFetch.requestError(
            errors.code,
            errors.parsed,
            UtilsFetch.handleErrorException(errors.response, ERRORS.appFilingException),
          ),
        });
      })
      .finally(() => setHandle({ isLoading: false }));
  },

  PendingsBadge: async (state: StateHome, setState: React.Dispatch<Partial<StateHome>>) => {
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_PENDING}`)
      .then((response: { data: any }) => {
        setState({
          approvalCount: response.data.totalCount,
        });
      })
      .catch(async (error: TypeError) => {
        console.error('Error fetching pending badge:', error);
      })
      .finally(() => { });
  },
};
