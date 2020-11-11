import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {
  Icon,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';

const AddIcon = (props) => <Icon {...props} name="plus-outline" />;

export const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const NavigationButton = () => (
    <TopNavigationAction icon={AddIcon} onPress={navigateDetails} />
  );

  const [items, setItem] = useState([]);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Home Screen" alignment="center" accessoryRight={NavigationButton} />
      <Divider />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View>
            {items.length !== null &&
              <View>
                {items.map((item, index) => {
                  return (
                    <View key={index}>
                      <Text>{item.name}</Text>
                      <Text>{item.description}</Text>
                    </View>
                  )
                })}
              </View>
            }
          </View>
        </Layout>
    </SafeAreaView>
  );
};
