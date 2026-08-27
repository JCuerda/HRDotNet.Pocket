/**
 * @project      HRDotNet-Mobile
 * @description  Main Component for Pending
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */

//--- React Modules
import React, { useCallback, useEffect } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
//--- Expo Modules
import { FontAwesome } from '@expo/vector-icons';
//--- Others Modules
import Note from 'src/components/note/Note';
import LoaderPage from 'src/components/loader/LoaderPage';
import PendingsPanel from 'src/components/panel/home/PendingPanel';
import PendingFilter from 'src/components/use/PendingFilter';
import PendingsItem from 'src/components/item/PendingItem';
import { COLORS, DateTimeUtils, STRINGS, STYLES } from 'src';
import { usePending } from 'src/contexts/pages';
import { PendingApplications } from 'src/types/Pending';
import TabHeader from 'src/components/header/TabHeader';
import { useFocusEffect } from '@react-navigation/native';

const Pending: React.FC = () => {
  const { state, handle, setHandle, onFetchPending, onHandleSearchSubmit, onHandleClear } = usePending();
  const platformIOS = Platform.OS === 'ios';
  const search = STYLES.ComponentSearch(platformIOS);

  React.useEffect(() => {
    onFetchPending();
  }, [state.selectedButtonIndex, state.filterText, state.searchFilterIndex, state.fromDate, state.toDate]);

  const handlePress = () => {
    setHandle({
      isVisible: true,
    });
  };

  const sortedPendingApplications = Array.isArray(state.pendingApplications)
    ? state.pendingApplications.sort(
      (a, b) => new Date(b.dateTransaction).getTime() - new Date(a.dateTransaction).getTime(),
    )
    : [];

  useFocusEffect(
    useCallback(() => {
      onHandleClear()
    }, [state.selectedButtonIndex]),
  );


  return (
    <React.Fragment>
      {/* Header */}
      <TabHeader headerName={STRINGS.pageTitlePending} />
      {/* Panel Button */}
      <PendingsPanel />
      {/* Search Field */}
      <View style={[search.topContainer, { paddingHorizontal: 20 }]}>
        <Pressable style={search.searchContainer} onPress={handlePress}>
          <FontAwesome name="filter" size={20} color={COLORS.orange} />
          <Text style={{ marginLeft: 5, fontSize: 16 }}>
            {state.filterLabel !== "" ? state.filterLabel : "Search Filter"}
          </Text>
        </Pressable>
      </View>
      {/* Container */}
      {handle.isLoading ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%', height: '80%' }}>
          <LoaderPage />
        </View>
      ) : state.badgeCount === 0 ? (
        <Note text={`No Records`} icon="database" />
      ) : state.count === 0 ? (
        <Note text={STRINGS.nothingFound} icon="magnifying-glass" />
      ) : (
        <View style={{ paddingBottom: 10, flex: 1 }}>
          <FlatList
            data={sortedPendingApplications}
            renderItem={({ item }: { item: PendingApplications }) => (
              <View key={DateTimeUtils.dateDashToDefault(item.dateTransaction)}>
                <PendingsItem item={item} />
              </View>
            )}
            keyExtractor={(item) => item.documentNo}
          />
        </View>
      )}
      {/* Selection Filter */}
      <PendingFilter
        visible={handle.isVisible}
        state={state}
        close={() =>
          setHandle({
            isVisible: false,
          })
        }
        onHandleSearchSubmit={onHandleSearchSubmit as () => {}}
      />
    </React.Fragment>
  );
};

export default Pending;
