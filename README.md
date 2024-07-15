# Alışveriş Sitesi Ödeme Uygulaması

Bu uygulama, örnek bir alışveriş sitesi üzerine kurulmuş olup, alışveriş işlemlerinden sonra kart validasyonu sağlayan bir uygulamadır. Uygulama, kullanıcıların kredi kartı bilgilerini girmelerini ve bu bilgilerin geçerliliğinin kontrol edilmesini sağlar.

## Kullanılan Kütüphane

Bu projede, kredi kartı validasyonu için [credit-card-validator-mdemircelik](https://www.npmjs.com/package/credit-card-validator-mdemircelik) kütüphanesi kullanılmıştır. Bu kütüphane, kredi kartı bilgilerini doğrulamak için kullanılır.

## Projeyi İndirme ve Çalıştırma

Projeyi yerel makinenize indirdikten sonra, aşağıdaki adımları izleyerek uygulamayı başlatabilirsiniz:

1. Proje dizinine gidin:
   ```bash
   cd proje-dizini
2. Gerekli bağımlılıkları indirin:
   ```bash
   npm install
4. React Native Metro Bundler'ı başlatın:
   ```bash
   npx react-native start
   
Özellikler:
Kullanıcılar kredi kartı bilgilerini (kart numarası, CVV, son kullanma tarihi) girebilir.
Kredi kartı bilgileri girildikten sonra, bilgiler credit-card-validator-mdemircelik kütüphanesi kullanılarak doğrulanır.
Geçerli ve geçersiz kredi kartı bilgileri için kullanıcıya geri bildirim sağlanır.
