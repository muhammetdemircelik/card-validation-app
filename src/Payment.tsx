/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import validateCreditCard from 'credit-card-validator-mdemircelik';
import { Picker } from '@react-native-picker/picker';

type RootStackParamList = {
  Home: undefined;
  Payment: undefined;
  ShoppingCart: undefined;
};

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

type Props = {
  navigation: PaymentScreenNavigationProp;
};

const { width, height } = Dimensions.get('window');

const Payment: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [expError, setExpError] = useState('');

  const handleValidation = () => {
    let error = false;

    if (cardNumber.length < 16) {
      setCardNumberError('Kart numarası 16 haneden az olamaz.');
      error = true;
    } else {
      setCardNumberError('');
    }

    if (!/^\d{3}$/.test(cvv)) {
      setCvvError('CVV 3 haneli olmalıdır.');
      error = true;
    } else {
      setCvvError('');
    }

    if (!expMonth || !expYear) {
      setExpError('Lütfen son kullanma tarihini seçiniz.');
      error = true;
    } else {
      setExpError('');
    }

    if (!error) {
      const formattedMonth = expMonth.padStart(2, '0');
      const formattedYear = expYear.slice(-2);
      const expDate = `${formattedMonth}/${formattedYear}`;
      const result = validateCreditCard(cardNumber.replace(/\s+/g, ''), cvv, expDate);
      Alert.alert(result.message);
    }
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const currentYear = new Date().getFullYear();

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeArea]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.scrollViewContent}
      >
                  <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart')}>
              <Text style={styles.navbarText}>Geri</Text>
            </TouchableOpacity>
            <Text style={styles.navbarTitle}>Ödeme</Text>
            <View style={{ width: 50 }} />
          </View>
        <View style={{ padding: width * 0.02 }}>

          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardNumber}>
                {formatCardNumber(cardNumber.padEnd(16, '•'))}
              </Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardDetailText}>
                  {expMonth && expYear ? `${expMonth}/${expYear.slice(-2)}` : 'MM/YY'}
                </Text>
                <Text style={styles.cardDetailText}>
                  {cvv.padEnd(3, '•')}
                </Text>
              </View>
            </View>
            <TextInput
              style={[styles.input, cardNumberError && styles.inputError]}
              placeholder="Kart Numarası"
              value={formatCardNumber(cardNumber)}
              onChangeText={text => {
                setCardNumber(text.replace(/\s+/g, '').replace(/[^0-9]/g, ''));
                if (text.length < 16) {
                  setCardNumberError('Kart numarası 16 haneden az olamaz.');
                } else {
                  setCardNumberError('');
                }
              }}
              maxLength={19} // 16 digits + 3 spaces
              keyboardType="numeric"
            />
            {cardNumberError ? <Text style={styles.errorText}>{cardNumberError}</Text> : null}
            <View style={styles.row}>
              <View style={[styles.inputContainer, styles.cvvInput]}>
                <TextInput
                  style={[styles.input, cvvError && styles.inputError]}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={text => {
                    setCvv(text.replace(/[^0-9]/g, '').slice(0, 3));
                    if (!/^\d{3}$/.test(text)) {
                      setCvvError('CVV 3 haneli olmalıdır.');
                    } else {
                      setCvvError('');
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={3}
                />
                {cvvError ? <Text style={styles.errorText}>{cvvError}</Text> : null}
              </View>
              <View style={[styles.inputContainer, styles.expInput]}>
                <View style={styles.pickerRow}>
                  <Picker
                    selectedValue={expMonth}
                    style={[styles.picker, styles.monthPicker, expError && styles.inputError]}
                    onValueChange={(itemValue) => {
                      setExpMonth(itemValue);
                      if (!itemValue || !expYear) {
                        setExpError('Lütfen son kullanma tarihini seçiniz.');
                      } else {
                        setExpError('');
                      }
                    }}
                  >
                    <Picker.Item label="Ay" value="" />
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                      <Picker.Item key={num} label={num < 10 ? `0${num}` : `${num}`} value={num < 10 ? `0${num}` : `${num}`} />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={expYear}
                    style={[styles.picker, styles.yearPicker, expError && styles.inputError]}
                    onValueChange={(itemValue) => {
                      setExpYear(itemValue);
                      if (!expMonth || !itemValue) {
                        setExpError('Lütfen son kullanma tarihini seçiniz.');
                      } else {
                        setExpError('');
                      }
                    }}
                  >
                    <Picker.Item label="Yıl" value="" />
                    {Array.from({ length: 21 }, (_, i) => currentYear + i).map(num => (
                      <Picker.Item key={num} label={`${num.toString().slice(-2)}`} value={`${num}`} />
                    ))}
                  </Picker>
                </View>
                {expError ? <Text style={styles.errorText}>{expError}</Text> : null}
              </View>
            </View>
            <Button
              title="Onayla"
              onPress={handleValidation}
              color="#FFA500"
              disabled={cardNumber.length < 16 || !/^\d{3}$/.test(cvv) || !expMonth || !expYear}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: height * 0.03,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.02,
    backgroundColor: '#FFA500',
    marginBottom: height * 0.015,
  },
  navbarText: {
    fontSize: width * 0.045,
    color: 'white',
  },
  navbarTitle: {
    fontSize: width * 0.045,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: 'transparent', // Use transparent to avoid overlapping with navbar
  },
  card: {
    width: '90%',
    height: height * 0.25,
    borderRadius: 10,
    backgroundColor: '#1e3d58',
    padding: width * 0.05,
    marginBottom: height * 0.03, // Adjust this line for spacing
    marginTop: height * 0.015, // Add space, provides distance from navbar
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardNumber: {
    fontSize: width * 0.06,
    color: 'white',
    letterSpacing: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
  },
  cardDetailText: {
    fontSize: width * 0.045,
    color: 'white',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: height * 0.05,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: width * 0.025,
    marginBottom: height * 0.015,
  },
  cvvInput: {
    marginRight: width * 0.03,
  },
  expInput: {
    marginLeft: width * 0.03,
  },
  picker: {
    height: height * 0.06,
    flex: 1, // Adjusted to flex
    marginBottom: height * 0.015,
  },
  monthPicker: {
    marginRight: width * 0.03,
  },
  yearPicker: {
    marginLeft: width * 0.03,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: height * 0.01,
  },
  inputError: {
    borderColor: 'red',
  },
});

export default Payment;
