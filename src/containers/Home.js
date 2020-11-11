import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {
  Icon,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddIcon = (props) => <Icon {...props} name="plus-outline" />;

export const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const NavigationButton = () => (
    <TopNavigationAction icon={AddIcon} onPress={navigateDetails} />
  );
  
  const [items, setItem] = useState([]);
  
  useEffect(() => {
    // add nvigation focus listener so when a user saves a location
    // it will automatically show without having to refresh
    const add_listener = navigation.addListener('focus', () => {
      this.getData();
    });

    return add_listener;
  }, []);

  // fetch AsyncStorage data
  getData = async () => {
    try {
      const valueString = await AsyncStorage.getItem('myObject');
      const value = JSON.parse(valueString);
      setItem(value);
      console.log(items);
    } catch(e) {
        console.log(e);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Home Screen" alignment="center" accessoryRight={NavigationButton} />
      <Divider />
      <Layout style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: '500', padding: 20 }}>List of locations</Text>
          {items === null && 
            <View style={{ padding: 15, alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}> You have created no locations yet.</Text>
              <Text style={{ fontSize: 16, marginTop: 5 }}> Start by creating one now.</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Details")} style={{ padding: 10, backgroundColor: '#bcd4e6', width: '80%', borderRadius: 10, marginTop: 30 }}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Add location</Text>
              </TouchableOpacity>
            </View>
          }
          <View>
          {items !== null &&
            <View>
              {items.map((item, index) => {
                return (
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('View', {
                      location: item
                    })}
                    key={index} 
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 2, borderBottomColor: '#bcd4e6' }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontWeight: '500', paddingBottom: 5, fontSize: 18 }}>{item.name}</Text>
                      <Text style={{ fontSize: 14 }}>{item.description}</Text>
                    </View>
                    <View>
                      <Icon
                        style={{ height: 30, width: 30 }}
                        fill='#8F9BB3'
                        name='chevron-right'
                      />
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
            }
          </View>
        </Layout>
    </SafeAreaView>
  );
};
