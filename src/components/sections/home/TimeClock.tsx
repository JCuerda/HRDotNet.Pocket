// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';

import { COLORS, STYLES, DateTimeUtils, STRINGS } from 'src';
import { useFetch } from 'src/hooks/useFetch';
import { ValuesTimeClock } from 'src/constants/Values';
import { StateTimeClock, TypeNavStack } from 'src/types/Types';
import { useHome } from 'src/contexts/tabs';

const TimeClock: React.FC = () => {
  const styles = STYLES.ComponentTimeClock;
  const navigation: TypeNavStack['navigation'] = useNavigation();

  const { params } = useHome();

  const [state, setState] = useReducer(
    (state: StateTimeClock, newState: Partial<StateTimeClock>) => ({ ...state, ...newState }),
    ValuesTimeClock.State,
  );

  useEffect(() => {
    const set = setInterval(() => setState({ time: DateTimeUtils.dayTimeWithSeconds() }), 1000);
    return () => clearInterval(set);
  }, [state.time]);

  useEffect(() => {
    params?.refresh &&
      (async () => {
        await useFetch.TimeClock(setState);
      })();
  }, [params]);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{DateTimeUtils.dayDateComplete2()}</Text>
      <Text style={styles.timeText}>{state.time || DateTimeUtils.dayTimeWithSeconds()}</Text>

      {false && <Text style={styles.clockInOutText}>
        {state.clocked.status
          ? STRINGS.clockedStatus(state.clocked.value, state.clocked.date, state.clocked.time)
          : STRINGS.noLogs}
      </Text>}

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate(STRINGS.pathClockInOut, state.clocked)}
      // onPress={() => alert('Geolocation Subscription Setup Required. Please contact your Service Provider for Assistance.')}
      >

        <Shadow distance={3} style={state.clocked.value === 1 ? styles.clockOutButton : styles.clockInButton}>
          <Ionicons name="stopwatch" size={state.clocked.value === 1 ? 25 : 23} color={COLORS.clearWhite} />

          <Text style={styles.timeInOutText}>{state.clocked.nextStatus || STRINGS.clockIn}</Text>
        </Shadow>
      </TouchableOpacity>
    </View>
  );
};

export default TimeClock;
