// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useCallback } from 'react';
import { Text, View, RefreshControl } from 'react-native';
import { Image } from 'expo-image';
import * as Animatable from 'react-native-animatable';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

import LoaderPage from 'src/components/loader/LoaderPage';
import EndListNote from 'src/components/note/EndListNote';
import Note from 'src/components/note/Note';
import ApprovalsAction from 'src/components/use/ApprovalsAction';
import ApprovalsItem from 'src/components/item/ApprovalsItem';
import Checkbox from 'expo-checkbox';
import Line from 'src/components/use/Line';
import SearchAndNew from 'src/components/use/SearchAndNew';
import Loader from 'src/components/loader/Loader';
import ApprovalsPrompt from 'src/components/prompt/ApprovalsPrompt';
import SuccessPrompt from 'src/components/prompt/SuccessPrompt';

import { SchemaRequestApplications, TypeNavStack } from 'src/types/Types';
import { Utils } from 'src/utils/Utils';
import { COLORS, STRINGS, STYLES, ASSETS } from 'src';
import { useApprovals } from 'src/contexts/pages';

const ApprovalsPanel: React.FC = () => {
  const styles = STYLES.ComponentRequestPanel;
  const navigation: TypeNavStack['navigation'] = useNavigation();

  const {
    state,
    handle,
    setHandle,
    onHandleCheckbox,
    onHandleRefreshControl,
    onHandleSetReachedEnd,
    onHandleClosePrompt,
    isSelectable
  } = useApprovals();

  const renderItem = useCallback(
    ({ item, index }: { item: SchemaRequestApplications; index: number }) => (
      <Animatable.View
        animation={'fadeIn'}
        duration={120}
        useNativeDriver
        shouldRasterizeIOS
        renderToHardwareTextureAndroid
        easing="ease-in-out-expo"
        style={{ opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite }}
      >
        <View style={{
          marginTop: index === 0 ? 10 : 0
        }}>
          <Line space={2} horizontalSpace={10} />
          <View style={{ flexDirection: 'row' }}>
            <Checkbox
              color={COLORS.orange}
              style={styles.checkBox}
              value={item.isChecked}
              disabled={!isSelectable(item)}
              onValueChange={(value) => onHandleCheckbox(item, value)}
            />

            <MemoizedRequestItem item={item} />
          </View>
        </View>
      </Animatable.View>
    ),
    [state.selectedButton, state.data],
  );

  const MemoizedRequestItem = React.memo(({ item }: { item: SchemaRequestApplications }) => (
    <ApprovalsItem onPanel={state.selectedButton} data={item} navigation={navigation} />
  ));

  const ListFooterComponent = () => {
    return (
      <React.Fragment>
        {state.data.length <= 0 && !handle.isLoading && !handle.isWaiting && <Note text={STRINGS.nothingFound} icon="magnifying-glass" />}

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
          <SearchAndNew setHandle={setHandle} onlySearch={true} onPanel={state.selectedButton} filterValue={`${state.displayValue}`} />

          <ApprovalsAction />
        </React.Fragment>
      )}

      {!handle.isLoading && (
        <FlashList
          data={state.data}
          estimatedItemSize={100}
          onEndReachedThreshold={0.1}
          renderToHardwareTextureAndroid
          shouldRasterizeIOS
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={handle.isLoading!} onRefresh={() => onHandleRefreshControl()} />}
          onEndReached={() => {
            state.data.length >= Number(process.env.EXPO_PUBLIC_REQUEST_PAGESIZE) &&
              handle.isLoadMore &&
              !handle.isWaiting &&
              state.data &&
              onHandleSetReachedEnd();
          }}
          ListFooterComponent={ListFooterComponent}
        />
      )}

      {state.failedList!.length > 0 ? (
        <ApprovalsPrompt />
      ) : (
        <SuccessPrompt
          title={STRINGS.success}
          subTitle={STRINGS.successApprovals(handle.isAction as number, state.count!)}
          buttonText={STRINGS.okay}
          visible={handle.isSuccess!}
          onHandleClosePrompt={() => onHandleClosePrompt()}
        />
      )}
    </React.Fragment>
  );
};

export default ApprovalsPanel;
