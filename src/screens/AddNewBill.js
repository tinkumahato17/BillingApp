import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LIGHT_GRAY, THEME_COLOR } from '../common/Color';

import ProductItem from '../common/ProductItem';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNewBill = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [productsX, setProductsX] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [search, setSearch] = useState('');
  const inputRef = useState();
  const [name, setName] = useState('');
  const [nameModalVisible, setNameModalVisible] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        json.map(item => {
          item.qty = 1;
        })
        setProducts(json);
        setProductsX(json);
      });
  }

  const addItems = ind => {
    let temData = addedItems;
    if (temData.length > 0) {
      let isOld = false;
      temData.map(item => {
        if (item.id === products[ind].id) {
          item.qty = item.qty + 1;
          isOld = true;
        }
      });
      if (!isOld) {
        temData.push(products[ind]);
      }
    }
    else {
      temData.push(products[ind]);
    }

    let temp = [];
    temData.map(item => {
      temp.push(item);
    })
    setAddedItems(temp);
  }

  const getTotal = () => {
    let total = 0;
    tempData = addedItems;
    tempData.map(item => {
      total = total + item.price * item.qty;
    });
    return total.toFixed(2);
  }

  const filterItems = txt => {
    let temData = products;
    let newData = temData.filter(item => {
      return item.title.toLowerCase().includes(txt.toLowerCase());
    });
    if (newData.length > 0) {
      setProducts(newData);
    }
    else {
      setProducts(temData);
    }

  }

  const saveBill = async () => {
    let data = [];

    let data2 = await AsyncStorage.getItem('bills');
    if(data2 !== null){
      let json = JSON.parse(data2);
      data = json;
    }



    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    console.log(day + " " + month + " " + year);
    data.push({
      data: addedItems,
      billerName: name,
      billDate: day + '/' + month + '/' + year,
      total: getTotal()
    });
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem('bills', jsonData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../images/back.png')} style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
          <Image source={require('../images/add.png')} style={styles.icon} />
        </TouchableOpacity>

      </View>
      {addedItems.length > 0 ? (
        <FlatList data={addedItems} renderItem={({ item, index }) => {
          return <ProductItem item={item} index={index} />
        }} />
      ) : (
        <View style={styles.noItemView}>
          <Text style={styles.noItemText}>
            No Items Added
          </Text>
        </View>
      )}

      {addedItems.length > 0 && (
        <View style={styles.bottonView}>
          <Text style={styles.total}>Total : {getTotal()}</Text>
          <TouchableOpacity style={styles.btn} onPress={() => {
            setNameModalVisible(true);
          }}>
            <Text style={styles.subTxt}>Submit Bill</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal transparent visible={modalVisible}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image source={require('../images/back.png')}
              style={[styles.icon, { margin: 20 }]}
            />
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <Image
              source={require('../images/search.png')} style={styles.icon} />
            <TextInput
              placeholder='Search Item by Code'
              ref={inputRef}
              value={search}
              style={styles.textInput}
              onChangeText={txt => {
                setSearch(txt);
                filterItems(txt);
              }} />
          </View>
          <FlatList data={products} renderItem={({ item, index }) => {
            return (
              <ProductItem
                item={item}
                index={index}
                onClick={ind => {
                  setSearch('');
                  setProducts(productsX);
                  setModalVisible(false);
                  addItems(ind);
                }} />
            )
          }} />
        </View>
      </Modal>
      <Modal visible={nameModalVisible} transparent>
        <View style={styles.nameModalView}>
          <View style={styles.nameView}>
            <TextInput placeholder='Biller name'  style={styles.input}  onChangeText ={txt =>setName(txt)}/>
            <View style={styles.btnView}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => {
                setNameModalVisible(false);
              }}>
                <Text style={styles.cancelBtnTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={() => {
               
                setNameModalVisible(false);
                saveBill();
              
              }}>
                <Text style={styles.confirmBtnTxt}>Confirm Bill</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AddNewBill;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 60,
    width: '100%',
    elevation: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
  bottonView: {
    height: 100,
    width: '100%',
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 5,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'

  },
  btn: {
    height: 50,
    width: '40%',
    backgroundColor: THEME_COLOR,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    backgroundColor: '#fff'
  },
  searchBox: {
    height: 50,
    width: '80%',
    backgroundColor: LIGHT_GRAY,
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  textInput: {
    width: '70%',
    marginLeft: 10
  },
  noItemView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noItemText: {
    fontSize: 20,
    fontWeight: '600'
  },
  nameModalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameView: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: .5,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 10
  },
  btnView: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    alignItems: 'center',
    bottom: 0
  },
  cancelBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtnTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff'
  },
  confirmBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmBtnTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff'
  },
})