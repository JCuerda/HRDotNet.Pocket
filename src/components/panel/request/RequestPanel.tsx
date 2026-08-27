// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useCallback, useEffect } from 'react';
import { RefreshControl, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

import Loader from 'src/components/loader/Loader';
import Note from 'src/components/note/Note';
import EndListNote from 'src/components/note/EndListNote';
import RequestItem from 'src/components/item/RequestItem';
import SearchAndNew from 'src/components/use/SearchAndNew';
import LoaderPage from 'src/components/loader/LoaderPage';

import { ASSETS, STRINGS, STYLES } from 'src';
import { SchemaRequestApplications, TypeNavStack } from 'src/types/Types';
import { Utils } from 'src/utils/Utils';
import { useRequest } from 'src/contexts/tabs';
import { useFocusEffect } from '@react-navigation/native';
const RequestPanel: React.FC = () => {

  const styles = STYLES.ComponentRequestPanel;
  const navigation: TypeNavStack['navigation'] = useNavigation();

  const { state, setState, handle, setHandle } = useRequest();

  useEffect(() => {
    setState({
      filterType: undefined,
      filterValue: undefined,
      displayValue: undefined
    })
  }, [state.selectedButton])

  const renderItem = useCallback(
    ({ item }: { item: SchemaRequestApplications }) => (
      <Animatable.View
        animation={'fadeIn'}
        duration={400}
        useNativeDriver
        shouldRasterizeIOS
        renderToHardwareTextureAndroid
        easing="ease-in-out-expo"
        style={styles.container}
      >
        <MemoizedRequestItem item={item} />
      </Animatable.View>
    ),
    [state.selectedButton, state.data],
  );

  const MemoizedRequestItem = React.memo(({ item }: { item: SchemaRequestApplications }) => (
    <RequestItem onPanel={state.selectedButton} data={item} navigation={navigation} />
  ));

  const ListFooterComponent = () => {
    return (
      <React.Fragment>
        {state.data.length <= 0 && !handle.isLoading && !handle.isWaiting && <Note text={STRINGS.nothingFound} icon="magnifying-glass" />}

        {handle.isWaiting && (
          <View style={styles.loader}>
            <Image source={ASSETS.loadEllipsis} style={{ width: 40, height: 40 }} resizeMode="contain" />

            <Text style={styles.loaderText}>{STRINGS.loading}</Text>
          </View>
        )}

        {!handle.isLoadMore && state.data.length > 0 && <EndListNote />}
      </React.Fragment>
    );
  };

  useFocusEffect(
    useCallback(() => {
      setHandle({ isLoading: true, refreshing: true });
      const timeoutId = setTimeout(() => {
        setHandle({ isLoading: false, refreshing: true });
      }, 800);
      return () => clearTimeout(timeoutId);
    }, [])
  );


  return (
    <React.Fragment>
      {handle.isLoading ? (
        Utils.platformCheck() ? (
          <LoaderPage />
        ) : (
          <Loader />
        )
      ) : (
        <React.Fragment>
          <SearchAndNew setHandle={setHandle} onPanel={state.selectedButton} filterValue={`${state.displayValue}`} />
        </React.Fragment>
      )}

      {!handle.isLoading && (
        <FlashList
          data={state.data}
          estimatedItemSize={126}
          onEndReachedThreshold={0.1}
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          keyExtractor={(item, index) => String(index)}
          removeClippedSubviews={true}
          renderItem={renderItem}
          onEndReached={() => {
            if (
              state.data.length >= Number(process.env.EXPO_PUBLIC_REQUEST_PAGESIZE) &&
              handle.isLoadMore &&
              !handle.isWaiting &&
              state.data
            ) {
              setState({ page: state.page + 1 });
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={handle.isLoading!}
              onRefresh={() => {
                setHandle({ isLoading: true, refreshing: !handle.refreshing });
                setState({ page: 1 });
              }}
            />
          }
          ListFooterComponent={ListFooterComponent}
        />
      )}
    </React.Fragment>
  );
};

export default RequestPanel;
