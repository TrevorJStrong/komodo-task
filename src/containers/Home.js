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
import MapView from 'react-native-maps';

const AddIcon = (props) => <Icon {...props} name="plus-outline" />;

const ChevronIcon = (props) => <Icon {...props} name="chevron-right" />;

export const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const NavigationButton = () => (
    <TopNavigationAction icon={AddIcon} onPress={navigateDetails} />
  );
  
  const [items, setItem] = useState([]);

  useEffect(() => {
    const add_listener = navigation.addListener('focus', () => {
      this.getData();
    });

    return add_listener;
    // AsyncStorage.clear();
  });

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
      <Layout
        style={{
          flex: 1,
        }}>
          <View>
            {items.length !== null &&
              <View>
                {items.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 2, borderBottomColor: '#bcd4e6' }}>
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
