const form = document.querySelector("form");
const ul = document.querySelector("ul");
const span1 = document.getElementById("span1");
const span2 = document.getElementById("span2");
const span3 = document.getElementById("span3");
const span4 = document.getElementById("span4");
const span5 = document.getElementById("span5");
var obj2;
const apiUrl = "https://crudcrud.com/api/fefdb86559c24bb7b32678bf82aeb2de/data";
const apiUrl2 =
  "https://crudcrud.com/api/e689eb9963994054a2e983a94726dcc7/rating";

form.addEventListener("submit", function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const rating = document.querySelector("#rating").value;

  const expense = {
    name,
    rating,
  };

  axios
    .post(apiUrl, expense)
    .then((response) => {
      obj2 = {
        rating1: rating === "1" ? obj2.rating1 + 1 : obj2.rating1,
        rating2: rating === "2" ? obj2.rating2 + 1 : obj2.rating2,
        rating3: rating === "3" ? obj2.rating3 + 1 : obj2.rating3,
        rating4: rating === "4" ? obj2.rating4 + 1 : obj2.rating4,
        rating5: rating === "5" ? obj2.rating5 + 1 : obj2.rating5,
      };
      axios
        .put(apiUrl2 + "/65cd37ad6227a803e824c6e8", obj2)
        .then(() => {
          fetchAndRenderExpenses();
        })
        .catch((error) => {
          console.error("Error updating ratings:", error);
        });
      fetchAndRenderExpenses();
    })
    .catch((error) => {
      console.error("Error adding expense:", error);
    });
});

function fetchAndRenderExpenses() {
  ul.innerHTML = "";
  span1.innerText = "";
  span2.innerText = "";
  span3.innerText = "";
  span4.innerText = "";
  span5.innerText = "";

  axios.get(apiUrl2).then((res) => {
    obj2 = res.data[0];
    span1.innerText = res.data[0].rating1;
    span2.innerText = res.data[0].rating2;
    span3.innerText = res.data[0].rating3;
    span4.innerText = res.data[0].rating4;
    span5.innerText = res.data[0].rating5;
  });
  axios
    .get(apiUrl)
    .then((response) => {
      response.data.forEach((expense) => {
        const newLi = document.createElement("li");
        newLi.classList.add("list-group-item");
        newLi.innerHTML = `
                    <div>
                        <span><strong>Category:</strong> ${expense.name},</span>
                        <span><strong>Rating:</strong> ${expense.rating},</span>
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-danger delete-btn">Delete</button>
                            <button type="button" class="btn btn-primary edit-btn">Edit</button>
                        </div>
                    </div>
                `;

        newLi
          .querySelector(".delete-btn")
          .addEventListener("click", function () {
            obj2 = {
              rating1: expense.rating === "1" ? obj2.rating1 - 1 : obj2.rating1,
              rating2: expense.rating === "2" ? obj2.rating2 - 1 : obj2.rating2,
              rating3: expense.rating === "3" ? obj2.rating3 - 1 : obj2.rating3,
              rating4: expense.rating === "4" ? obj2.rating4 - 1 : obj2.rating4,
              rating5: expense.rating === "5" ? obj2.rating5 - 1 : obj2.rating5,
            };
            axios
              .put(apiUrl2 + "/65cd37ad6227a803e824c6e8", obj2)
              .then(() => {
                fetchAndRenderExpenses();
              })
              .catch((error) => {
                console.error("Error updating ratings:", error);
              });
            deleteExpense(expense._id);
          });

        newLi.querySelector(".edit-btn").addEventListener("click", function () {
          document.querySelector("#name").value = expense.name;
          document.querySelector("#rating").value = expense.rating;
          obj2 = {
            rating1: expense.rating === "1" ? obj2.rating1 - 1 : obj2.rating1,
            rating2: expense.rating === "2" ? obj2.rating2 - 1 : obj2.rating2,
            rating3: expense.rating === "3" ? obj2.rating3 - 1 : obj2.rating3,
            rating4: expense.rating === "4" ? obj2.rating4 - 1 : obj2.rating4,
            rating5: expense.rating === "5" ? obj2.rating5 - 1 : obj2.rating5,
          };
          axios
            .put(apiUrl2 + "/65cd37ad6227a803e824c6e8", obj2)
            .then(() => {
              fetchAndRenderExpenses();
            })
            .catch((error) => {
              console.error("Error updating ratings:", error);
            });
          deleteExpense(expense._id);
        });

        ul.appendChild(newLi);
      });
    })
    .catch((error) => {
      console.error("Error fetching expenses:", error);
    });
}

function deleteExpense(id) {
  axios
    .delete(`${apiUrl}/${id}`)
    .then((response) => {
      fetchAndRenderExpenses();
    })
    .catch((error) => {
      console.error("Error deleting expense:", error);
    });
}

fetchAndRenderExpenses();
