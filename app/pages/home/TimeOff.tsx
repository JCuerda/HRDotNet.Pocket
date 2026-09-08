// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Image } from 'expo-image';
import { Shadow } from 'react-native-shadow-2';

import LoaderPage from 'src/components/loader/LoaderPage';
import PageHeader from 'src/components/header/PageHeader';
import TimeOffItem from 'src/components/item/TimeOffItem';
import { LeaveLedgerEntries } from 'src/types/Types';
import { STRINGS, COLORS, STYLES, ASSETS } from 'src';
import { useTimeOff } from 'src/contexts/pages';
import Note from 'src/components/note/Note';
import EndListNote from 'src/components/note/EndListNote';
import { useFocusEffect } from '@react-navigation/native';

const TimeOff: React.FC = () => {
  const styles = STYLES.TimeOff;

  const { state, handle, setHandle, setState, onHandleEffectI, onHandleFetchLeaveLedger } = useTimeOff();

  const renderItem = ({ item, index }: { item: LeaveLedgerEntries; index: number }) => (
    <Animatable.View
      key={index}
      animation={'fadeIn'}
      duration={500}
      useNativeDriver
      shouldRasterizeIOS
      renderToHardwareTextureAndroid
      easing="ease-in-out-expo"
      style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
    >
      <MemoizedRequestItem item={item} index={index} />
    </Animatable.View>
  );

  const MemoizedRequestItem = React.memo(({ item, index }: { item: LeaveLedgerEntries; index: number }) => {
    return <TimeOffItem item={item} />;
  });

  const DisplayContent = (one: string, two: string) => {
    return state.page == 1 ? one : two;
  };

  useEffect(() => {
    onHandleEffectI();
  }, []);

  useEffect(() => {
    onHandleFetchLeaveLedger()
  }, [state.pageCount])

  const ListFooterComponent = () => {
    return (
      <React.Fragment>
        {Array.isArray(state.data) && state.data.length <= 0 && !handle.isLoading && !handle.isWaiting && <Note text={STRINGS.nothingFound} icon="magnifying-glass" />}

        {handle.isWaiting && (
          <View style={styles.loader}>
            <Image source={ASSETS.loadEllipsis} style={{ width: 40, height: 40 }} />

            <Text style={styles.loaderText}>{STRINGS.loading}</Text>
          </View>
        )}

        {!handle.isLoadMore && state.data.length > 0 && <EndListNote />}
      </React.Fragment>
    );
  };

  const onHandleSetReachedEnd = () => {

    setHandle({ isWaiting: true });
    setState({
      pageCount: (state.pageCount || 1) + 1,
    });

  };


  return (
    <View style={styles.container}>
      <PageHeader name={DisplayContent(STRINGS.pageTitleVLeave, STRINGS.pageTitleSLeave)} />

      <View style={styles.topContainer}>
        <Image
          source={DisplayContent(ASSETS.iconVacation, ASSETS.iconSick)}
          style={{ width: 70, height: 70, marginRight: 10 }}
        />

        <View>
          <Text style={styles.titleText}>{STRINGS.VLTitleI}</Text>
          <Text style={styles.yearText}>
            for <Text style={styles.yearValue}>{state.year}</Text>
          </Text>
        </View>
      </View>

      {handle.isLoading ? (
        <LoaderPage />
      ) : (
        <View style={styles.wrapper}>
          <View style={styles.creditContainer}>
            <Shadow distance={2} offset={[0.5, 1]} style={styles.creditShadow}>
              <Text style={styles.creditsValue}>{state.count}</Text>
            </Shadow>
          </View>

          <Text style={styles.detailsTitle}>{STRINGS.details}</Text>

          {Array.isArray(state.data) && state.data.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={
                Array.isArray(state.data) && state.data.length > 0
                  ? [...state.data].sort((a, b) => {
                    if (a.documentNo === null) return 1;
                    if (b.documentNo === null) return -1;

                    return b.documentNo.localeCompare(a.documentNo);
                  })
                  : []
              }
              onEndReached={() => {
                handle.isLoadMore &&
                  !handle.isWaiting &&
                  state.data &&
                  onHandleSetReachedEnd();
              }}

              renderItem={renderItem}
              ListFooterComponent={ListFooterComponent}
            />
          ) : (
            <Note text={STRINGS.nothingFound} icon="magnifying-glass" />
          )}
        </View>
      )}
    </View>
  );
};

export default TimeOff;
