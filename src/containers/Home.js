import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Icon,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const AddIcon = (props) => <Icon {...props} name="plus-outline" />;

export const HomeScreen = ({navigation}) => {
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  const NavigationButton = () => (
    <TopNavigationAction icon={AddIcon} onPress={navigateDetails} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Home Screen" alignment="center" accessoryRight={NavigationButton} />
      <Divider />
      <Layout
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></Layout>
    </SafeAreaView>
  );
};
