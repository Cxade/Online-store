"use strict";

fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const cardsDiv = document.querySelector(".products__box");
    if (cardsDiv) {
      data.forEach(({ imgUrl, cardName, description, price, id }) => {
        const productElem = `
        <div class="product">
          <img src="${imgUrl}" alt="product" class="product__img" />
          <div class="product__content">
              <a href="#" class="product__heading">${cardName}</a>
              <p class="product__text">${description}</p>
              <p class="product__price">$${price}</p>
              <p class="product__id">${id}</p>
          </div>
          <a href="#" class="product__add"
              ><img
              src="img/product__add.svg"
              alt="add product"
              class="product__add-img"
              />Add to Cart</a>
        </div>
          `;
        cardsDiv.insertAdjacentHTML("beforeend", productElem);
      });
    } else {
      console.log("Ошибка");
    }

    const products = document.querySelectorAll(".product");
    const cartMain = document.querySelector(".cart__main");
    const cartLeft = cartMain.querySelector(".cart__left");
    const headerCart = document.querySelector(".header__cart");

    checkChildrens();

    for (const product of products) {
      const cardName = product.querySelector(".product__heading").textContent;
      const cardPrice = product.querySelector(".product__price").textContent;
      const cardImgSrc = product.querySelector(".product__img").src;
      const cardId = product.querySelector(".product__id").textContent;
      const productAdd = product.querySelector(".product__add");

      productAdd.addEventListener("click", (event) => {
        event.preventDefault();
        const productId = product.querySelector(".product__id").textContent;
        const cartProducts = cartLeft.querySelectorAll(".cart__product");
        let flag = true;
        if (cartProducts.length) {
          for (const cartProduct of cartProducts) {
            const cardIdInCart =
              cartProduct.querySelector(".product__id").textContent;
            if (cardIdInCart === productId) {
              let quantity = cartProduct.querySelector(".quantity-input");
              quantity.value = Number(quantity.value) + 1;
              flag = false;
              checkQuantity();
            }
          }
        }
        if (flag) {
          const cartElem = `
          <div class="cart__product">
            <img
              class="cart__product-img"
              src=${cardImgSrc}
              alt="product in cart"
            />
            <div class="cart__product-content">
              <h2 class="cart__product-content-title">${cardName}</h2>
              <p class="cart__product-content-price">
                Price:
                <span class="cart__product-content-price-span">${cardPrice}</span>
              </p>
              <p class="cart__product-content-color">Color: Red</p>
              <p class="cart__product-content-size">Size: Xl</p>
              <div class="cart__product-content-box">
                <p class="cart__product-content-quantity-text">Quantity:</p>
                <input
                  class="cart__product-content-quantity quantity-input"
                  type="number"
                  min="1"
                  value="1"
                />
              </div>
              <p class="product__id">${cardId}</p>
              <svg
                class="cart__product-content-svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                  fill="#575757"
                />
              </svg>
            </div>
          </div>
          `;

          cartLeft.insertAdjacentHTML("afterbegin", cartElem);

          const close = cartLeft.querySelector(".cart__product-content-svg");
          close.addEventListener("click", function () {
            const divRemoved = close.closest(".cart__product");
            divRemoved.remove();
            checkChildrens();
            checkQuantity();
          });

          checkChildrens();
          checkQuantity();
        }
      });
    }

    function checkChildrens() {
      const childrenCount = cartLeft.children.length;

      if (childrenCount === 0) {
        const empty1 = document.createElement("p");
        const empty2 = document.createElement("p");
        const link = document.createElement("a");

        empty1.classList.add("cart__empty");
        empty2.classList.add("cart__empty");
        link.href = "#anchor";
        link.classList.add("cart__anchor");
        link.textContent = "something";
        empty1.textContent = "EMPTY :(";
        empty2.textContent = "Buy ";
        empty2.appendChild(link);
        empty2.innerHTML += " you like!";
        cartMain.appendChild(empty1);
        cartMain.appendChild(empty2);
      } else {
        const h1Elements = cartMain.querySelectorAll(".cart__empty");
        if (h1Elements.length) {
          h1Elements.forEach((e) => {
            e.remove();
          });
        }
      }
    }

    function checkQuantity() {
      const quantitys = cartLeft.querySelectorAll(".quantity-input");
      let sum = 0;
      for (const quantity of quantitys) {
        sum = sum + Number(quantity.value);
      }
      headerCart.textContent = sum;
    }
  });
