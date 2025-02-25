let user = {
  name: prompt("Adınız nedir?"),
  age: parseInt(prompt("Yaşınız kaç?")),
  job: prompt("Mesleğiniz nedir?"),
};

console.log("Kullanıcı Bilgileri:", user);

let cart = [];

while (true) {
  let product = prompt(
    "Sepete eklemek istediğiniz ürünü yazın (Çıkmak için 'quit' yazın!):"
  );
  if (product.toLowerCase() === "quit") break;

  let price = parseFloat(prompt(`${product} ürünü için fiyat girin:`));

  cart.push({ product, price });
  console.log(`${product} ürünü sepete eklendi. Fiyat: ${price} TL`);
}

let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

console.log("Sepetiniz:", cart);
console.log("Toplam Fiyat:", totalPrice + " TL");
