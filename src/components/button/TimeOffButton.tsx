// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useReducer } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Shadow } from 'react-native-shadow-2';

import { STYLES, ARRAY } from 'src';
import { useNavigation } from 'expo-router';
import { StateTimeOffButton, TypeNavStack, TypeObjectValues } from 'src/types/Types';
import { useHome } from 'src/contexts/tabs';

const TimeOffButton: React.FC = () => {
  const styles = STYLES.ComponentTimeOff;
  const navigation: TypeNavStack['navigation'] = useNavigation();

  const { state } = useHome();

  const [currState] = useReducer(
    (state: StateTimeOffButton, newState: Partial<StateTimeOffButton>) => ({ ...state, ...newState }),
    {
      imageSize: Math.max(15, (Dimensions.get('window').height * 0.13) / 1.3),
      padding: Dimensions.get('window').height * 0.015,
      row: ARRAY.timeOffButtons(navigation, state.leaveVacation, state.leaveSick),
    },
  );

  const commonProps = { style: { width: 50, height: 50, marginRight: 10 } };

  return (
    <View style={styles.container}>
      {currState.row.map((item: TypeObjectValues, index: number) => (
        <TouchableOpacity key={index} style={styles.button} onPress={item.navigate}>
          <Shadow offset={[1, 1.2]} distance={2} style={[styles.alignWrapper, { height: currState.imageSize }]}>
            <Image source={item.image} key={item.title} contentFit="contain" {...commonProps} />

            <View>
              <Text style={styles.totalText}>{item.count}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </Shadow>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TimeOffButton;