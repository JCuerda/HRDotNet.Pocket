// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import StyledText from 'react-native-styled-text';
import Checkbox from 'expo-checkbox';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Ionicons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import FileAttachedNote from 'src/components/note/FileAttachedNote';
import RequestField from 'src/components/sections/request/RequestField';
import { ARRAY, COLORS, STRINGS, STYLES } from 'src';
import { CheckboxData, TypeNavStack } from 'src/types/Types';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Utils } from './Utils';

export const UtilsDisplay = {
  DisplayFieldOnlyInput: (
    handle: boolean,
    title: string,
    value: string | undefined,
    allowInputCheck: boolean,
    withAsterisk?: boolean,
  ) => {
    const styles = STYLES.NewRequest;

    return (
      <View style={styles.wrapper}>
        <RequestField
          title={title}
          inputValue={value}
          isInputCheck={allowInputCheck ? handle : undefined}
          withAsterisk={withAsterisk}
        />

        <View style={styles.disabledInput}>
          <Text style={styles.disabledInputText}>{value || STRINGS.none}</Text>
        </View>
      </View>
    );
  },

  DisplayFieldWithIcon: (
    handle: boolean,
    title: string,
    value: string,
    allowInputValue: boolean,
    convertValue: string | undefined,
    placeholder: string,
    onPress: () => void,
    icon: React.ComponentProps<typeof Ionicons>['name'],
    withAsterisk?: boolean,
    disabled?: boolean,
  ) => {
    const styles = STYLES.NewRequest;

    return (
      <View style={styles.wrapper}>
        <RequestField
          title={title}
          inputValue={allowInputValue ? value : undefined}
          isInputCheck={allowInputValue ? handle : undefined}
          withAsterisk={withAsterisk}
        />

        <View style={[styles.rowView, disabled ? styles.disabledDate : styles.border]}>
          <StyledText style={styles.text} textStyles={STYLES.StyledText}>
            {value ? convertValue : placeholder}
          </StyledText>

          <TouchableOpacity onPress={() => onPress()}>
            <Ionicons name={icon} size={24} color={COLORS.lighterGray} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },

  DisplayFieldCheckbox: (
    data: Array<CheckboxData>,
    allowInputValue: boolean,
    handle: boolean,
    checkSelect: number | null,
    value: string | number,
    title: string,
    onHandleCheck: (item: CheckboxData, index: number) => void,
    showFieldTitle?: boolean,
    withAsterisk?: boolean,
    disabled?: boolean,
  ) => {
    const styles = STYLES.NewRequest;

    return (
      <View style={styles.wrapper}>
        {showFieldTitle && (
          <RequestField
            title={title}
            inputValue={allowInputValue ? value : undefined}
            isInputCheck={allowInputValue ? handle : undefined}
            withAsterisk={withAsterisk}
          />
        )}

        <View style={styles.checkboxView}>
          {data.map((item: CheckboxData, index: number) => {
            const isSelected = checkSelect === index + 1;

            return (
              <View
                style={styles.checkboxItem}
                key={index + 1}
                onTouchEnd={
                  disabled
                    ? undefined
                    : () => onHandleCheck(item, index + 1)
                }
              >
                <Checkbox
                  key={index + 1}
                  style={{
                    borderRadius: 10,

                  }}
                  value={isSelected}
                  disabled={disabled}
                  color={
                    isSelected
                      ? COLORS.powderBlue
                      : undefined
                  }
                />

                <Text style={styles.checkboxText}>
                  {item.name}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  },


  DisplayFieldTextInput: (
    handle: boolean,
    title: string | undefined,
    value: string,
    allowInputCheck: boolean,
    onChangeText: (text: string) => void,
    disabled?: boolean,
    limit?: number,
    placeholder?: string,
    withAsterisk?: boolean,
    leftSection?: React.ReactNode,
  ) => {
    const styles = STYLES.NewRequest;

    return (
      <View style={styles.wrapper}>
        <RequestField
          title={title ? title : ''}
          inputValue={value}
          isInputCheck={allowInputCheck ? handle : undefined}
          withAsterisk={withAsterisk}
        />

        <View
          style={[
            { flexDirection: 'row', alignItems: 'center' },
            disabled === false ? styles.disabledInput : styles.border,
          ]}
        >
          {leftSection && <View style={{ paddingLeft: 10, justifyContent: 'center' }}>{leftSection}</View>}

          <TextInput
            style={[styles.textInput, { flex: 1 }]}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder={placeholder || STRINGS.details}
            multiline
            autoCorrect={false}
            placeholderTextColor={COLORS.lighterGray}
            editable={disabled}
            maxLength={limit}
          />
        </View>
      </View>
    );
  },

  DisplayFieldAttachment: (
    handle: boolean,
    title: string,
    value: string,
    allowInputCheck: boolean,
    onCameraPress: () => void,
    onFilePress: () => void,
    getCurrParams: () => void,
    withAsterisk?: boolean,
  ) => {
    const styles = STYLES.NewRequest;
    const navigation: TypeNavStack['navigation'] = useNavigation();
    return (
      <View style={styles.wrapper}>
        <RequestField
          title={title}
          inputValue={value}
          isInputCheck={allowInputCheck ? handle : undefined}
          withAsterisk={withAsterisk}
        />

        <View style={[styles.rowView, styles.border]}>
          {!value ? (
            <Text style={styles.placeholder}>{STRINGS.cameraUpload}</Text>
          ) : (
            <View style={[styles.rowView, { paddingHorizontal: 0 }]}>
              <FontAwesome6 name="file-circle-check" size={20} color={COLORS.green} />
              <Text style={styles.fileSuccess}>{STRINGS.fileAttached}</Text>
            </View>
          )}

          <View style={[styles.rowView, { paddingHorizontal: 0 }]}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  await ImagePicker.requestCameraPermissionsAsync();
                  let result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    aspect: [1, 1],
                    quality: 0.5,
                  });

                  if (!result.canceled) {
                    const currParams = getCurrParams() as any;
                    // const fileName = result.assets[0].fileName;
                    // const extension = (fileName as any).split('.').pop();

                    const asset = result.assets[0];
                    let extension = 'jpg';
                    if (asset.fileName) {
                      extension = (asset.fileName as any).split('.').pop();
                    } else {
                      const match = asset.uri.match(/\.(\w+)$/);
                      if (match) extension = match[1];
                    }

                    const resized = await ImageManipulator.manipulateAsync(result.assets[0].uri, [], {
                      compress: 0.2,
                    });

                    const timestamp = new Date().getTime();
                    const convertedUri = `${FileSystem.documentDirectory}Mobile_${timestamp}.${extension}`;
                    await FileSystem.copyAsync({ from: resized.uri, to: convertedUri });
                    Utils.panelNavigateCamera(currParams.onPanel, navigation, currParams, convertedUri, extension);
                  }
                } catch (error) {
                  console.error(error);
                  alert('Camera access is required. Please enable it in your device settings.');
                }
              }}
            >
              <Ionicons name="camera" size={26} color={COLORS.lighterGray} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onFilePress()}>
              <FontAwesome5 name="file-upload" size={18} color={COLORS.lighterGray} style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          </View>
        </View>

        <FileAttachedNote />
      </View>
    );
  },

  DisplayButtonField: (
    allowInputCheck: boolean,
    handle: boolean,
    title: string,
    value: string,
    valueExact: string | undefined,
    placeholder: string,
    onPress: () => void,
    disabled?: boolean,
    withAsterisk?: boolean,
  ) => {
    const styles = STYLES.NewRequest;

    return (
      <View style={styles.wrapper}>
        <RequestField
          title={title}
          inputValue={allowInputCheck ? (value as string) : undefined}
          isInputCheck={allowInputCheck ? handle : undefined}
          withAsterisk={withAsterisk}
        />

        <TouchableOpacity
          style={[styles.rowView, disabled ? styles.disabledInput : styles.border]}
          onPress={() => onPress()}
          disabled={disabled}
        >
          <StyledText style={styles.selectButtonText} textStyles={STYLES.StyledText}>
            {valueExact || placeholder}
          </StyledText>
        </TouchableOpacity>
      </View>
    );
  },

  DisplayDateTimePicker: (
    visible: boolean,
    mode: React.ComponentProps<typeof DateTimePicker>['mode'],
    onConfirm: (date: string) => void,
    onCancel: () => void,
    date?: Date,
    minimumDate?: Date,
  ) => {
    return (
      <DateTimePicker
        isVisible={visible}
        mode={mode}
        textColor="black"
        accentColor={COLORS.powderBlue}
        date={date ?? new Date()}
        minimumDate={minimumDate}
        onConfirm={(pickedDate) => {
          if (!pickedDate) {
            onCancel();
            return;
          }
          onConfirm((pickedDate as Date).toISOString());
        }}
        onCancel={onCancel}
      />
    );
  },

  DisplayDataImage: (
    // ML Request New or Update Record
    attachmentFormat: string,
    attachmentUri: string | undefined,
  ) => {
    const styles = STYLES.ComponentRequestSummary;
    return (
      <View style={styles.attachmentView}>
        {attachmentUri ? (
          ARRAY.imageFormat.includes(attachmentFormat) ? (
            <React.Fragment>
              <Image
                source={{ uri: attachmentUri }}
                style={{ flex: 1, aspectRatio: 1.1, height: null }}
                contentFit="contain"
              />
              <View style={styles.imageAttachView}>
                <Entypo name="image" size={24} />
                <Text style={styles.summaryText}>{STRINGS.imageFileAttached}</Text>
              </View>
            </React.Fragment>
          ) : (
            <View style={styles.fileAttachView}>
              <Entypo name="attachment" size={24} />
              <Text style={styles.fileAttachText}>{STRINGS.fileAttached}</Text>
            </View>
          )
        ) : (
          <Text style={styles.summaryText}>{STRINGS.noFileAttached}</Text>
        )}
      </View>
    );
  },
};
