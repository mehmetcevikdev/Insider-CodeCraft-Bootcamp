$(document).ready(() => {
  $.ajax({
    url: "products.json",
    method: "GET",
    dataType: "json",
    success: (data) => {
      $.each(data, function (index, product) {
        let discountPrice =
          product.price - (product.price * product.discount) / 100;
        $("#product-list").append(`
            <li class="product-item">
                <div class="product-image">
                    <img src="${product.image1}" class="img1" />
                    <img src="${product.image2}" class="img2" />
                </div>
                <div class="product-info">
                    <h4  class="product-title">${product.name}</h4>
                    <div class="product-price">
                        <strong class="new-price">${discountPrice}TL</strong>
                        <span class="old-price">${product.price} TL</span>
                    </div>
                    <div class="product-discount">%${product.discount}</div>
                </div>
                <div class="buttons-wrapper">
                    <a href="${product.link}" class="product-link" >Ürüne Git</a>
                    <button class="details" data-details='${product.details}' >Detaylar</button>
                </div>
            </li>
        `);
      });

      $(document).on("mouseover", ".product-image", function () {
        $(this).find(".img2").stop(true, true).fadeIn(300);
      });

      $(document).on("mouseout", ".product-image", function () {
        $(this).find(".img2").stop(true, true).fadeOut(300);
      });

      $(document).on("click", ".details", function (e) {
        e.preventDefault();
        let productDetails = $(this).attr("data-details");

        let popup = $("<div>").addClass("popup").html(`
            <h3>Ürün Detayları</h3>
            <p>${productDetails}</p>
            <button class="close-popup">Kapat</button>
        `);

        let overlay = $("<div>").addClass("overlay");

        $("body").append(popup, overlay);

        $(".close-popup").on("click", () => {
          popup.remove();
          overlay.remove();
        });

        overlay.on("click", () => {
          popup.remove();
          overlay.remove();
        });
      });
    },

    error: (error) => {
      console.error("Ürünler yüklenirken bir hata oluştu." + error);
    },
  });

  $("<style>")
    .text(
      `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
  
      body {
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      ul, li {
        list-style: none;
      }
  
      a {
        text-decoration: 0;
        color: #000;
      }

      button{
        border: none;
        font-size: 16px;
        cursor: pointer;
      }
  
      .container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        text-align: center;
      }
  
      .title {
        text-align: center;
        margin: 50px 0;
      }
  
      #load-products {
        margin: 50px 0;
        padding: 10px 15px;
        line-height: 100%;
        outline: 0;
        border: 1px solid #999;
        color: #eee;
        background-color: orangered;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }
  
      #load-products:hover {
        background-color: #212121;
      }
  
      #product-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        align-items: center;
        justify-items: center;
      }
  
      .product-item {
        width: 285px;
        margin-bottom: 30px;
        background-color: #efefef;
        position: relative;
      }
  
      .product-image {
        width: 100%;
        height: 100%;
        position: relative;
        cursor: pointer;
      }
  
      .product-image img {
        width: 100%;
      }
  
      .product-image .img2 {
        display: none;
        position: absolute;
        top: 0;
      }
  
  
      .product-info {
        text-align: center;
      }
  
      .product-title {
        margin-top: 15px;
        font-size: 15px;
        font-weight: 600;
        padding-bottom: 15px;
      }
  
      .product-price {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
  
      .product-price .new-price {
        color: orangered;
        font-weight: 500;
      }
  
      .product-price .old-price {
        font-size: 12px;
        text-decoration: line-through;
        color: #666;
      }
  
      .product-discount {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        background-color: orangered;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .buttons-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap:10px;
        margin: 15px auto 20px;
      }
  
      .details,
      .product-link {
        color: #eee;
        background-color: orangered;
        border-radius: 5px;
        padding: 10px 15px;
      }
  
      .details:hover,
      .product-link:hover {
        background-color: #212121;
      }

      .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 300px;
        width: 550px;
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        border-radius: 10px;
        text-align: justify;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }

      .close-popup {
        padding: 10px 15px;
        background-color: orangered;
        color: #fff;
        border-radius: 5px;
      }

      .close-popup:hover {
        background-color: #212121;
      }
  
      @media (max-width: 1200px) {
        .container {
          max-width: 992px;
        }
      }
  
      @media (max-width: 992px) {
        .container {
          max-width: 768px;
        }
      }
  
      @media (max-width: 768px) {
        .container {
          max-width: 576px;
        }
      }
  
      @media (max-width: 576px) {
        .container {
          max-width: 400px;
        }
        
        .popup{
          width: 285px;
        }
      }
  
      @media (max-width: 420px) {
        .container {
          max-width: 350px;
        }
      }
    `
    )
    .addClass("our-css")
    .appendTo("head");
});
