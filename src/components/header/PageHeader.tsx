// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { COLORS, STYLES } from 'src';
import { PropsPageHeader } from 'src/types/Types';

const PageHeader: React.FC<PropsPageHeader> = ({ name, customNavigate }) => {
  const [isDisabled, setDisabled] = useState(false);
  const navigation = useNavigation();

  const styles = STYLES.ComponentPageHeader;
  const insets = useSafeAreaInsets();

  const onBackHandler = () => {
    setDisabled(true);

    if (customNavigate) {
      customNavigate();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.topHeader, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backButton} onPress={onBackHandler} disabled={isDisabled ? true : false}>
        <AntDesign name="arrowleft" size={30} color={COLORS.clearWhite} />
      </TouchableOpacity>

      <Text style={styles.textHeader}>{name}</Text>
    </View>
  );
};

export default PageHeader;
