import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo, if not, use appropriate icon library
import AnalysisOptions from './OptionInput';
import BleComponent from './BleComponent';

function HomeScreen({ navigation,  setFinalScore}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [availableOptions, setAvailableOptions] = useState(["Anime", "Football", "Video Games", "Startup", "Beer", "Travel", "Hiking", "Project Management", "Food", "Making Friends", "Cycling"]);
    const [toCompareOptions, setToCompareOptions] = useState(["Startup", "Beer", "Travel", "Hiking"])
    const [sortingAlphabets, setSortingAlphabets] = useState([]);
    const [filterText, setFilterText] = useState('');
  return (
        <AnalysisOptions
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        toCompareOptions={toCompareOptions}
        availableOptions={availableOptions}
        sortingAlphabets={sortingAlphabets}
        filterText={filterText}
        setFilterText={setFilterText}
        setAvailableOptions={setAvailableOptions}
        setFinalScore={setFinalScore}
      />
  );
}

function DevicesScreen({ navigation, finalScore }) {
  return (
    <BleComponent finalScore={finalScore}/>
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Button title="Go to Notifications" onPress={() => navigation.navigate('Notifications')} />
    // </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeScreenPage( {setFinalScore, finalScore} ) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
        
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Devices') {
              iconName = focused ? 'bluetooth' : 'bluetooth-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
        
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red', // Set active tab color to red
          tabBarInactiveTintColor: 'gray', // Set inactive tab color to gray
          tabBarStyle: [
            {
              display: 'flex', // Ensure the tab bar is displayed as a flex container
            },
            null,
          ],
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} setFinalScore={setFinalScore} />}
        </Tab.Screen>
        <Tab.Screen name="Devices">
          {(props) => <DevicesScreen {...props} finalScore={finalScore} />}
        </Tab.Screen>
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
