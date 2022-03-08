import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'
import CoinItem from "./components/CoinItem";

const App = () => {
  //crea variable de Array vacios, para que posteriormente llenarse
  const [coins, setCoins] = useState([])
  const [Search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  //Carga DATA usando ASYNC AWAIT
  const loadData = async ()=> {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  }
  //ejecuta funcion loadData, con el compenente 'useEffect'
  useEffect(()=>{
    console.log('loaded');
    loadData();
    //para que no se creen un bucle
  }, [])



  //retorna las vistas para imprimir en pantalla
  return (
    //llama estilo container
    <View style= {style.container}>
      <StatusBar style={style.statusBar}
      //EL STATUSBAR SIRVE PARA OCUPAR ESPACIO EN LA BARRA DE ARRIBA
      />
        <View style= {style.header}>
          <Text style={style.title}>CrypTeo</Text>  
          <TextInput style={style.searchinput}
          placeholder="search a Coin"
          placeholderTextColor="#858585"
          onChangeText={text => setSearch(text)}
          />
        </View>

      <FlatList
      style={style.list}
        data = {
          coins.filter(coin => coin.name.toLowerCase().includes(Search) || coin.symbol.toLowerCase().includes(Search))
        }
        // recorre y pinta cada parte del array por el components 'FlasList'
        renderItem = {({item})=>{
          return <CoinItem coin={item} />
        }}
        showsVerticalScrollIndicator={false}
        refreshing= {refreshing}
        onRefresh={async ()=>{
            setRefreshing(true)
            await loadData()
            setRefreshing(false);
        }}
      />
    </View>
    
  );
};
//estilos
const style = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1
  },
  title:{
    color: '#fff',
    marginTop:10,
    fontSize: 20
  },
  list:{
    width: '90%',
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15
  },
  statusBar:{
    backgroundColor: '#141414'
  },
  searchinput:{
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  }
})

export default App
