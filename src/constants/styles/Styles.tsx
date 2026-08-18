// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { Dimensions, StyleSheet, Platform, ViewStyle, TextStyle } from 'react-native';

import { COLORS } from '../Colors';
import { TypeSchemaNotification } from 'src/types/Types';

const paddingIOS = Platform.OS === 'ios';

var { width, height } = Dimensions.get('window');

export const STYLES = {
  Login: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
      flex: 1,
      position: 'relative',
    },

    logo: {
      width: 230,
      height: 115,
      marginBottom: 10,
    },

    logoIcon: {
      height: 80,
      width: 75,
    },

    inputContainer: {
      margin: 10,
      padding: 20,
      flex: 1,
      marginTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor: COLORS.clearWhite,
      borderRadius: 30,
      marginBottom: 15,

      elevation: 5,
      shadowColor: COLORS.darkGray,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },

    textInput: {
      width: '100%',
      fontFamily: 'Inter_400Regular',
      paddingVertical: paddingIOS ? 10 : 5,
      color: COLORS.darkGray,
    },

    loginBtn: {
      backgroundColor: COLORS.orange,
      alignItems: 'center',
      alignSelf: 'center',
      width: 160,
      padding: 15,
      borderRadius: 50,
      marginTop: 70,

      elevation: 5,
      shadowColor: COLORS.darkGray,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },

    loginText: {
      color: COLORS.clearWhite,
      fontSize: 15,
      textTransform: 'uppercase',
      fontFamily: 'Inter_800ExtraBold',
    },

    forgotBtn: {
      alignSelf: 'center',
    },

    forgotText: {
      fontFamily: 'Inter_400Regular',
    },

    textFooter: {
      textAlign: 'center',
      color: COLORS.darkGray,
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      marginTop: 30,
      marginBottom: paddingIOS ? 30 : 10,
    },
  }),

  Home: (insets: { top: number }, platform: string) =>
    StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: COLORS.powderBlue,
      },

      topView: {
        paddingTop: 15,
        height: 225,
        backgroundColor: COLORS.powderBlue,
      },

      headerView: {
        marginTop: platform === 'ios' ? 0 : 8,
        paddingHorizontal: 20,
      },

      headerNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginBottom: 5,
      },

      welcomeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginHorizontal: 10,
      },

      iconWrapper: {
        width: 83,
        height: 83,
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.orange,
        borderRadius: 40,
        marginRight: 15,
        overflow: 'hidden',
      },

      hello: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -0.5,
        color: COLORS.clearWhite,
        fontSize: 21,

        textShadowColor: COLORS.darkGray,
        textShadowOffset: { width: 1.5, height: 2 },
        textShadowRadius: 10,
      },

      nameText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -0.5,
        color: COLORS.clearWhite,
        fontSize: 22,
        lineHeight: 26,

        textShadowColor: COLORS.darkGray,
        textShadowOffset: { width: 1.5, height: 2 },
        textShadowRadius: 10,
        textTransform: 'capitalize',
      },

      statusView: {
        flexDirection: 'row',
        marginTop: 2,
        alignItems: 'center',
      },

      statusText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 10,
        fontSize: 13,
      },

      timeClockText: {
        color: COLORS.clearWhite,
        fontSize: 16,
        paddingHorizontal: 5,
        marginTop: platform == 'ios' ? 15 : 10,
        fontFamily: 'Inter_700Bold',
      },

      timeClockView: {
        backgroundColor: COLORS.clearWhite,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 70,
        borderTopEndRadius: 70,
        width: '100%',
      },

      menuView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.clearWhite,
      },

      sectionView: {
        width: Dimensions.get('window').width,
      },

      mainTitle: {
        marginHorizontal: 35,
        fontSize: 18,
        marginVertical: 6,
        color: COLORS.darkGray,
        fontFamily: 'Inter_600SemiBold',
      },

      scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
      },
    }),

  Calendar: StyleSheet.create({
    container: {
      opacity: 1,
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    calendarView: {
      paddingTop: 10,
      height: 'auto',
      marginBottom: 30,
    },
  }),

  Profile: StyleSheet.create({
    container: {
      backgroundColor: COLORS.clearWhite,
      flex: 1,
    },

    buttonScroll: {
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      paddingVertical: 13,
      borderColor: COLORS.orange,
      borderBottomWidth: 3,
    },

    button: {
      paddingVertical: 6.5,
      width: 170,
      alignItems: 'center',
      borderRadius: 20,
    },

    textButton: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16.5,
      color: COLORS.lighterGray,
    },

    active: {
      backgroundColor: COLORS.orange,
      shadowOffset: { width: 10, height: 10 },
      shadowColor: COLORS.darkGray,
      shadowRadius: 20,
    },

    textActive: {
      fontFamily: 'Inter_700Bold',
      color: COLORS.clearWhite,
    },
  }),

  Drawer: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    backButton: {
      paddingHorizontal: 20,
    },

    topHeader: {
      padding: 1,
      paddingBottom: 10,
      paddingVertical: 50,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: COLORS.powderBlue,
    },

    textHeader: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      flex: 1,
      textAlign: 'center',
      marginLeft: 72,
    },

    button: {
      backgroundColor: COLORS.clearWhite,
      marginHorizontal: 20,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 15,

      elevation: 3,
      paddingHorizontal: 20,
      paddingVertical: 17,
      shadowColor: COLORS.darkGray,
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowOffset: { width: 1, height: 2 },
    },

    textButton: {
      marginLeft: 20,
      fontSize: 16,
      fontFamily: 'Inter_500Medium',
    },

    logOutButton: {
      marginVertical: 60,
      backgroundColor: 'red',
      padding: 15,
      width: 160,
      alignSelf: 'center',
      borderRadius: 23,

      elevation: 5,
      shadowColor: COLORS.darkGray,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },

    logOutText: {
      textTransform: 'uppercase',
      fontFamily: 'Inter_700Bold',
      color: COLORS.clearWhite,
      textAlign: 'center',
    },
  }),

  Request: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: COLORS.shadowGray,
      borderBottomWidth: 2,
    },

    button: {
      width: 'auto',
      // height: 35,
      paddingVertical: 5,
      paddingHorizontal: 20,
      marginRight: 20,
      borderRadius: 15,
      marginVertical: 13,
      marginLeft: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonText: {
      color: COLORS.lighterGray,
      fontSize: 17,
      fontFamily: 'Inter_600SemiBold',
    },

    selectedButton: {
      backgroundColor: COLORS.orange,
    },

    selectedTextButton: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',
    },

    buttonList: {
      backgroundColor: COLORS.clearWhite,
      borderColor: COLORS.orange,
      borderBottomWidth: 3,
      paddingLeft: 10,
    },
    approvalCountButton: {
      backgroundColor: COLORS.clearWhite,
      color: COLORS.orange,
      marginRight: 5,
      fontSize: 16,
      fontFamily: 'Inter_700Bold',
      paddingHorizontal: 9,
      borderRadius: 10,
      overflow: 'hidden',
    },
    tabItem: { alignItems: 'center', flexDirection: 'row' },
  }),

  Notification: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    listView: { padding: 20 },

    shadowView: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
      backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
      flex: 1,
      margin: 15,
      borderRadius: 20,
      backgroundColor: COLORS.clearWhite,
    },
  }),

  MorePayslipSemiText: (bold?: boolean, width?: boolean): TextStyle => ({
    fontFamily: bold ? 'Inter_700Bold' : 'Inter_600SemiBold',
    width: width ? '45%' : undefined,
    marginRight: 20,
  }),

  MorePayslipRegularText: (bold?: boolean, width?: boolean): TextStyle => ({
    fontFamily: bold ? 'Inter_700Bold' : 'Inter_400Regular',
    width: width ? '100%' : undefined,
  }),

  MorePayslip: StyleSheet.create({
    mainWrapper: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    container: {
      backgroundColor: COLORS.clearWhite,
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },

    shadowView: {
      backgroundColor: COLORS.clearWhite,
      width: '100%',
      paddingVertical: 35,
      paddingHorizontal: 35,
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 17,
      textAlign: 'center',
      alignSelf: 'center',
      marginBottom: 10,
      width: '100%',
    },

    textView: {
      justifyContent: 'flex-start',
      alignItems: 'baseline',
      marginVertical: 10,
    },

    rowText: {
      flexDirection: 'row',
      textAlign: 'left',
    },

    regularDayView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      marginVertical: 3,
    },

    tkDateText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
      marginBottom: 10,
    },

    shadowViewButton: {
      width: '100%',
      paddingVertical: 17,
      borderRadius: 0,
    },

    downloadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
      marginHorizontal: 20,
    },

    downloadText: {
      fontFamily: 'Inter_600SemiBold',
      color: COLORS.orange,
    },
  }),

  Pending: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    btnHorizontal: {
      flexDirection: 'row',
      borderBottomColor: COLORS.lighterOrange,
      borderBottomWidth: 2,
    },

    button: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 15,
      padding: 5,
      borderRadius: 20,
      alignItems: 'center',
    },

    counterText: {
      backgroundColor: COLORS.clearWhite,
      color: COLORS.orange,
      marginRight: 10,
      fontSize: 18,
      fontFamily: 'Inter_700Bold',
      paddingHorizontal: 9,
      borderRadius: 10,
      overflow: 'hidden',
      display: 'none',
    },

    buttonText: {
      color: COLORS.lighterGray,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 17,
    },

    selectedButton: {
      backgroundColor: COLORS.orange,
      elevation: 3,
      shadowColor: COLORS.darkGray,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },

    selectedTextButton: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',
    },

    selectedCounter: {
      display: 'flex',
    },

    searchView: {
      marginHorizontal: 20,
    },
  }),

  TimeOff: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
      opacity: 1,
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20,
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 22,
    },

    yearText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
    },

    yearValue: {
      color: COLORS.orange,
    },

    creditContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },

    creditShadow: {
      borderRadius: 15,
      backgroundColor: COLORS.clearWhite,
    },

    creditsValue: {
      paddingHorizontal: 40,
      paddingVertical: 30,
      textAlignVertical: 'center',
      textAlign: 'center',
      fontSize: 25,
      color: COLORS.orange,
      fontFamily: 'Inter_600SemiBold',
    },

    detailsTitle: {
      fontSize: 15,
      marginHorizontal: 20,
      marginTop: 20,
      fontFamily: 'Inter_600SemiBold',
    },
  }),

  LoanLedger: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
      opacity: 1,
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    innerWrapper: {
      marginHorizontal: 20,
    },

    listView: { marginTop: 15 },

    loanLedgerList: {
      marginTop: 20,
    },
  }),

  LoanDetails: (status: string | undefined) =>
    StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
      },

      viewContainer: {
        marginHorizontal: 30,
        marginVertical: 20,
      },

      container: {
        opacity: 1,
        flex: 1,
        backgroundColor: COLORS.clearWhite,
      },

      backButton: {
        paddingHorizontal: 10,
      },

      textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
      },

      topContent: {
        backgroundColor:
          status == 'Filed'
            ? COLORS.lightPurple
            : status == 'Reviewed'
              ? COLORS.purple
              : status == 'Approved'
                ? COLORS.green
                : status == 'Cancelled'
                  ? COLORS.red
                  : COLORS.darkGray,

        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
      },

      topText: {
        color: COLORS.clearWhite,
        fontSize: 15,
        fontFamily: 'Inter_500Medium',
      },

      content: {
        padding: 20,
        width: '100%',
        borderRadius: 20,
        backgroundColor: COLORS.clearWhite,
      },

      rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      titleText: {
        fontFamily: 'Inter_600SemiBold',
        marginRight: 10,
      },

      valueText: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.black,
      },

      statusWrapper: {
        width: '80%',
      },

      detailsTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        marginHorizontal: 30,
      },

      detailView: {
        borderRadius: 20,
        margin: 10,
      },

      shadowView: {
        backgroundColor: COLORS.clearWhite,
        width: '100%',
        borderRadius: 20,
      },

      topDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lighterGray,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },

      bodyDetail: {
        paddingVertical: 5,
        paddingHorizontal: 20,
      },

      topLeftDetail: { alignItems: 'center' },

      boldText: { fontFamily: 'Inter_600SemiBold' },

      bodyText: { fontFamily: 'Inter_500Medium' },
    }),

  Timesheet: StyleSheet.create({
    container: {
      flex: 1,
    },

    agendaCalendar: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    textHeader: {
      fontFamily: 'Inter_600SemiBold',
      padding: 15,
      fontSize: 18,
    },
  }),

  ClockInOut: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },
    map: {
      flex: 1,
      width: width,
      height: height,
    },

    disabledBtn: {
      backgroundColor: 'gray',
      opacity: 0.3,
    },

    bottomContainer: {
      width: '100%',
      backgroundColor: COLORS.clearWhite,
      padding: 30,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },

    dateTimeWrapper: {
      alignItems: 'center',
    },

    dateText: {
      fontSize: 12,
      fontFamily: 'Inter_500Medium',
    },

    timeText: {
      fontSize: 25,
      fontFamily: 'Inter_700Bold',
    },

    textClockIn: {
      color: COLORS.clearWhite,
      fontSize: 17,
      fontFamily: 'Inter_600SemiBold',
      marginLeft: 7,
    },

    refreshBtn: {
      position: 'absolute',
      right: '10%',
      top: '10%',
    },
  }),

  Approvals: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: COLORS.shadowGray,
      borderBottomWidth: 2,
    },

    button: {
      width: 'auto',
      height: 35,
      paddingHorizontal: 20,
      marginRight: 20,
      borderRadius: 15,
      marginVertical: 13,
      marginLeft: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonText: {
      color: COLORS.lightestGray,
      fontSize: 17,
      fontFamily: 'Inter_600SemiBold',
    },

    selectedButton: {
      backgroundColor: COLORS.baseOrange,
    },

    selectedTextButton: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',
    },

    buttonList: {
      backgroundColor: COLORS.clearWhite,
      borderColor: COLORS.orange,
      borderBottomWidth: 3,
      paddingLeft: 10,
    },
  }),

  RequestDetails: (status: string) =>
    StyleSheet.create({
      mainContainer: {
        flex: 1,
      },

      topContent: {
        backgroundColor:
          status == 'Filed'
            ? COLORS.lightPurple
            : status == 'Reviewed'
              ? COLORS.purple
              : status == 'Approved'
                ? COLORS.green
                : status == 'Cancelled'
                  ? COLORS.red
                  : COLORS.lighterGray,

        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
      },

      topDate: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
      },

      container: {
        marginHorizontal: 20,
        marginVertical: 10,
      },

      content: {
        padding: 20,
        borderRadius: 20,
        width: '100%',
        backgroundColor: COLORS.clearWhite,
      },

      rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
      },

      rowWrapper2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
        justifyContent: 'space-between',
      },

      titleText: {
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
        marginRight: 5,
      },

      valueText: {
        fontSize: 15,
        flex: 1,
        flexWrap: 'wrap',
        fontFamily: 'Inter_400Regular',
        color: COLORS.black,
        textAlign: 'right',
      },

      attachText: {
        color: COLORS.powderBlue,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'right',
      },

      rowView: {
        gap: 20,
        padding: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
      },

      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 10,
        backgroundColor: COLORS.orange,
        borderRadius: 20,
        minWidth: 155,
        // paddingHorizontal: 30,
        padding: 10,
      },

      approveButton: { backgroundColor: COLORS.green },

      textButton: {
        textTransform: 'uppercase',
        fontSize: 16,
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
      },
    }),

  AttachedFile: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
      marginHorizontal: 5,
    },

    wrapper: { marginTop: 20 },
    textView: { flexDirection: 'row' },
    rowView: {
      marginTop: 20,
      marginHorizontal: 30,
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 15,
    },

    regularText: {
      flex: 1,
      flexWrap: 'wrap',
      fontFamily: 'Inter_400Regular',
      fontSize: 15,
    },

    imageView: { flexDirection: 'row' },

    image: {
      flex: 1,
      aspectRatio: 1,
      marginTop: 20,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },

    button: {
      backgroundColor: COLORS.lightOrange,
      alignItems: 'center',
      padding: 10,
      marginVertical: 15,
      marginHorizontal: 30,
      borderRadius: 10,
    },

    buttonText: {
      fontFamily: 'Inter_600SemiBold',
      color: COLORS.clearWhite,
    },
  }),

  AboutUs: StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    container: {
      flex: 1,
      marginVertical: 20,
      marginHorizontal: 20,
      backgroundColor: COLORS.clearWhite,
    },

    shadowView: {
      width: '100%',
      height: '100%',
      padding: 20,
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 23,
    },

    verticalSemiBoldText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 17,
      marginVertical: 15,
    },

    regularText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 15,
    },

    boldText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 15,
    },

    indentText: {
      marginLeft: 30,
    },
  }),

  // Components Styles
  ComponentTimeClock: StyleSheet.create({
    container: {
      backgroundColor: COLORS.clearWhite,
      paddingVertical: 20,
      width: '90%',
      marginTop: -40,
      marginBottom: 5,
      borderRadius: 20,
      borderColor: COLORS.orange,
      borderWidth: 1.5,
    },

    linkButton: {
      alignSelf: 'center',
      marginTop: 10,
    },

    clockInButton: {
      //backgroundColor: COLORS.orange,
      backgroundColor: 'gray', // temporary
      opacity: 0.5, // temporary
      width: 170,
      borderRadius: 15,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'center',
    },

    clockOutButton: {
      backgroundColor: COLORS.powderBlue,
      width: 170,
      borderRadius: 15,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'center',
    },

    timeInOutText: {
      fontSize: 18,
      marginLeft: 5,
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
    },

    timeText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 25,
      textAlign: 'center',
      color: COLORS.black,
    },

    dateText: {
      fontFamily: 'Inter_600SemiBold',
      color: COLORS.black,
      textAlign: 'center',
      fontSize: 13,
    },

    clockInOutText: {
      fontFamily: 'Inter_500Medium',
      color: COLORS.darkGray,
      fontSize: 13,
      textAlign: 'center',
    },
  }),

  ComponentMenuButton: StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15,
    },

    buttonWrapper: {
      flexDirection: 'row',
    },

    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },

    gridButton: {
      width: 92,
      height: 92,
      borderRadius: 10,
      backgroundColor: COLORS.clearGray,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textButton: {
      fontFamily: 'Inter_500Medium',
      color: COLORS.black,
      paddingTop: 5.5,
      fontSize: 12,
      textAlign: 'center',
      flexWrap: 'wrap',
    },

    partitionWrapper: {
      marginHorizontal: 4,
      marginVertical: 10,
    },

    textPartition: {
      fontFamily: 'DMSans_500Medium',
      color: COLORS.darkGray,
    },

    iconRow: {
      color: COLORS.clearWhite,
    },

    rowButton: {
      flex: 1,
      backgroundColor: COLORS.orange,
      padding: 25.5,
      borderRadius: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 10,
    },

    buttonTextWrapper: {
      paddingLeft: 10,
      paddingTop: 5.5,
    },

    badge: {
      backgroundColor: COLORS.orange,
      width: 35,
      height: 35,
      justifyContent: 'center',
      paddingVertical: 3,
      borderRadius: 90,
      position: 'absolute',
      right: -14,
      top: -5,
      borderColor: COLORS.lightGray,
      borderWidth: 3,
    },

    badgeText: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',
      textAlign: 'center',
      fontSize: 12,
    },
  }),

  ComponentTimeOff: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginBottom: 10,
    },

    button: {
      flex: 1,
      marginHorizontal: 8,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: COLORS.lightestOrange,
      paddingVertical: 8,
      borderRadius: 10,
    },

    textWrapper: {
      color: COLORS.black,
      fontFamily: 'Inter_600SemiBold',
    },

    alignWrapper: {
      borderRadius: 15,
      backgroundColor: COLORS.clearWhite,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      width: 150,
      flexDirection: 'row',
    },

    totalText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 22,
      textAlign: 'center',
      color: COLORS.darkGray,
    },

    title: {
      color: COLORS.darkGray,
      fontSize: 12,
      lineHeight: 14,
      textAlign: 'center',
      fontFamily: 'Inter_500Medium',
    },
  }),

  ComponentLoaderPage: StyleSheet.create({
    loading: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
    },
  }),

  ComponentTabHeader: StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: COLORS.powderBlue,
    },

    text: {
      padding: 12,
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
    },
  }),

  ComponentPageHeader: StyleSheet.create({
    backButton: {
      paddingHorizontal: 17,
      paddingVertical: 3,
      marginTop: 5,
    },

    topHeader: {
      paddingBottom: 10,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: COLORS.powderBlue,
    },

    textHeader: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      flex: 1,
      textAlign: 'center',
      marginRight: 60,
    },
  }),

  ComponentMessages: StyleSheet.create({
    container: {
      margin: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      fontFamily: 'Inter_500Medium',
      marginTop: 10,
      color: COLORS.lighterGray,
    },
  }),

  ComponentCalendarItem: StyleSheet.create({
    container: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: '100%',
      height: '80%',
      backgroundColor: COLORS.clearWhite,
    },

    topView: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    dayStatus: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
    },

    selectedDayText: {
      fontSize: 12,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },

    selectedEvent: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      paddingTop: 5,
      backgroundColor: COLORS.clearWhite,
    },

    topCircle: {
      position: 'absolute',
      zIndex: 99,
    },

    dayBelowEvent: {
      fontSize: 13,
      fontFamily: 'Inter_400Regular',
    },

    dayEventText: {
      textAlign: 'center',
      paddingLeft: 10,
      fontSize: 16,
      fontFamily: 'Inter_500Medium',
    },

    subDayContentTitle: {
      backgroundColor: COLORS.gray,
      fontFamily: 'Inter_600SemiBold',
      color: COLORS.clearWhite,
      paddingVertical: 2,
      width: 130,
      borderRadius: 5,
      overflow: 'hidden',
      textAlign: 'center',
    },

    subDayContentView: {
      justifyContent: 'center',
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },

    subDayContentText: {
      textAlign: 'center',
      width: '60%',
      paddingLeft: 10,
      fontSize: 15,
      fontFamily: 'Inter_400Regular',
    },

    dayContentWrapper: {
      paddingBottom: 10,
      borderBottomColor: COLORS.lightestGray,
      borderBottomWidth: 1.5,
    },

    dayContentText: {
      fontSize: 14,
      marginVertical: 20,
      textAlign: 'center',
      fontFamily: 'Inter_500Medium',
    },

    dayBelowWrapper: {
      paddingHorizontal: 10,
      padding: 5,
    },

    rowWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    boldText: {
      color: COLORS.darkGray,
      fontWeight: '700',
      fontStyle: 'italic',
    },

    dateBelowText: {
      marginTop: 5,
      fontFamily: 'Inter_400Regular',
      color: COLORS.black,
      fontSize: 12,
    },

    noEventsText: {
      fontSize: 13,
      textAlign: 'center',
      color: COLORS.darkGray,
      marginTop: 30,
      fontFamily: 'Inter_400Regular',
    },

    selectedDayEvent: {
      flexDirection: 'row',
      backgroundColor: COLORS.clearWhite,
      width: 160,
      marginBottom: 10,
      paddingLeft: 2,
    },

    selectedDayView: {
      borderRadius: 20,
      height: 37,
      width: '100%',
      backgroundColor: COLORS.clearWhite,
      justifyContent: 'center',
    },

    dayBelowEventWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
      height: 25,
      paddingLeft: 40,
      borderRadius: 50,
      borderWidth: 1,
      backgroundColor: COLORS.clearWhite,
    },
  }),

  ComponentApprovalsItem: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 7,
      paddingLeft: 16,
      paddingVertical: 10,
    },

    rowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '99%',
    },

    itemView: {
      paddingVertical: 5,
    },

    rowSpaceView: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
    },

    boldTextName: {
      fontFamily: 'Inter_600SemiBold',
      width: '50%',
    },

    regularText: {
      flexWrap: 'wrap',
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
    },

    valueText: {
      width: '45%',
      flexWrap: 'wrap',
      fontFamily: 'Inter_400Regular',
    },

    moreButton: {
      position: 'static',
      right: 10,
    },
  }),

  ComponentPendingsItem: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 7,
      paddingLeft: 16,
      paddingVertical: 10,
    },

    rowView: {
      flexDirection: 'row',
    },

    itemView: {
      paddingVertical: 5,
    },

    rowSpaceView: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
    },

    regularText: {
      flexWrap: 'wrap',
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
    },

    valueText: {
      width: 170,
      flexWrap: 'wrap',
      fontSize: 14.5,
      fontFamily: 'Inter_400Regular',
    },

    moreButton: {
      position: 'static',
      right: 10,
    },
  }),

  ComponentTimesheetItem: StyleSheet.create({
    clockInOutText: {
      color: COLORS.darkGray,
      marginHorizontal: 20,
      marginVertical: 13,
      fontFamily: 'Inter_600SemiBold',
    },

    itemContainer: {
      marginHorizontal: 23,
    },

    shadowView: {
      width: '100%',
      backgroundColor: COLORS.clearWhite,
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      padding: 20,
    },

    itemText: {
      fontFamily: 'Inter_700Bold',
      paddingBottom: 5,
      fontSize: 19,
    },

    regularText: {
      fontFamily: 'Inter_400Regular',
      paddingBottom: 6,
      textTransform: 'capitalize',
      fontSize: 13,
    },
  }),

  ComponentLoanLedgerItem: (item: { DocStatus: string }) =>
    StyleSheet.create({
      itemContainer: {
        backgroundColor: COLORS.clearWhite,
        marginBottom: 25,
        borderRadius: 40,
      },

      itemWrapper: {
        width: '100%',
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
      },

      dateRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor:
          item.DocStatus == 'Approved'
            ? COLORS.green
            : item.DocStatus == 'Reviewed'
              ? COLORS.purple
              : item.DocStatus == 'Filed'
                ? COLORS.lightPurple
                : item.DocStatus == 'Cancelled'
                  ? COLORS.red
                  : COLORS.darkGray,
        paddingHorizontal: 20,
      },

      rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      currDateText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
      },

      statusText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
      },

      bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
      },

      reasonWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      boldText: {
        fontFamily: 'Inter_600SemiBold',
      },

      valueText: {
        fontFamily: 'Inter_400Regular',
      },

      moreText: {
        fontSize: 13,
        paddingBottom: 2,
      },

      moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    }),

  ComponentRecentPayItem: StyleSheet.create({
    topView: {
      backgroundColor: COLORS.clearWhite,
      borderRadius: 20,
    },

    shadowView: {
      backgroundColor: COLORS.clearWhite,
      width: '100%',
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 20,
      paddingTop: 15,
      borderRadius: 20,
    },

    row: {
      flexDirection: 'row',
    },

    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    recentPayText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
    },

    netpayView: {
      flexDirection: 'row',
      marginLeft: 20,
    },

    netpayText: {
      fontFamily: 'Inter_600SemiBold',
      marginRight: 62,
    },

    netpayValue: {
      fontFamily: 'Inter_600SemiBold',
    },

    grosspayView: {
      flexDirection: 'row',
      marginLeft: 35,
    },

    grosspayText: {
      marginRight: 75,
      fontStyle: 'italic',
      fontSize: 14,
    },

    amountText: {
      fontStyle: 'italic',
    },

    deductionsText: {
      marginRight: 75,
      fontStyle: 'italic',
      fontSize: 14,
    },

    deductionsView: {
      flexDirection: 'row',
      marginLeft: 36,
    },

    moreText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      paddingTop: 1,
    },

    topMoreButton: {
      alignItems: 'baseline',
      alignSelf: 'baseline',
      position: 'absolute',
      bottom: -3,
      right: 0,
    },
  }),

  ComponentPayHistoryItem: StyleSheet.create({
    container: {
      marginTop: 3,
      marginBottom: 10,
      marginHorizontal: 4,
      backgroundColor: COLORS.clearWhite,
      shadowColor: COLORS.black,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 5,
      opacity: 0.5,
    },

    shadowView: {
      width: '100%',
    },

    amountText: {
      fontStyle: 'italic',
      fontSize: 14,
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 12.5,
      color: COLORS.black,
    },

    regularText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12.5,
    },

    shadowItem: {
      width: '100%',
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 20,
      backgroundColor: COLORS.clearWhite,
    },

    moreButtonText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 11,
      paddingTop: 1,
    },

    row: {
      flexDirection: 'row',
    },
  }),

  ComponentPendingItem: (index: number, lastIndex: number) =>
    StyleSheet.create({
      itemContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',

        borderTopLeftRadius: index == 0 ? 20 : 0,
        borderTopRightRadius: index == 0 ? 20 : 0,
        borderBottomLeftRadius: lastIndex == index ? 20 : 0,
        borderBottomRightRadius: lastIndex == index ? 20 : 0,

        paddingTop: index == 0 ? 5 : 0,
        paddingBottom: lastIndex == index ? 5 : 0,

        borderBottomColor: COLORS.darkGray,
        borderBottomWidth: lastIndex != index ? 1.5 : 0,
      },

      itemWrapper: {
        width: '100%',
        padding: 7,

        backgroundColor: COLORS.clearWhite,
        borderTopLeftRadius: index == 0 ? 20 : 0,
        borderTopRightRadius: index == 0 ? 20 : 0,
        borderBottomLeftRadius: lastIndex == index ? 20 : 0,
        borderBottomRightRadius: lastIndex == index ? 20 : 0,
      },

      dateRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
      },

      rowWrapper: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
      },

      currDateText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
      },

      statusText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: COLORS.black,
      },

      bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
      },

      reasonWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      boldText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: COLORS.darkGray,
      },

      valueText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: COLORS.darkGray,
      },
    }),

  ComponentRequestItem: (val: string | undefined) =>
    StyleSheet.create({
      itemContainer: {
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 20,
        marginBottom: 25,
        borderRadius: 20,
      },

      itemWrapper: {
        width: '100%',
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
      },

      dateRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor:
          val == 'Approved'
            ? COLORS.green
            : val == 'Reviewed'
              ? COLORS.purple
              : val == 'Filed'
                ? COLORS.lightPurple
                : val == 'Cancelled'
                  ? COLORS.red
                  : COLORS.lighterGray,
        paddingHorizontal: 20,
      },

      rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      titleText: {
        // fontSize: 14.5,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
      },

      bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
      },

      reasonWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      boldText: {
        // fontSize: 14.5,
        fontFamily: 'Inter_600SemiBold',
      },

      valueText: {
        textAlign: 'right',
        width: '50%',
        // fontSize: 14.5,
        fontFamily: 'Inter_400Regular',
      },

      moreText: {
        fontSize: 13,
        paddingBottom: 2,
      },

      moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    }),

  ComponentNotificationItem: (item: TypeSchemaNotification) =>
    StyleSheet.create({
      contentTitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
      },

      contentDate: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray,
        fontSize: 12,
      },

      innerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        width: '100%',
      },

      contentWrapper: {
        width: 'auto',
        marginTop: 10,
        flexDirection: 'column',
      },

      topContentWrapper: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      bodyContentWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      description: {
        width: '75%',
        color: COLORS.darkGray,
        fontSize: 13,
      },

      dashLine: {
        paddingVertical: 15,
      },

      imgParent: {
        height: 30,
        width: '10%',
        marginHorizontal: 6,
      },

      img: {
        height: '100%',
        width: '100%',
      },
    }),

  ComponentTimeOffItem: StyleSheet.create({
    shadowView: {
      width: '100%',
      backgroundColor: COLORS.clearWhite,
      borderRadius: 20,
    },

    itemWrapper: {
      backgroundColor: COLORS.clearWhite,
      margin: 10,
      borderRadius: 20,
      marginHorizontal: 20,
    },

    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: COLORS.lighterGray,
      padding: 10,
      paddingHorizontal: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },

    itemHeaderText: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
    },

    itemBody: {
      padding: 15,
    },

    bodyText: {
      fontFamily: 'Inter_600SemiBold',
    },

    itemText: {
      fontFamily: 'Inter_400Regular',
    },
  }),

  ComponentSearchAndNew: (ios: boolean) =>
    StyleSheet.create({
      topContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      searchContainer: {
        flexDirection: 'row',
      },

      searchText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 15,
        marginStart: 10,
        paddingVertical: ios ? 5 : 0,
      },

      newRequestButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
      },

      newRequestText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 15,
        marginStart: 5,
        color: COLORS.darkGray,
      },
    }),

  ComponentApprovalsAction: StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 16,
    },

    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
    },

    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    disabled: {
      opacity: 0.3,
    },

    regularText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 17,
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
      marginLeft: 5,
      fontSize: 15,
    },

    checkBox: {
      marginTop: 2,
      borderColor: COLORS.orange,
      borderWidth: 2,
    },
  }),

  NewRequest: StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    container: {
      flex: 1,
      marginVertical: 15,
      marginHorizontal: 20,
    },

    wrapper: {
      marginTop: 10,
    },

    border: {
      borderColor: COLORS.darkGray,
      borderWidth: 1,
      borderRadius: 12,
    },

    title: {
      fontFamily: 'Inter_600SemiBold',
      marginHorizontal: 15,
      marginBottom: 7,
    },

    text: {
      fontSize: 15,
      fontFamily: 'Inter_400Regular',
      paddingVertical: 5,
    },

    grayText: {
      fontFamily: 'Inter_500Medium',
      color: COLORS.darkGray,
    },

    rowView: {
      paddingHorizontal: 15,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      height: 45,
    },

    disabledInput: {
      marginHorizontal: 1,
      borderRadius: 10,
      backgroundColor: COLORS.gray,
      padding: 12,
    },

    disabledInputText: {
      fontSize: 15,
      fontFamily: 'Inter_500Medium',
      color: COLORS.lighterGray,
    },

    placeholder: {
      fontSize: 15,
      color: COLORS.lighterGray,
    },

    itemPicker: {
      fontSize: 14,
    },

    textInput: {
      fontSize: 15,
      paddingLeft: 15,
      paddingTop: 15,
      paddingVertical: 15,
    },

    valueWrapper: {
      marginVertical: 15,
      marginHorizontal: 20,
    },

    valueCredit: {
      fontFamily: 'Inter_500Medium',
      backgroundColor: COLORS.gray,
      width: 100,
      paddingTop: 2,
      textAlign: 'center',

      borderRadius: 5,
      borderWidth: 2,
      borderColor: COLORS.lighterGray,
    },

    timeView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
    },

    button: {
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: COLORS.orange,
      width: 170,
      padding: 10,
      marginVertical: 20,
      borderRadius: 20,
    },

    textButton: {
      textTransform: 'uppercase',
      fontFamily: 'Inter_700Bold',
      fontSize: 16,
      color: COLORS.clearWhite,
      textAlign: 'center',
    },

    fileSuccess: {
      fontSize: 15,
      color: COLORS.green,
      marginLeft: 10,
      fontFamily: 'Inter_600SemiBold',
    },

    checkboxView: {
      flexDirection: 'row',
      paddingVertical: 10,
    },

    checkboxItem: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      paddingRight: 19,
    },

    checkboxText: {
      fontSize: 15,
      fontFamily: 'Inter_400Regular',
      paddingLeft: 10,
    },

    selectButton: {
      marginHorizontal: 1,
      borderBlockColor: COLORS.lighterGray,
      borderWidth: 1,
      borderRadius: 10,
      padding: 12,
    },

    selectButtonText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 15,
    },

    mediumText: {
      fontFamily: 'Inter_500Medium',
    },
  }),

  ComponentTitleInput: StyleSheet.create({
    container: {
      flexDirection: 'row',
    },

    title: {
      fontFamily: 'Inter_600SemiBold',
      marginLeft: 15,
      marginRight: 2,
      marginBottom: 5,
    },
  }),

  ComponentEndListNote: StyleSheet.create({
    container: {
      marginTop: 10,
      paddingBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    text: {
      textAlign: 'center',
      fontFamily: 'Inter_500Medium',
      marginLeft: 10,
      color: COLORS.lighterGray,
    },
  }),

  ComponentLostFileNote: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 80,
      marginHorizontal: 30,
    },

    text: {
      fontFamily: 'Inter_500Medium',
      textAlign: 'center',
      color: COLORS.lighterGray,
      marginTop: 20,
    },
  }),

  ComponentFileAttachedNote: StyleSheet.create({
    container: {
      flex: 1,
    },

    fileNote: {
      fontStyle: 'italic',
      fontSize: 13,
      marginHorizontal: 20,
      marginVertical: 10,
    },

    fileError: {
      fontSize: 13,
      paddingHorizontal: 20,
      paddingVertical: 5,
      color: COLORS.red,
      fontStyle: 'italic',
    },
  }),

  ComponentCamera: StyleSheet.create({
    container: {
      flex: 1,
    },

    topHeader: {
      padding: 20,
      paddingTop: 45,
      paddingBottom: 10,
      alignItems: 'center',
      backgroundColor: COLORS.powderBlue,
    },

    textHeader: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
    },

    camera: {
      flex: 1,
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: COLORS.black,
      width: '100%',
      position: 'absolute',
      bottom: 0,
      padding: 30,
    },

    button: {
      alignSelf: 'center',
      backgroundColor: 'transparent',
      verticalAlign: 'middle',
    },

    text: {
      fontSize: 16,
      color: COLORS.clearWhite,
      textTransform: 'uppercase',
      fontFamily: 'Inter_600SemiBold',
      padding: 6,
    },

    previewView: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    btnWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
    },

    doneBtn: {
      width: 170,
      margin: 10,
      backgroundColor: COLORS.green,
      alignItems: 'center',
      paddingHorizontal: 17,
      paddingVertical: 10,
      borderRadius: 50,
    },

    deleteBtn: {
      width: 170,
      margin: 10,
      borderColor: COLORS.red,
      borderWidth: 2,
      alignItems: 'center',
      paddingHorizontal: 17,
      paddingVertical: 10,
      borderRadius: 50,
    },

    textBtn: {
      width: 200,
      fontFamily: 'Inter_600SemiBold',
      textAlign: 'center',
      fontSize: 17,
    },
  }),

  ComponentRequestList: StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },
  }),

  ComponentRequestPanel: StyleSheet.create({
    container: {
      opacity: 1,
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    loader: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingBottom: 20,
      flexDirection: 'row',
    },

    loaderText: {
      marginLeft: 10,
      fontFamily: 'Inter_500Medium',
      color: COLORS.lighterGray,
    },

    checkBox: {
      marginTop: 20,
      marginLeft: 16,
    },
  }),

  ComponentRequestSearch: StyleSheet.create({
    modalView: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalWrapper: {
      backgroundColor: COLORS.clearWhite,
      paddingBottom: 20,
      paddingTop: 45,
      paddingHorizontal: 20,
      borderRadius: 15,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },

    dropdown: {
      borderColor: COLORS.lighterGray,
    },

    closeButton: {
      position: 'absolute',
      top: 10,
      right: 15,
    },

    button: {
      backgroundColor: COLORS.orange,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: '45%',
      zIndex: 1,
    },

    disabledButton: {
      backgroundColor: '#E4E0E1',
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: '45%',
    },

    buttonText: {
      textAlign: 'center',
      textTransform: 'uppercase',
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',
    },

    disabledButtonText: {
      textAlign: 'center',
      textTransform: 'uppercase',
      color: '#B7B7B7',
      fontFamily: 'Inter_700Bold',
    },

    borderButton: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: COLORS.orange,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: '45%',
      zIndex: 1,
    },

    borderButtonText: {
      textAlign: 'center',
      textTransform: 'uppercase',
      color: COLORS.orange,
      fontFamily: 'Inter_700Bold',
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      marginTop: 15,
    },
    rowBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginLeft: 20,
      width: '100%',
      marginTop: 15,
    },

    search: {
      fontFamily: 'Inter_400Regular',
      borderColor: COLORS.lighterGray,
      borderWidth: 1,
      width: '90%',
      borderRadius: 90,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },

    searchTwo: {
      fontFamily: 'Inter_400Regular',
      flexWrap: 'wrap',
      borderColor: COLORS.lighterGray,
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderRadius: 90,
      paddingVertical: 5,
      gap: 5,
      marginBottom: 10,
    },

    titleText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 13,
      paddingLeft: 5,
    },

    text: {
      fontFamily: 'Inter_400Regular',
    },

    dateWrapper: {
      marginTop: 10,
    },

    dateView: {
      borderColor: COLORS.lighterGray,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    placeholder: {
      fontFamily: 'Inter_400Regular',
      color: COLORS.lighterGray,
    },
  }),

  ComponentLoader: StyleSheet.create({
    modalView: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 99,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalWrapper: {
      backgroundColor: COLORS.clearWhite,
      padding: 30,
      borderRadius: 15,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 17,
      marginVertical: 10,
    },

    subTitleText: {
      fontSize: 13,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },

    button: {
      backgroundColor: COLORS.orange,
      padding: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: 120,
    },

    cancelButton: {
      backgroundColor: COLORS.clearWhite,
      borderWidth: 1,
      borderColor: COLORS.orange,
    },

    buttonText: {
      textAlign: 'center',
      color: COLORS.clearWhite,
      fontFamily: 'Inter_800ExtraBold',
    },

    cancelText: {
      color: COLORS.orange,
    },

    rowView: {
      flexDirection: 'row',
      marginTop: 10,
      gap: 10,
    },

    dateTitle: {
      fontFamily: 'Inter_600SemiBold',
      paddingHorizontal: 48,
    },

    timeTitle: { fontFamily: 'Inter_600SemiBold' },

    listTitle: {
      flexDirection: 'row',
      gap: 0,
      marginTop: 20,
      marginBottom: 10,
      justifyContent: 'space-between',
    },

    listTimeTitle: {
      flexDirection: 'row',
      gap: 22,
    },

    listView: {
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },

    itemView: {
      flexDirection: 'row',
      paddingVertical: 5,
    },

    itemText: {
      paddingHorizontal: 10,
    },
  }),

  // Confirmation Approval Prompt
  ComponentConfirmationApproval: StyleSheet.create({
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    textArea: {
      height: 150,
      borderWidth: 1,
      borderColor: '#ccc',
      width: '100%',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: '#fff',
    },

    textReason: {
      marginTop: 10,
    },
    required: {
      color: 'red',
    },

    modalWrapper: {
      backgroundColor: COLORS.clearWhite,
      padding: 30,
      borderRadius: 15,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },

    rowView: {
      flexDirection: 'row',
      gap: 10,
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      marginVertical: 10,
      fontSize: 19,
    },

    subTitleText: {
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },

    button: {
      backgroundColor: COLORS.orange,
      padding: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: 140,
    },

    buttonText: {
      textAlign: 'center',
      color: COLORS.clearWhite,
      textTransform: 'uppercase',
      fontFamily: 'Inter_800ExtraBold',
    },

    cancelButton: {
      backgroundColor: COLORS.clearWhite,
      borderWidth: 2,
      borderColor: COLORS.orange,
    },

    cancelText: {
      color: COLORS.orange,
    },
  }),

  // Approvals Prompt
  ComponentApprovalsPrompt: StyleSheet.create({
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalWrapper: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: COLORS.clearWhite,
      paddingVertical: 30,
      paddingHorizontal: 25,
      borderRadius: 15,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      marginVertical: 10,
      fontSize: 19,
    },

    subTitleText: {
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },

    button: {
      backgroundColor: COLORS.orange,
      padding: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: 140,
    },

    buttonText: {
      textAlign: 'center',
      color: COLORS.clearWhite,
      textTransform: 'uppercase',
      fontFamily: 'Inter_800ExtraBold',
    },

    listView: {
      flexGrow: 0,
      width: '100%',
      maxHeight: 200,
      alignSelf: 'flex-start',
    },

    headerText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
      marginVertical: 10,
    },

    numberText: { fontFamily: 'Inter_400Regular' },

    messageText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
    },

    renderView: {
      marginBottom: 10,
    },

    renderWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    successItem: { marginBottom: 5 },

    badge: {
      color: COLORS.clearWhite,
      paddingHorizontal: 5,
      fontFamily: 'Inter_600SemiBold',
      borderRadius: 5,
      fontSize: 13,
    },
  }),

  ComponentSuccessPrompt: StyleSheet.create({
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalWrapper: {
      backgroundColor: COLORS.clearWhite,
      padding: 30,
      borderRadius: 15,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      marginVertical: 10,
      fontSize: 19,
    },

    subTitleText: {
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },

    button: {
      backgroundColor: COLORS.orange,
      padding: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: 200,
    },

    buttonText: {
      textTransform: 'uppercase',
      textAlign: 'center',
      color: COLORS.clearWhite,
      fontFamily: 'Inter_800ExtraBold',
    },
  }),

  ComponentSuccessTimeClock: StyleSheet.create({
    modalView: {
      // flex: 1,
      // paddingHorizontal: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 99,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalWrapper: {
      backgroundColor: COLORS.clearWhite,
      width: '90%',
      padding: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleText: {
      color: COLORS.darkGray,
      fontFamily: 'Inter_700Bold',
      fontSize: 15,
    },

    clockedDate: {
      fontSize: 14,
      fontFamily: 'Inter_400Regular',
      marginTop: 20,
    },

    clockedTime: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
    },

    subText: {
      fontSize: 14,
      marginTop: 20,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
      marginHorizontal: 10,
    },

    button: {
      backgroundColor: COLORS.orange,
      padding: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: 200,
    },

    buttonText: {
      textTransform: 'uppercase',
      textAlign: 'center',
      color: COLORS.clearWhite,
      fontFamily: 'Inter_800ExtraBold',
    },
  }),

  ComponentRequestSummary: StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: COLORS.clearWhite,
    },

    summaryView: {
      height: 100,
      borderColor: COLORS.darkGray,
      borderWidth: 1,
      borderRadius: 20,
      marginTop: 30,
      padding: 15,
    },

    rowView: {
      margin: 10,
    },

    text: {
      fontFamily: 'Inter_500Medium',
    },

    summaryText: {
      fontFamily: 'Inter_500Medium',
      marginLeft: 20,
    },

    dashed: {
      paddingTop: 10,
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
      color: COLORS.lighterGray,
    },

    button: {
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: COLORS.orange,
      width: 170,
      padding: 10,
      borderRadius: 20,
      marginTop: 10,
    },

    textButton: {
      textTransform: 'uppercase',
      fontFamily: 'Inter_700Bold',
      fontSize: 16,
      color: COLORS.clearWhite,
      textAlign: 'center',
    },

    attachmentView: {
      flex: 1,
      marginVertical: 10,
    },

    fileAttachView: {
      flexDirection: 'row',
      marginLeft: 20,
    },

    imageAttachView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },

    fileAttachText: {
      marginLeft: 15,
      fontFamily: 'Inter_500Medium',
    },
  }),

  ComponentOTPrompt: StyleSheet.create({
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalWrapper: {
      backgroundColor: COLORS.clearWhite,
      padding: 30,
      borderRadius: 15,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleText: {
      fontFamily: 'Inter_700Bold',
      fontSize: 17,
      marginVertical: 10,
    },

    subTitleText: {
      fontSize: 13,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },

    button: {
      backgroundColor: COLORS.orange,
      padding: 15,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: 120,
    },

    cancelButton: {
      backgroundColor: COLORS.clearWhite,
      borderWidth: 1,
      borderColor: COLORS.orange,
    },

    buttonText: {
      textTransform: 'uppercase',
      textAlign: 'center',
      color: COLORS.clearWhite,
      fontFamily: 'Inter_800ExtraBold',
    },

    cancelText: {
      color: COLORS.orange,
    },

    rowView: {
      flexDirection: 'row',
      marginTop: 10,
      gap: 10,
    },

    dateTitle: {
      fontFamily: 'Inter_600SemiBold',
      paddingHorizontal: 35,
    },

    timeTitle: { fontFamily: 'Inter_600SemiBold' },

    listTitle: {
      flexDirection: 'row',
      gap: 0,
      marginTop: 20,
      marginBottom: 10,
      justifyContent: 'space-between',
    },

    listTimeTitle: {
      flexDirection: 'row',
      gap: 22,
    },

    listView: {
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },

    itemView: {
      flexDirection: 'row',
      paddingVertical: 5,
    },

    itemText: {
      paddingHorizontal: 10,
    },
  }),

  ComponentSearch: (ios: boolean) =>
    StyleSheet.create({
      topContainer: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },

      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -1,
      },

      searchValueText: {
        backgroundColor: COLORS.clearWhite,
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        borderRadius: 15,
        width: 130,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: ios ? 5 : 0,
      },
    }),

  ComponentPersonal: StyleSheet.create({
    container: {
      opacity: 1,
      flex: 1,
      backgroundColor: COLORS.offWhite,
    },

    topView: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },

    imageView: {
      borderRadius: 100,
      borderWidth: 9,
      marginBottom: 10,
      borderColor: COLORS.offWhite,
    },

    bodyView: {
      backgroundColor: COLORS.clearWhite,
      width: '100%',
      height: '90%',
      position: 'absolute',
      bottom: 0,
      zIndex: -1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },

    wrapper: {
      width: 170,
      height: 170,
      borderRadius: 80,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },

    image: {
      width: 180,
      height: 180,
      alignSelf: 'center',
      backfaceVisibility: 'hidden',
    },

    nameText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 24,
      color: COLORS.orange,
      textAlign: 'center',
      textTransform: 'capitalize',
    },

    subText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 15,
    },

    infoView: {
      marginHorizontal: 20,
      marginBottom: 10,
      flexGrow: 0,
      marginRight: -1,
      paddingRight: 8,
    },

    titleText: {
      fontFamily: 'Inter_400Regular',
      marginHorizontal: 15,
      marginVertical: 8,
    },

    contentText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      borderColor: COLORS.darkGray,
      borderWidth: 2,
      paddingVertical: 10,
      borderRadius: 13,
      paddingLeft: 20,
      marginRight: 10,
    },

    horizontalScrollBar: {
      marginLeft: 12,
    },
  }),

  ComponentPayslip: StyleSheet.create({
    animatedView: {
      backgroundColor: COLORS.clearWhite,
      opacity: 1,
      flex: 1,
      paddingHorizontal: 20,
    },

    payHistoryTitle: {
      fontFamily: 'Inter_600SemiBold',
      marginHorizontal: 3,
      fontSize: 16,
      marginVertical: 13,
    },

    topContainer: {
      width: '100%',
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },

    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    button: {
      backgroundColor: COLORS.orange,
      paddingVertical: 10,
      borderRadius: 30,
      marginTop: 20,
      width: 150,
      zIndex: -1,
    },

    buttonText: {
      textAlign: 'center',
      textTransform: 'uppercase',
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',
    },
  }),

  ComponentToast: (val: number) =>
    StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 50,
        position: 'absolute',
        alignSelf: 'center',
        overflow: 'hidden',
        width: '90%',
        // 0 - Error, 1 - Warning, - Success
        borderStartColor:
          val === 0 ? COLORS.red : val === 1 ? COLORS.brightYellow : val === 2 ? COLORS.green : COLORS.lighterGray,
        borderStartWidth: 8,
        borderRadius: 6,
        zIndex: 999,

        elevation: 8,
        borderColor: COLORS.lightGray,
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: COLORS.clearWhite,
      },

      title: {
        textTransform: 'capitalize',
        fontFamily: 'Inter_600SemiBold',
      },

      text: {
        fontFamily: 'Inter_400Regular',
      },
    }),

  ComponentRefreshPage: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.clearWhite,
    },

    mainText: {
      fontFamily: 'Inter_400Regular',
      marginTop: 5,
      fontSize: 14,
      color: COLORS.black,
    },

    text: {
      fontFamily: 'Inter_400Regular',
      fontStyle: 'italic',
      marginTop: 15,
      color: COLORS.darkGray,
    },
  }),

  ComponentSelectionList: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    button: {
      marginHorizontal: 10,
      padding: 10,
      backgroundColor: COLORS.clearWhite,
      borderBottomColor: COLORS.lighterGray,
      borderBottomWidth: 1,
    },

    loader: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingBottom: 20,
      flexDirection: 'row',
    },

    loaderText: {
      marginLeft: 10,
      fontFamily: 'Inter_500Medium',
      color: COLORS.lighterGray,
    },

    titleText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
    },
  }),

  ComponentOverlapNote: StyleSheet.create({
    container: {
      overflow: 'hidden',
      borderRadius: 8,
    },

    alertBox: {
      width: '100%',
      padding: 16,
      borderLeftWidth: 8,
      borderLeftColor: '#F97316',
      backgroundColor: '#FFF7ED',
    },

    content: {
      gap: 8,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    label: {
      color: '#374151',
      fontWeight: '600',
    },

    messageContainer: {
      paddingLeft: 20,
    },

    message: {
      color: '#374151',
      fontSize: 14,
    },

    list: {
      paddingLeft: 24,
      marginTop: 4,
    },

    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },

    bullet: {
      color: '#374151',
      fontSize: 14,
      marginRight: 8,
    },

    listText: {
      flex: 1,
      color: '#374151',
      fontSize: 14,
    },
  }),

  // Styled Text Styles
  StyledText: StyleSheet.create({
    sm_u: {
      fontFamily: 'Inter_600SemiBold',
      textDecorationLine: 'underline',
    },

    sm: { fontFamily: 'Inter_600SemiBold' },
    b: { fontFamily: 'Inter_700Bold' },
    u: { textDecorationLine: 'underline' },
    t: { color: COLORS.lighterGray },
  }),
};
