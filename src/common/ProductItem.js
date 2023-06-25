import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { THEME_COLOR } from './Color';


const ProductItem = ({ item, index, onClick }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            onClick(index);
        }}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
                <Text style={styles.title}>
                    {item.title.length > 30 ? item.title.substring(0, 20) : item.title}
                </Text>
                <Text style={styles.priceTitle}>
                    {'₹ ' + item.price}
                </Text>
                <Text style={styles.qtyTitle}>
                    {'Qty : ' + item.qty}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 20,
        height: 100,
        backgroundColor: '#fff',
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 20
    },
    priceTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 20,
        color: THEME_COLOR
    },
    qtyTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 20,
        color: '#000',
        position: 'absolute',
        bottom: 20,
        right: 20
    }

})

