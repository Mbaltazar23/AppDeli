import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { User } from "../../Domain/entities/User";
import { HomeScreen } from "../views/home/Home";
import { RegisterScreen } from "../views/register/Register";
import { RolesScreen } from "../views/roles/Roles";
import { AdminTabsNavigator } from "./AdminTabsNavigator";
import { ClientTabsNavigator } from "./ClientTabsNavigator";
import { ProfileUpdateScreen } from "../views/profile/update/ProfileUpdate";
import { UserProvider } from "../context/UserContext";
import { DeliveryTabsNavigator } from "./DeliveryTabsNavigator";

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  RolesScreen: undefined;
  AdminTabsNavigator: undefined;
  ClientTabsNavigator: undefined;
  DeliveryTabsNavigator: undefined;
  ProfileUpdateScreen: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MainStackNavigator = () => {
  return (
    <UserState>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: true,
            title: "Nuevo usuario",
          }}
        />

        <Stack.Screen
          name="RolesScreen"
          component={RolesScreen}
          options={{
            headerShown: true,
            title: "Seleccione un rol",
          }}
        />

        <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
        />
        <Stack.Screen
          name="ClientTabsNavigator"
          component={ClientTabsNavigator}
        />

        <Stack.Screen
          name="DeliveryTabsNavigator"
          component={DeliveryTabsNavigator}
        />

        <Stack.Screen
          name="ProfileUpdateScreen"
          component={ProfileUpdateScreen}
          options={{
            headerShown: true,
            title: "Actualizar usuario",
          }}
        />
      </Stack.Navigator>
    </UserState>
  );
};

const UserState = ({ children }: any) => {
  return <UserProvider>{children}</UserProvider>;
};
