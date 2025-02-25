let user = {
  name: prompt("Adınız nedir?"),
  age: parseInt(prompt("Yaşınız kaç?")),
  job: prompt("Mesleğiniz nedir?")
};

console.log("Kullanıcı Bilgileri:", user);

let cart = [];

while (true) {
  let action = prompt("Ürün eklemek için 'e', çıkarmak için 'c', çıkmak için 'q' yazın!");
  
  if (action.toLowerCase() === 'q') break;
  
  if (action.toLowerCase() === 'e') {
      let product = prompt("Sepete eklemek istediğiniz ürünü yazın:");
      let price = parseFloat(prompt(`${product} ürünü için fiyat girin:`));
      
      cart.push({ product, price });
      console.log(`${product} ürünü sepete eklendi. Fiyat: ${price} TL`);
  } 
  
  else if (action.toLowerCase() === 'c') {
      let removeProduct = prompt("Çıkarmak istediğiniz ürünü yazın:");
      let index = cart.findIndex(item => item.product.toLowerCase() === removeProduct.toLowerCase());
      
      if (index !== -1) {
          console.log(`${cart[index].product} ürünü sepetten çıkarıldı.`);
          cart.splice(index, 1);
      } else {
          console.log("Ürün bulunamadı.");
      }
  }
}

let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

console.log("Sepetiniz:", cart);
console.log("Toplam Fiyat:", totalPrice + " TL");
