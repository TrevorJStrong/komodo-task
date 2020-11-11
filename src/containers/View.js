import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {
  Icon,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import MapView, { Marker } from "react-native-maps";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const MapViewScreen = ({ navigation, route }) => {
    const navigateBack = () => {
        navigation.goBack();
    };
    
    // fetch location object that has been passed as a route param
    const { location } = route.params;
  
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    
    // pass location latitude & longitude values 
    const [ region ] = useState({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
  
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff' }}>
            <TopNavigation
                title="View Location Screen"
                alignment="center"
                accessoryLeft={BackAction}
            />
            <Divider />
            <Layout>
                <MapView
                    style={{ height: 400, width: '100%' }}
                    region={region}
                >
                    <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                </MapView>

                <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: '500', fontSize: 22 }}>{location.name}</Text>
                    <Text style={{ fontSize: 18, marginTop: 20 }}>{location.description}</Text>
                </View>
            </Layout>
        </SafeAreaView>
    );
  };