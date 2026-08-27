// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import Toast from 'src/components/use/Toast';
import TabHeader from 'src/components/header/TabHeader';
import RequestFilter from 'src/components/use/RequestFilter';
import RequestPanel from 'src/components/panel/request/RequestPanel';
import { COLORS, STRINGS, STYLES } from 'src';
import { ParamsTabNav } from 'src/types/Types';
import { useRequest } from 'src/contexts/tabs';
import { useGlobalStore } from 'src/store/GlobalStore';

const Request: React.FC = () => {
  const styles = STYLES.Request;
  const params = useRoute().params as ParamsTabNav;
  const { selectedApplicationTab } = useGlobalStore()
  const {
    state,
    setState,
    handle,
    setHandle,
    onHandlePress,
    onHandleFetchRequest,
    onHandleInitial
  } = useRequest();

  const buttonListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    onHandleInitial()
  }, [state.selectedButton, handle.refreshing])

  useEffect(() => {
    onHandleFetchRequest();
  }, [handle.refreshing, state.urlQuery, state.page, state.fetchKey, params]);

  useEffect(() => {
    setState({ selectedButton: selectedApplicationTab })
  }, [selectedApplicationTab])

  useEffect(() => {
    if (state.selectedButton == null) return;

    buttonListRef.current?.scrollToIndex({
      index: state.selectedButton,
      animated: true,
      viewPosition: 0.5,
    });
  }, [state.selectedButton])



  return (
    <React.Fragment>
      <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />

      <TabHeader headerName={STRINGS.tabTitleRequest} />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <RequestFilter state={[state, setState]} handle={[handle, setHandle]} />

      <Animatable.View animation={'fadeIn'} duration={900} style={{ opacity: 1, flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            {/* Tab under Request Header */}
            <FlatList
              ref={buttonListRef}
              data={state.buttons}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[styles.button, state.selectedButton === index && styles.selectedButton]}
                  onPress={() => onHandlePress(index)}
                  disabled={state.selectedButton === index ? true : false}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      state.selectedButton === index && styles.selectedTextButton,
                      index == 7 && { color: COLORS.gray },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.buttonList}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScrollToIndexFailed={(info) => {
                setTimeout(() => {
                  buttonListRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                    viewPosition: 0.5,
                  });
                }, 100);
              }}
            />
          </View>

          {state.selectedButton != null && <RequestPanel />}
        </View>
      </Animatable.View>
    </React.Fragment>
  );
};

export default Request;
