// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import * as Animatable from 'react-native-animatable';
import { Image } from 'expo-image';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Toast from 'src/components/use/Toast';
import TimeClock from 'src/components/sections/home/TimeClock';
import TimeOffButton from 'src/components/button/TimeOffButton';
import MenuButton from 'src/components/button/MenuButton';
import LoaderPage from 'src/components/loader/LoaderPage';
import { COLORS, STYLES, STRINGS, ASSETS } from 'src';
import { TypeNavStack } from 'src/types/Types';
import { GestureDetector } from 'react-native-gesture-handler';
import { RequestCounts, Utils } from 'src/utils/Utils';
import { useHome } from 'src/contexts/tabs';
import { useFocusEffect } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFetch } from 'src/hooks/useFetch';
import { useGlobalStore } from 'src/store/GlobalStore';
import { ValidateError } from 'src/constants/Enum';

const Home: React.FC<TypeNavStack> = ({ navigation }) => {
  const {
    insets,
    platform,
    params,
    state,
    handle,
    setHandle,
    onHandleEffectI,
    onHandleEffectII,
    fetchUserDetails,
  } = useHome();
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [employeePayrollInfo, setEmployeePayrollInfo] = useState({
    paymentFrequencyId: 0,
    payrollGroupId: 0,
  });

  const { setEmployeeName, setCutoffPeriod } = useGlobalStore();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await useFetch.Profile();
        setEmployeeName(data.FullName);
        setEmployeeName(data.FullName);
        setEmployeePayrollInfo({
          paymentFrequencyId: data.paymentFrequecyId,
          payrollGroupId: data.payrollGroupId,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (
      employeePayrollInfo.paymentFrequencyId === ValidateError.IsZero ||
      employeePayrollInfo.payrollGroupId === ValidateError.IsZero
    ) {
      return;
    }

    const loadCurrentCutoff = async () => {
      try {
        const data = await useFetch.CurrentCutoff(
          employeePayrollInfo.paymentFrequencyId,
          employeePayrollInfo.payrollGroupId,
        );

        if (data) {
          setCutoffPeriod([data?.dateFrom, data?.dayPayout]);
        }
      } catch (error) {
        console.error('Current cutoff error:', error);
      }
    };

    loadCurrentCutoff();
  }, [employeePayrollInfo]);

  const styles = STYLES.Home(insets, platform);

  useEffect(() => {
    onHandleEffectI;
  }, [params?.refresh!]);


  useFocusEffect(
    useCallback(() => {
      fetchUserDetails();
    }, [state.userDetails.profile_uri]),
  );

  useFocusEffect(
    useCallback(() => {
      RequestCounts.refreshReviewalCounts();
      RequestCounts.refreshApprovalCounts();
      onHandleEffectII();
    }, []),
  );

  (async () => {
    try {
      const token = await AsyncStorage.getItem('AT');
      if (token) {
        const { EmployeeName } = jwtDecode<{ EmployeeName: string }>(token);
        const lastName = EmployeeName?.split(',');
        setEmployeeLastName(lastName?.[0] ?? '');
      } else {
        throw new Error('Token Not Found.');
      }
    } catch (err) { }
  })();
  return (
    <React.Fragment>
      <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      {handle.isLoading ? (
        <LoaderPage />
      ) : (
        <Animatable.View animation={'fadeIn'} duration={100} useNativeDriver style={{ opacity: 1, flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.topView}>
              <View style={styles.headerView}>
                <View style={styles.headerNavigation}>
                  <TouchableOpacity onPress={() => navigation.navigate(STRINGS.pathDrawer)}>
                    <FontAwesome name={'bars'} size={25} color={COLORS.clearWhite} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => navigation.navigate(STRINGS.pathNotification)}>
                    <FontAwesome name={'bell'} size={25} color={COLORS.clearWhite} />
                  </TouchableOpacity>
                </View>

                <View style={styles.welcomeView}>
                  <View style={styles.iconWrapper}>
                    {state.userDetails.profile_uri ? (
                      <View>
                        <Image
                          source={{ uri: state.userDetails.profile_uri as string }}
                          cachePolicy={'disk'}
                          contentFit="cover"
                          style={{
                            width: 80,
                            height: 80,
                            alignSelf: 'center',
                            backfaceVisibility: 'hidden',
                          }}
                          transition={300}
                        />
                      </View>
                    ) : (
                      <View>
                        <Image
                          source={ASSETS.user}
                          cachePolicy={'disk'}
                          contentFit="cover"
                          style={{ width: 83, height: 83, bottom: 5 }}
                        />
                      </View>
                    )}
                  </View>

                  <View>
                    <Text style={styles.hello}>{STRINGS.greetings}</Text>
                    {/* <Text style={styles.nameText}>{state.userDetails.FirstName}</Text> */}
                    <Text style={styles.nameText}>{employeeLastName}</Text>

                    <View style={styles.statusView}>
                      <Entypo name="briefcase" size={17} color={COLORS.clearWhite} />
                      <Text style={styles.statusText}>{STRINGS.workDay}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.timeClockText}>{STRINGS.titleTimeClock}</Text>
              </View>
            </View>

            <Shadow distance={20} style={styles.timeClockView}>
              <TimeClock />
            </Shadow>

            <View style={styles.menuView}>
              <GestureDetector gesture={Utils.redirectSelection(setHandle)}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  <View style={[styles.sectionView, { marginBottom: 20 }]}>
                    <Text style={styles.mainTitle}>{STRINGS.homeTitleFirst}</Text>

                    <MenuButton show={1} />
                  </View>

                  <View style={styles.sectionView}>
                    <Text style={styles.mainTitle}>{STRINGS.homeTitleSecond}</Text>

                    <TimeOffButton />
                  </View>
                </ScrollView>
              </GestureDetector>
            </View>
          </View>
        </Animatable.View>
      )}
    </React.Fragment>
  );
};

export default Home;
