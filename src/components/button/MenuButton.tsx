// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageRequireSource } from 'react-native';
import { Image } from 'expo-image';
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-shadow-2';

import { STYLES, STRINGS, ASSETS, COLORS } from 'src';
import { FilingUtils, Utils } from 'src/utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { PropsMenuButton, TypeObjectValues } from 'src/types/Types';
import { useHome } from 'src/contexts/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useGlobalStore } from 'src/store/GlobalStore';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const MenuButton: React.FC<PropsMenuButton> = ({ show }) => {
  const styles = STYLES.ComponentMenuButton;

  const navigation = useNavigation();
  const { state, checkTeamMembers } = useHome();
  const { reviewalCounts, approvalCounts, cutOffPeriod, resetSelectedApplicationTab } = useGlobalStore();

  const reviewalsTotal = FilingUtils.countEligible(reviewalCounts, cutOffPeriod);
  const approvalsTotal = FilingUtils.countEligible(approvalCounts, cutOffPeriod, [STRINGS.filed, STRINGS.reviewed]);

  const badge = (text: number) => {
    return (
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.badge}>
        <Text style={styles.badgeText}>{text}</Text>
      </Animatable.View>
    );
  };

  const onShowImage = (a: ImageRequireSource, b: ImageRequireSource) => {
    return show === 0 ? a : b;
  };
  const onShowTitle = (a: string, b: string) => {
    return show === 0 ? a : b;
  };

  const [approver, setApprover] = useState<boolean>(false);
  const [reviewer, setReviewer] = useState<boolean>(false);

  (async () => {
    try {
      const token = await AsyncStorage.getItem('AT');
      if (token) {
        const { CanApprove: approver, CanReview: reviewer } = jwtDecode<{ CanApprove: boolean; CanReview: boolean }>(
          token,
        );
        setApprover(approver);
        setReviewer(reviewer);
      } else {
        throw new Error('Token Not Found.');
      }
    } catch (err) { }
  })();

  // This hook is reponsible for checking if the user
  // have any team members.
  useEffect(() => {
    checkTeamMembers();
  }, [state.teamMembersCount]);

  const imageSize = Math.max(36, Dimensions.get('window').height / 36);
  const tileSize = imageSize + 18;
  const padding = Dimensions.get('window').height * 0.015;

  const currState = {
    imageSize,
    tileSize,
    padding,
    firstRow: [
      {
        navigate: () => navigation.navigate(STRINGS.pathTimesheet as never),
        image: ASSETS.iconTimesheet,
        title: STRINGS.menuBtnTitleI,
      },
      {
        navigate: () => navigation.navigate(STRINGS.pathLoanLedger as never),
        badge: state.loanCount != 0 && badge(state.loanCount),
        image: ASSETS.iconLoanLedger,
        title: STRINGS.menuBtnTitleII,
      },

    ],
    secondRow: [
      {
        navigate: () => {
          navigation.navigate(STRINGS.pathReviewals as never)
          resetSelectedApplicationTab()
        },
        badge: reviewalsTotal !== 0 && badge(reviewalsTotal),
        image: ASSETS.iconPending,
        title: STRINGS.menuBtnTitleIII,
        disabled: !reviewer,
      },
      {
        navigate: () => {
          navigation.navigate(STRINGS.pathApprovals as never)
          resetSelectedApplicationTab()
        },
        badge: approvalsTotal !== 0 && badge(approvalsTotal),
        image: onShowImage(ASSETS.iconCOSRequest, ASSETS.iconApprovals),
        title: onShowTitle(STRINGS.menuBtnTitleUserI, STRINGS.menuBtnTitleApproverI),
        disabled: !approver,
      },

      // {
      //   navigate: () => {
      //     if (state.teamMembersCount! > 0) {
      //       true && (navigation as any).navigate('TeamMembers', { screen: 'TeamsList' });
      //     } else {
      //       false && (navigation as any).navigate('TeamMembers', { screen: 'TeamsList' });
      //     }
      //   },
      //   image: onShowImage(ASSETS.iconOBRequest, ASSETS.iconTeams),
      //   title: onShowTitle(STRINGS.menuBtnTitleUserII, STRINGS.menuBtnTitleApproverII),
      //   //disabled: state.teamMembersCount! <= 0
      //   disabled: true,
      // },
      // {
      //   navigate: () => (navigation as any).navigate('Contacts', { screen: 'ContactsList' }),
      //   image: onShowImage(ASSETS.iconOTRequest, ASSETS.iconContacts),
      //   title: onShowTitle(STRINGS.menuBtnTitleUserIII, STRINGS.menuBtnTitleApproverIII),
      //   disabled: true,
      // },
    ],
  };

  const commonProps = {
    placeholderContent: Utils.placeholderLoading(currState),
    style: { width: currState.imageSize, height: currState.imageSize },
  };


  const DisplayButton = ({ item }: { item: TypeObjectValues }) => {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={item.navigate}
        disabled={item.disabled || false}
      >
        <Shadow
          offset={[1, 1.2]}
          distance={2.5}
          style={[
            styles.alignWrapper,
            {
              height: 70,
              opacity: item.disabled ? 0.6 : 1,
            },
          ]}
        >
          {item.badge && item.badge}

          <Image
            source={item.image}
            key={item.title}
            contentFit="contain"
            {...commonProps}
          />

          <View>

            <Text style={styles.title}>{item.title}</Text>
          </View>
        </Shadow>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        {currState.firstRow.map((item: TypeObjectValues, index: number) => (
          <React.Fragment key={index}>{DisplayButton({ item })}</React.Fragment>
        ))}
      </View>

      <View style={styles.buttonWrapper}>
        {currState.secondRow.map((item: TypeObjectValues, index: number) => (
          <React.Fragment key={index}>{DisplayButton({ item })}</React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default MenuButton;
