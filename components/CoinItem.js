import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
//llama funcion de archivo pasada, para imprimir en pantalla
const Coinitem = ({coin}) => {
    return (
        <View style={styles.containerItem}>
            <View style={styles.coinName}>
                <Image style={styles.image}source = {{uri: coin.image}}/>
                <View style={styles.containerName}>
                    <Text style={styles.text}>{coin.name}</Text>
                    <Text style={styles.textSimbol}>{coin.symbol}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.textPrice}>${coin.current_price}</Text>
                <Text style={[styles.pricePercentage, 
                    coin.price_change_percentage_24h > 0 ? styles.priceUp
                    : styles.priceDown]}>{coin.price_change_percentage_24h}</Text>
            </View>
        </View>
    )
}
//estilizar
const styles = StyleSheet.create({
    containerItem :{
        backgroundColor: '#121212',
        paddingTop:10,
        flexDirection: 'row',
        justifyContent : 'space-between',
    },
    coinName:{
        flexDirection: 'row',
    },
    image:{
        width: 30,
        height: 30
    },
    text:{
        color: '#ffffff',
    },
    textSimbol:{
        color: '#434343',
        textTransform:'uppercase'
    },
    containerName:{
      marginLeft: 10,  
    },
    pricePercentage:{
        textAlign: 'right',
    },
    priceUp:{
        color: '#00B5B9'
    },
    priceDown:{
        color: '#F91E1E'
    },
    textPrice:{
        color: '#fff',
        textAlign: 'right'
    }
})

export default Coinitem
