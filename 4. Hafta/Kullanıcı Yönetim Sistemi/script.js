$(document).ready(() => {
  let appendLocationSelector = "body";
  let appendLocation = $("<div>").addClass("container").appendTo(appendLocationSelector);

  let title = $("<h1>", {
    class: "title",
    text: "Kullanici Yonetim Sistemi",
  }).appendTo(appendLocation);

  let userForm = $("<div>", { id: "user-form" }).appendTo(appendLocation);
  let userInput = $("<input>", {
    type: "text",
    id: "user-name",
    placeholder: "Kullanıcı Adı",
  }).appendTo(userForm);

  let addUserButton = $("<button>", {
    class: "btn",
    id: "add-user-button",
    text: "Ekle",
  }).appendTo(userForm);

  let restoreButton = $("<button>", {
    class: "btn",
    id: "restore-button",
    text: "Silinen Kullanıcıları Geri Getir (1)",
  }).appendTo(appendLocation);

  let userList = $("<ul>", { id: "user-list" }).appendTo(appendLocation);
  let expireTime = 24 * 60 * 60 * 1000;


  const cleanExpiredUsers = () => {
    let users = JSON.parse(localStorage.getItem("Users")) || [];
    let currentTime = new Date().getTime();

    users = users.filter((user) => user.expireTime > currentTime);
    localStorage.setItem("Users", JSON.stringify(users));
  };

  const loadUsers = () => {
    cleanExpiredUsers();
    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const validUsers = users.filter((user) => user.id !== undefined);

    localStorage.setItem("Users", JSON.stringify(validUsers));

    validUsers.forEach((user) => {
      let userElement = `
       <li data-id='${user.id}'><span class='list-content'>${user.name}</span>
            <button class="btn delete-user">Sil</button>
        </li>`;
        userList.append(userElement);
    });

    if (sessionStorage.getItem("restoreUsed")) {
      restoreButton.hide();
    }
  };

  $(document).on("click", "#add-user-button", () => {
    const name = userInput.val().trim();
    if (name !== "") {
      const users = JSON.parse(localStorage.getItem("Users")) || [];
      let idCounter =
        users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
      let currentTime = new Date().getTime();

      let expireTimeValue = currentTime + expireTime;

      users.push({ id: idCounter, name: name, expireTime: expireTimeValue });
      localStorage.setItem("Users", JSON.stringify(users));

      let userElement = `
      <li data-id='${idCounter}'><span class='list-content'>${name}</span>
            <button class="btn delete-user">Sil</button>
        </li>`;

        userList.append(userElement);
      userInput.val("");
    }
  });

  $(document).on("keypress", userInput, (e) => {
    if (e.which === 13) {
      $("#add-user-button").click();
    }
  });

  $(document).on("click", ".delete-user", function () {
    const userId = $(this).parent().data("id");
    let users = JSON.parse(localStorage.getItem("Users")) || [];
    let deletedUsers = JSON.parse(sessionStorage.getItem("deletedUsers")) || [];

    let deletedUser = users.find((user) => user.id == userId);
    if (deletedUser) {
      deletedUsers.push(deletedUser);
      sessionStorage.setItem("deletedUsers", JSON.stringify(deletedUsers));
    }

    users = users.filter((user) => user.id != userId);
    localStorage.setItem("Users", JSON.stringify(users));
    $(this).parent().remove();

    if (
      userList.children().length === 0 &&
      !sessionStorage.getItem("restoreUsed")
    ) {
      restoreButton.show();
    }
  });

  //? MutationObserver ile liste değişimi
  let observer = new MutationObserver(() => {
    if (
      userList.children().length === 0 &&
      !sessionStorage.getItem("restoreUsed")
    ) {
      restoreButton.show();
    }
  });
  observer.observe(appendLocation[0], { childList: true });

  $(document).on("click", "#restore-button", function () {
    let deletedUsers = JSON.parse(sessionStorage.getItem("deletedUsers")) || [];

    if (deletedUsers.length > 0) {
      let users = JSON.parse(localStorage.getItem("Users")) || [];

      deletedUsers.forEach((user) => {
        users.push(user);
        let userElement = `
           <li data-id='${user.id}'><span class='list-content'>${user.name}</span>
            <button class="btn delete-user">Sil</button>
        </li>`;

        userList.append(userElement);
      });

      localStorage.setItem("Users", JSON.stringify(users));
      sessionStorage.removeItem("deletedUsers");
    }

    sessionStorage.setItem("restoreUsed", "true");
    restoreButton.hide();
  });

  $("<style>")
    .addClass("my-css")
    .html(
      `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
      }

      body {
        background-color: #212121;
      }

      .btn {
        display: inline-block;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.2s ease;
      }

      .container {
        text-align: center;
        max-width: 600px;
        min-height: 600px;
        margin: 60px auto;
        padding: 50px;
        border-radius: 25px;
        background-color: whitesmoke;
      }

      .title{
        font-size: 24px;
        margin-bottom: 20px;
      }

      #user-form {
        text-align: center;
        width: 100%;
      }

      #user-name {
        width: 75%;
        outline: none;
        border: 1px solid #999;
        padding: 8px;
        border-radius: 4px;
        height: 100%;
      }

      #user-name:focus {
        border-color: #212121;
      }

      #user-form button {
        background-color: #212121;
        color: #fff;
        padding: 10px 25px;
        margin-left: 5px;
      }

      #user-form button:hover {
        background-color: #000;
      }

      #restore-button{
        background-color: #212121;
        color: #fff;
        margin-top: 5px;
        display: none;
      }
      #restore-button:hover{
        background-color: #000;
      }

      #user-list {
        list-style: none;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;
      }

      #user-list li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border: 1px solid #999;
        border-radius: 5px;
      }

      #user-list li .list-content {
        margin-left: 10px;
        line-height: 45px;
      }

      .delete-user {
        background-color: #e51414;
        color: #fff;
        margin-right: 5px;
      }

      .delete-user:hover {
        background-color: #c93131;
      }

      .completed {
        background-color: #019401;
        color: #fff;
      }

      @media (max-width: 480px) {
        body {
          font-size: 14px;
        }

        .container {
          padding: 25px;
        }
          
        button {
          padding: 5px 10px !important;
        }
      }
    `
    )
    .appendTo("head");

  loadUsers();
});
