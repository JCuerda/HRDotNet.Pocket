// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda
import React, { useCallback, useEffect, useRef } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, FlatList, StatusBar, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Toast from 'src/components/use/Toast';
import PageHeader from 'src/components/header/PageHeader';
import { COLORS, STRINGS, STYLES } from 'src';
import RequestFilter from 'src/components/use/RequestFilter';
import { useReviewals } from 'src/contexts/pages';
import { useFocusEffect } from 'expo-router';
import ReviewalsPanel from 'src/components/panel/home/approver/ReviewalsPanel';
import ConfirmmationReviewal from 'src/components/prompt/ConfirmationReviewal';
import { useGlobalStore } from 'src/store/GlobalStore';
import { SchemaRequestApplications, TypeNavStack } from 'src/types/Types';
import { FilingPanel } from 'src/constants/Enum';
import { FilingUtils } from 'src/utils/Utils';

const Reviewals: React.FC<TypeNavStack> = ({ navigation }) => {
  const styles = STYLES.Request;

  const buttonListRef = useRef<FlatList<any>>(null);
  const { cutOffPeriod, reviewalCounts, resetCancelAction, selectedApplicationTab } = useGlobalStore();

  const { params, state, setState, handle, setHandle, onHandlePress, onHandleSetURLReviewal, onHandleFetchReviewal } =
    useReviewals();

  useEffect(() => {
    onHandleSetURLReviewal();
  }, [state.selectedButton, handle.refreshing]);

  useEffect(() => {
    onHandleFetchReviewal();
  }, [handle.refreshing, state.urlQuery, state.page, state.fetchKey, params]);

  useEffect(() => {
    if (selectedApplicationTab == null) return;
    setState({ selectedButton: selectedApplicationTab })
    buttonListRef.current?.scrollToIndex({
      index: selectedApplicationTab,
      animated: true,
      viewPosition: 0.5,
    });
  }, [selectedApplicationTab])

  useFocusEffect(
    useCallback(() => {
      setHandle({ isLoading: true, refreshing: true });
      resetCancelAction()
      const timeoutId = setTimeout(() => {
        setHandle({ isLoading: false, refreshing: true });
      }, 800);
      return () => clearTimeout(timeoutId);
    }, []),
  );

  return (
    <React.Fragment>
      <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />

      <PageHeader name={STRINGS.pageTitleReviewals} customNavigate={() => {
        navigation.navigate(STRINGS.pathTabStack);
      }} />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <RequestFilter state={[state, setState]} handle={[handle, setHandle]} />
      <Animatable.View animation={'fadeIn'} duration={900} style={{ opacity: 1, flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <FlatList
              ref={buttonListRef}
              data={state.buttons}
              renderItem={({ item, index }) => {
                const filteredItems =
                  reviewalCounts?.[index]?.filter((item: SchemaRequestApplications) =>
                    FilingUtils.isEligibleFiling(item, index, cutOffPeriod),
                  ) ?? [];

                const count = filteredItems.length;

                return (
                  <TouchableOpacity
                    style={[styles.button, state.selectedButton === index && styles.selectedButton]}
                    onPress={() => onHandlePress(index)}
                    disabled={state.selectedButton === index}
                  >
                    <View style={styles.tabItem}>
                      {count !== 0 && (
                        <Text
                          style={[
                            styles.approvalCountButton,
                            state.selectedButton === index
                              ? {
                                color: COLORS.orange,
                                backgroundColor: COLORS.clearWhite,
                              }
                              : {
                                color: COLORS.clearWhite,
                                backgroundColor: COLORS.orange,
                              },
                          ]}
                        >
                          {count}
                        </Text>
                      )}

                      <Text
                        style={[
                          styles.buttonText,
                          state.selectedButton === index && styles.selectedTextButton,
                          index === FilingPanel.CTO && { color: COLORS.gray },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
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

          {state.selectedButton != null ? <ReviewalsPanel /> : null}
        </View>
      </Animatable.View>

      <ConfirmmationReviewal />
    </React.Fragment>
  );
};

export default Reviewals;
