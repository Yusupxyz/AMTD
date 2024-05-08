// import React in our code
import React, {useEffect, useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { getAlatMusik } from './request/request'
import { FlatGrid } from 'react-native-super-grid';

const placeholderImage = require('./assets/placeholder.png')

const App = (props) => {
  const {navigation} = props;
  const [id, setId] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  let dataJadi = [] ;
  const [items, setItems] = React.useState([
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
  ]);
  useEffect(()=>{
    getAlatMusik().then((datas) => {
      let id = [];
      let nama = [];
      let gambar = [];
      for (let i = 0; i < datas.data.length; i++){
        id.push(datas.data[i].id_alat_musik);
        nama.push(datas.data[i].nama_alat_musik);
        gambar.push(datas.data[i].gambar);

      }
      for (let i = 0; i < id.length; i++) {
        dataJadi.push([id[i],nama[i],gambar[i]])
      }

      console.log(dataJadi);
      setId(dataJadi);
    }).catch((err) => {
      setErrorStatus(err.message);
      console.log(err);
    }).finally(() => {
      setLoaded(true);
    })
  })

  return (
    <>
    {!errorStatus && loaded && (
    <SafeAreaView style={styles.container}>
        {/* <Text style={styles.text}>Menu</Text> */}
        <FlatGrid
        itemDimension={130}
        data={id}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
            <View style={styles.itemContainer}>
                   <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {id: item[0]})}
                >
                <Text style={styles.itemCode}>{item[1]}</Text>
                 <Image
                    style={styles.imageThumbnail}
                    source={ item[2]
                    ? {
                        uri: 'https://appdev161.000webhostapp.com/assets/uploads/'+item[2]
                    }
                    : placeholderImage
                    }
                />
             
                </TouchableOpacity>
            </View>
        )}
        />
    </SafeAreaView>
    )}
    {!loaded && (
      <ActivityIndicator size={'large'} style={{opacity:1}} color={'#999999'}/>
    )}
    {errorStatus && <Error errorMessage={errorStatus} />}
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f4e1',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    
  },
  text: {
    color: 'black',
    fontFamily: 'Cochin',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  },
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#d8d0ad'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1c1c1c',
    textAlign: 'center'
  },
});