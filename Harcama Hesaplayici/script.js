const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");
const nameInput = document.querySelector("#name-input");

const username = localStorage.getItem("name") || "";

nameInput.value = username;

nameInput.addEventListener("change", (e) => {
  localStorage.setItem("name", e.target.value);
});

formBtn.addEventListener("click", addExpence);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;

function calculateTotal(fiyat) {
  total += Number(fiyat);
  toplamBilgi.innerText = total;
}

function addExpence(e) {
  e.preventDefault();

  if (!harcamaInput.value || fiyatInput.value === "") {
    alert("Lütfen ürün ve fiyat giriniz");
    return;
  }

  const harcamaDiv = document.createElement("div");

  harcamaDiv.classList.add("harcama");
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  harcamaDiv.innerHTML = `
          <h2>${harcamaInput.value}</h2>
          <h2 id="value">${fiyatInput.value}</h2>
          <div class="buttons">
            <img id="payment" src="/img/icons8-payment-64.png" />
            <img id="remove" src="/img/icons8-delete-64.png" />
          </div>
  `;

  liste.appendChild(harcamaDiv);

  calculateTotal(fiyatInput.value);

  harcamaInput.value = "";
  fiyatInput.value = "";
}

function handleClick(e) {
  const element = e.target;
  if (element.id === "remove") {
    const wrapperElement = element.parentElement.parentElement;

    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    calculateTotal(-Number(deletedPrice));

    wrapperElement.remove();
  } else if (element.id === "payment") {
    const wrapperElement = element.parentElement.parentElement;

    const payed = wrapperElement.classList.contains("payed");

    if (payed) {
      wrapperElement.classList.remove("payed");
      calculateTotal(Number(wrapperElement.querySelector("#value").innerText));
    } else {
      wrapperElement.classList.add("payed");
      calculateTotal(-Number(wrapperElement.querySelector("#value").innerText));
    }
  }
}

function handleFilter(e) {
  const items = liste.childNodes;

  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }

        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
