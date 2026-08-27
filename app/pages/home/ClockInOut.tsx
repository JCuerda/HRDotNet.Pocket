// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useCallback, useReducer, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, Circle, LatLng, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import { Shadow } from 'react-native-shadow-2'
import SlideButton from 'rn-slide-button';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import PageHeader from 'src/components/header/PageHeader';
import SuccessTimeClock from 'src/components/prompt/SuccessTimeClock';
import RefreshPage from 'src/components/use/RefreshPage';
import Toast from 'src/components/use/Toast';
import Loader from 'src/components/loader/Loader';
import { useFetch } from "src/hooks/useFetch";
import { Utils } from 'src/utils/Utils';
import { ValuesClockInOut } from 'src/constants/Values';
import { StateClockInOut, TypeHandle, TypeNavProp } from 'src/types/Types';
import { COLORS, STRINGS, STYLES, DateTimeUtils, ERRORS } from 'src';
import SwipeButton from 'rn-swipe-button';
import TimeDisplay from 'src/components/button/TimeDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClockInOut: React.FC<TypeNavProp> = ({ navigation }) => {
    const styles = STYLES.ClockInOut
    const params = useRoute().params as { value: number }
    const [radiusData, setRadiusData] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [state, setState] = useReducer(
        (state: StateClockInOut, newState: Partial<StateClockInOut>) => ({ ...state, ...newState }),
        ValuesClockInOut(params).State
    )

    const [handle, setHandle] = useReducer(
        (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
        ValuesClockInOut(params).Handle
    )

    const onCloseSuccessPrompt = async () => {
        setHandle({ isSuccess: false })
        navigation.navigate(STRINGS.pathTabStack, { screen: STRINGS.pathTabHome, refresh: true })
    }

    const onRefresh = useCallback(() => {
        setHandle({ isRestart: true })
    }, [])

    const onGetLocation = useCallback(async () => {
        const permission = await Location.requestForegroundPermissionsAsync()
        const geoPattern = STRINGS.geoPattern

        if (permission.status == 'denied') {
            Utils.alertSingle(
                ERRORS.permissionTitle,
                ERRORS.permissionLocation,
                () => {
                    navigation.navigate(STRINGS.pathTabStack, {
                        screen: STRINGS.pathTabHome,
                        params: { refresh: true }
                    })

                    Linking.openSettings()
                }
            )
        } else {
            Utils.getLocationClocked(state, setState)
        }
    }, [state.location, handle.isRestart])

    const onRefreshHandle = () => {
        setState({ location: '' })
        onGetLocation()
    }

    const onPressClocked = async () => {
        try {
            setHandle({ isLoading: true })
            await useFetch.ClockInOut(state, setState, setHandle)
        } catch (error: unknown) {
            alert(error)
        } finally {
            setHandle({ isLoading: false })
        }
    }


    useEffect(() => {
        onGetLocation()
    }, [state.geofences, handle.isRestart])

    useEffect(() => {
        const fetchRadius = async () => {
            try {
                const radius = await useFetch.TimeClockRadius(`${process.env.EXPO_PUBLIC_TIME_CLOCK_RADIUS}`);
                setRadiusData(radius);
                const existingData = await AsyncStorage.getItem('ClockedData');

                existingData === null
                    ? await AsyncStorage.setItem('ClockedData', JSON.stringify(state))
                    : await AsyncStorage.mergeItem('ClockedData', JSON.stringify(state));
            } catch (error) {
                setError('Error fetching radius');
            }
        };

        fetchRadius();

    }, [state.clockedData]);


    return (
        <React.Fragment>
            <PageHeader name={STRINGS.pageTitleClockInOut} />

            {handle.isToast!.show && (
                <Toast handle={handle.isToast!} setHandle={setHandle} />
            )}

            {handle.isLoading && (<Loader />)}

            {state.location ? (
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        region={state?.region}
                        userInterfaceStyle='light'
                        userLocationPriority='high'
                        showsUserLocation
                        followsUserLocation
                        shouldRasterizeIOS
                        userLocationUpdateInterval={10}
                        renderToHardwareTextureAndroid
                    >

                        <Marker coordinate={state.location as LatLng} />

                        {state.geofences && state.geofences?.map((
                            geofence: {
                                latitude: number
                                longitude: number
                                radius: number
                            },
                            index: number
                        ) => (
                            <Circle
                                key={index}
                                center={{
                                    latitude: geofence.latitude,
                                    longitude: geofence.longitude
                                }}
                                radius={radiusData!}
                                strokeWidth={2}
                                strokeColor={
                                    state.isInside &&
                                        state?.isInside[index] ? COLORS.opaqueGreen : COLORS.opaqueRed
                                }
                                fillColor={
                                    state.isInside &&
                                        state?.isInside[index] ? COLORS.opaqueGreen : COLORS.opaqueRed
                                }
                            />
                        ))}
                    </MapView>

                    <Shadow style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.refreshBtn}
                            onPress={() => onRefreshHandle()}
                        >
                            <FontAwesome name="refresh" size={20} color={COLORS.darkGray} />
                        </TouchableOpacity>

                        <View style={styles.dateTimeWrapper}>
                            <Text style={styles.dateText}>
                                {DateTimeUtils.getCurrDateWordWithDay()}
                            </Text>
                            {/* Separated the displaying of Time to stop the rendering of parent component for Swipe Button  */}
                            <TimeDisplay />
                        </View>


                        <SwipeButton
                            height={60}
                            swipeSuccessThreshold={80}
                            shouldResetAfterSuccess={true}
                            title={STRINGS.slideClock(state.status)}
                            titleFontSize={16}
                            titleColor="#fff"
                            titleStyles={{
                                fontFamily: 'Inter_500Medium'
                            }}
                            containerStyles={{
                                backgroundColor:
                                    params.value === 0 ? COLORS.lighterOrange : COLORS.powderBlue
                            }}
                            railBackgroundColor={
                                params.value === 0 ? COLORS.orange : COLORS.blue
                            }
                            thumbIconBackgroundColor="#ffffffff"
                            disabled={
                                state.isInside &&
                                !state.isInside.some((inside: boolean) => inside)
                            }
                            disabledRailBackgroundColor="#fdbb98ff"
                            disabledThumbIconBackgroundColor="#fdbb98ff"
                            onSwipeSuccess={onPressClocked}
                        />

                    </Shadow>

                </View>

            ) : (
                <RefreshPage
                    onRefresh={onRefresh}
                    refreshing={handle.refreshing!}
                    text={STRINGS.fetchLocation}
                    showText={STRINGS.slideLoad}
                />
            )}

            {
                handle.isSuccess && <>
                    <SuccessTimeClock
                        state={state}
                        visible={true}
                        onCloseSuccessPrompt={onCloseSuccessPrompt}
                    />
                </>
            }


        </React.Fragment>
    )
}

export default ClockInOut