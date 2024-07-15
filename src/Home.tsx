/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CartContext } from './CartContext';

const { width } = Dimensions.get('window');

type Product = {
  id: string;
  name: string;
  price: number;
  image: any; 
};

const products: Product[] = [
  { id: '1', name: 'Monitör', price: 1000, image: require('../assets/monitor.jpg') },
  { id: '2', name: 'Mouse', price: 200, image: require('../assets/mouse.jpg') },
  { id: '3', name: 'Sandalye', price: 3000, image: require('../assets/sandalye.jpg') },
  { id: '4', name: 'Kulaklık', price: 3500, image: require('../assets/kulaklik.jpg') },
  { id: '5', name: 'Şarj Aleti', price: 690, image: require('../assets/sarj.jpg') },
  { id: '6', name: 'Powerbank', price: 990, image: require('../assets/powerbank.jpg') },
  { id: '7', name: 'Tutacak', price: 50, image: require('../assets/tutacak.jpg') },
  { id: '8', name: 'Ekran Kartı', price: 500, image: require('../assets/ekranKarti.jpg') },
  { id: '9', name: 'HDMI', price: 120, image: require('../assets/hdmi.jpg') },
  { id: '10', name: 'Ses Sistemi', price: 2200, image: require('../assets/sesSistemi.jpg') },
];

const Home: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} resizeMode="cover" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} TL</Text>
      <Button title="Sepete Ekle" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>alBarakaTech</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsList}
      />
      <View style={styles.tabbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabbarText}>Anasayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
          <Text style={styles.tabbarText}>Sepetim</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#FFA500', 
    paddingVertical: width * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFA500', 
    paddingVertical: width * 0.025,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabbarText: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
  },
  productsList: {
    paddingHorizontal: width * 0.025,
    paddingBottom: 60,
  },
  productContainer: {
    flex: 1,
    margin: width * 0.025,
    padding: width * 0.05,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: width * 0.025,
  },
  productName: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: width * 0.04,
    marginVertical: width * 0.025,
  },
});

export default Home;
