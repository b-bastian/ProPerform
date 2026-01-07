import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { OnboardingContext } from '../context/OnboardingContext';
import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';
import OnboardingScreen from '../pages/Onboarding/OnboardingScreen';
import OnboardingScreen2 from '../pages/Onboarding/OnboardingScreen2';
import OnboardingScreen3 from '../pages/Onboarding/OnboardingScreen3';

const DEV_MODE = false; // false setzen für normal, __DEV__ dev mode
const DEV_START_SCREEN = 'OnboardingScreen'; // change screen here

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          console.log('Tab:', route.name, 'Color:', color);
          if (route.name === 'Home') {
            return <Icon name="home" color={color} size={28} />;
          }
          return <Icon name="person" color={color} size={28} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1c3a8a',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontWeight: '500',
        },
        tabBarActiveTintColor: '#ffffffff',
        tabBarInactiveTintColor: '#8899bb',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      if (DEV_MODE) {
        setShowOnboarding(true);
      } else {
        const finished = await AsyncStorage.getItem('onboardingFinished');
        setShowOnboarding(!finished);
      }
    })();
  }, []);

  if (showOnboarding === null) return null;

  return (
    <OnboardingContext.Provider
      value={{
        finishOnboarding: () => setShowOnboarding(false),
        resetOnboarding: () => setShowOnboarding(true),
      }}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={DEV_MODE ? DEV_START_SCREEN : undefined}
      >
        {showOnboarding ? (
          <>
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="OnboardingScreen2"
              component={OnboardingScreen2}
            />
            <Stack.Screen
              name="OnboardingScreen3"
              component={OnboardingScreen3}
            />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </OnboardingContext.Provider>
  );
}
