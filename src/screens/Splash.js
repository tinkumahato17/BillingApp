import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { THEME_COLOR } from '../common/Color';


const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 3000)
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My Billing App</Text>
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
  },
  logo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '600'

  }
})