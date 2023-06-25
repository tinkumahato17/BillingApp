
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Image, View, Text, FlatList, Dimensions } from 'react-native'
import { THEME_COLOR } from '../common/Color'
import AddNewBill from './AddNewBill'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Main = () => {

  const [bill, setBills] = useState([]);
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  useEffect(() => {
    getBill();
  }, [isFocused]);

  const getBill = async () => {
    let data = await AsyncStorage.getItem('bills');
    let json = JSON.parse(data);
    console.log(JSON.stringify(json));
    setBills(json);
  }
 
  return (
    <View style={styles.container} >
      {bill.length > 0 ? (
        <FlatList data={bill} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.billItems}>
                <Text style ={styles.txtStyle} > {'Bill Name : ' + item.billerName}</Text>
                <Text style ={styles.txtStyle} > {'Bill Date : ' + item.billDate}</Text>
                <Text style ={styles.txtStyle} > {'Total Amt : ' + item.total}</Text>

            </TouchableOpacity>
          )
        }} />
      ) : (
        <View>
          <Image source={require('../images/nodata.png')} style={styles.nodata} />
          <Text style={styles.nodataTxt}>No data Found</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addBtm} onPress={() => {
        navigation.navigate('AddNewBill');
      }}>
        <Text style={styles.BtnTxt}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Main;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  addBtm: {
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    bottom: 20,
  },
  BtnTxt: {
    fontSize: 40,
    fontWeight: '600',
    color: '#fff'
  },
  nodata: {
    width: 100,
    height: 100
  },
  nodataTxt: {
    fontSize: 20,
    fontWeight: '600'
  },
  billItems: {
    width: Dimensions.get('window').width - 30,
    height: 100,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#fff',
    marginTop:20,
    marginBottom:10,
    marginHorizontal: 5,
    
  },
  txtStyle:{
    fontSize:20,
    fontWeight:'400',
    color:'#000',
    marginLeft: 10
  }
})