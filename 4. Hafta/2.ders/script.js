const fetchUsers = async () => {
  const storageKey = "usersData";
  const storageTimeKey = "usersDataTimestamp";
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now();

  const storedData = localStorage.getItem(storageKey);
  const storedTime = localStorage.getItem(storageTimeKey);

  if (storedData && storedTime && now - storedTime < oneDay) {
    console.log("Veri localStorage'dan yüklendi.");
    renderUsers(JSON.parse(storedData));
    return;
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error("API'den veri çekilemedi");

    const users = await response.json();
    localStorage.setItem(storageKey, JSON.stringify(users));
    localStorage.setItem(storageTimeKey, now);

    renderUsers(users);
  } catch (error) {
    console.error("Hata:", error);
    document.querySelector(".ins-api-users").innerHTML =
      "<p>Veri alınırken hata oluştu!</p>";
  }
};

const renderUsers = (users) => {
  const usersWrapper = document.querySelector(".ins-api-users");
  usersWrapper.innerHTML = "";
  users.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.classList.add("user-card");
    userElement.innerHTML = `
            <p><strong>${user.name}</strong></p>
            <p><span>Email: </span>${user.email}</p>
            <p><span>Adres: </span>${user.address.street}, ${user.address.city}</p>
            <button onclick="deleteUser(${user.id})">Sil</button>
        `;
        usersWrapper.appendChild(userElement);
  });
};

const deleteUser = (userId) => {
  let users = JSON.parse(localStorage.getItem("usersData"));
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("usersData", JSON.stringify(users));
  renderUsers(users);
};

fetchUsers();
