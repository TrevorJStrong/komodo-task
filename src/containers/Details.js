import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  
  // state hooks
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ latitude, setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');
  const [ data, setData ] = useState([]);

  const saveData = async () => {

    // create location object
    let location = {
      name: name, 
      description: description,
      latitude: latitude,
      longitude: longitude
    };

    // fetch current stored locations from AsyncStorage
    const storedData = await AsyncStorage.getItem('myObject');
    console.log(storedData);

    // parse JSON string to an object
    const storedDataParsed = JSON.parse(storedData);
    setData(storedDataParsed);

    let locations_array = [];

    // check if the location object is empty
    if(storedData === null) {
      // save location object and store in AsyncStorage
      await AsyncStorage.setItem('myObject', JSON.stringify(arrData));
      navigation.navigate("Home");
    } else {
      // save and add new location object to new array
      locations_array = [...storedDataParsed, location];
      await AsyncStorage.setItem('myObject', JSON.stringify(locations_array));
      navigation.navigate("Home");
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Details Screen"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', flexDirection: 'column', justifyContent: 'space-evenly', height: '50%' }}>
          <Input
            placeholder='name'
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder='description'
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <Input
            placeholder='latitude (0.000000)'
            value={latitude}
            onChangeText={(text) => setLatitude(text)}
          />
          <Input
            placeholder='longitude (0.000000)'
            value={longitude}
            onChangeText={(text) => setLongitude(text)}
          />
        </View>
        <View style={{ position: 'absolute', bottom: 0, alignItems: 'center', marginBottom: 20 }}>
          <Button onPress={saveData} style={{ width: '100%' }}>
            Save
          </Button>
        </View>
      </Layout>
    </SafeAreaView>
  );
};
