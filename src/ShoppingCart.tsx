/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

const { width, height } = Dimensions.get('window');

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const ShoppingCart: React.FC = () => {
  const navigation = useNavigation();
  const { cart, removeFromCart } = useContext(CartContext);

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const onGoToPayment = () => {
    if (cart.length > 0) {
      navigation.navigate('Payment');
    } else {
      Alert.alert('Uyarı', 'Sepetinizde ürün bulunmamaktadır.', [{ text: 'Tamam', style: 'cancel' }]);
    }
  };

  const groupCartItems = (cart: Product[]) => {
    const groupedItems: { [key: string]: Product } = {};

    cart.forEach(item => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].price += item.price;
        groupedItems[item.id].quantity += 1;
      } else {
        groupedItems[item.id] = { ...item, quantity: 1 };
      }
    });

    return Object.values(groupedItems);
  };

  const groupedCartItems = groupCartItems(cart);

  const totalAmount = groupedCartItems.reduce((acc, item) => acc + item.price, 0);

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.cartItem}>
      <Text>{`${item.name} (${item.quantity} Adet)`}</Text>
      <Text>{`${item.price} TL`}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(item.id)}>
        <Text style={styles.removeButtonText}>Sepetten Çıkar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={goToHome}>
          <Text style={styles.backButton}>Geri</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={groupedCartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>Sepetiniz boş.</Text>}
        />

        <Text style={styles.totalText}>{`Toplam: ${totalAmount} TL`}</Text>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={onGoToPayment}>
        <Text style={styles.paymentButtonText}>Ödemeye Geç</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.025,
      paddingVertical: height * 0.001,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: '#FFA500',
    },
    backButton: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      color: 'white',
      padding: 10,
    },
    content: {
      flex: 1,
      padding: width * 0.05,
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: height * 0.015,
    },
    removeButton: {
      backgroundColor: 'red',
      paddingHorizontal: width * 0.025,
      paddingVertical: height * 0.01,
      borderRadius: 5,
    },
    removeButtonText: {
      color: 'white',
    },
    paymentButton: {
      backgroundColor: '#FFA500',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: height * 0.02,
      marginHorizontal: width * 0.05,
      borderRadius: 10,
      marginTop: height * 0.025,
      marginBottom: height * 0.02, // Added marginBottom for spacing
    },
    paymentButtonText: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    totalText: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
      marginTop: height * 0.015,
    },
  });
  

export default ShoppingCart;
