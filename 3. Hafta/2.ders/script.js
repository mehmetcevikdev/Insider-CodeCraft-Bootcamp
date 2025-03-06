$(document).ready(function () {
  let productsLoaded = false;

  $("#load-products").on("click", function () {
    if (!productsLoaded) {
      $.ajax({
        url: "products.json",
        method: "GET",
        dataType: "json",

        success: function (data) {
          $("#productList").empty();
          let productItem = "";
          $.each(data, function (index, product) {
            productItem += `
                  <li class="product-item">
                      <div class="product-image">
                          <img src="${product.image1}" class="img1" />
                          <img src="${product.image2}" class="img2" />
                      </div>
                      <div class="product-info">
                          <a href="#" class="product-title">${product.name}</a>
                          <div class="product-price">
                              <span class="price">${product.price}</span>
                          </div>
                      </div>
                      <div class="add-to-cart-wrapper">
                          <a href="${product.link}" class="add-to-cart">Ürüne git</a>
                      </div>
                  </li>
                  `;
          });

          $("#product-list").append(productItem);
          productsLoaded = true;
          $("#load-products").text("Ürünleri kapat");
        },
        error: function (error) {
          console.error("Ürünler yüklenirken bir hata oluştu." + error);
        },
      });
    } else {
      $("#product-list").toggle();
      let buttonText = $("#product-list").is(":visible")
        ? "Ürünleri Kapat"
        : "Ürünleri Göster";
      $("#load-products").text(buttonText);
    }
  });
});
