// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Login from 'app/auth/Login';
import Home from 'app/tabs/Home';
import Calendar from 'app/tabs/Calendar';
import Request from 'app/tabs/Request';
import Approvals from 'app/pages/home/approver/Approvals';
import TimeOff from 'app/pages/home/TimeOff';
import Timesheet from 'app/pages/home/Timesheet';
import UseCamera from 'app/pages/use/Camera';
import Teams from 'app/pages/home/Teams';
import Contacts from 'app/pages/home/Contacts';
import ContactInformation from 'app/pages/view/ContactInformation';
import LoanLedger from 'app/pages/home/LoanLedger';
import Profile from 'app/tabs/Profile';
import Notification from 'app/pages/home/Notification';
import Reviewals from 'app/pages/home/approver/Reviewals';

import { CtxLogin } from './auth/Login.context';
import { CtxHome } from './tabs/Home.context';
import { CtxCalendar } from './tabs/Calendar.context';
import { CtxRequest } from './tabs/Request.context';
import { CtxApprovals } from './pages/approver/Approvals.context';
import { CtxTimeOff } from './pages/TimeOff.context';
import { CtxTimesheet } from './pages/Timesheet.context';
import { CtxCamera } from './pages/use/Camera.context';
import { CtxTeams } from './pages/home/Teams.context';
import { CtxContacts } from './pages/home/Contacts.context';
import { CtxLoanLedger } from './pages/home/LoanLedger.context';
import { CtxPendings } from './pages/home/Pending.context';
import Pending from 'app/pages/home/Pending';
import { CtxProfile } from './tabs/Profile.context';
import { CtxNotification } from './pages/home/Notification.context';
import { createStackNavigator } from '@react-navigation/stack';
import TeamsMember from 'app/pages/view/TeamsMember';
import { CtxReviewals } from './pages/approver/Reviewals.context';

const StackB = createStackNavigator();

export const RndrLogin = () => {
  return (
    <CtxLogin>
      <Login />
    </CtxLogin>
  );
};

export const RndrHome = () => {
  return (
    <CtxHome>
      <Home navigation={useNavigation()} />
    </CtxHome>
  );
};

export const RndrCalendar = () => {
  return (
    <CtxCalendar>
      <Calendar />
    </CtxCalendar>
  );
};

export const RndrRequest = () => {
  return (
    <CtxRequest>
      <Request />
    </CtxRequest>
  );
};

export const RndrApprovals = () => {
  return (
    <CtxApprovals>
      <Approvals navigation={useNavigation()} />
    </CtxApprovals>
  );
};

export const RndrReviewals = () => {
  return (
    <CtxReviewals>
      <Reviewals navigation={useNavigation()} />
    </CtxReviewals>
  );
};

export const RndrTeams = () => {
  return (
    <CtxTeams>
      <Teams />
    </CtxTeams>
  );
};

export const RndrTimeOff = () => {
  return (
    <CtxTimeOff>
      <TimeOff />
    </CtxTimeOff>
  );
};

export const RndrTimesheet = () => {
  return (
    <CtxTimesheet>
      <Timesheet />
    </CtxTimesheet>
  );
};

export const RndrCamera = () => {
  return (
    <CtxCamera>
      <UseCamera />
    </CtxCamera>
  );
};

export const RndrContacts = () => {
  return (
    <CtxContacts>
      <StackB.Navigator initialRouteName="ContactsList">
        <StackB.Screen name="ContactsList" component={Contacts} options={{ headerShown: false }} />
        <StackB.Screen name="ContactInformation" component={ContactInformation} options={{ headerShown: false }} />
      </StackB.Navigator>
    </CtxContacts>
  );
};

export const RndrTeamMember = () => {
  return (
    <CtxTeams>
      <StackB.Navigator initialRouteName="TeamsList">
        <StackB.Screen name="TeamsList" component={Teams} options={{ headerShown: false }} />
        <StackB.Screen name="TeamsInformation" component={TeamsMember} options={{ headerShown: false }} />
      </StackB.Navigator>
    </CtxTeams>
  );
};

export const RndrLoanLedger = () => {
  return (
    <CtxLoanLedger>
      <LoanLedger />
    </CtxLoanLedger>
  );
};

export const RndrPending = () => {
  return (
    <CtxPendings>
      <Pending />
    </CtxPendings>
  );
};

export const RndrProfile = () => {
  return (
    <CtxProfile>
      <Profile navigation={useNavigation()} />
    </CtxProfile>
  );
};

export const RndrNotification = () => {
  return (
    <CtxNotification>
      <Notification navigation={useNavigation()} />
    </CtxNotification>
  );
};
