const form = document.querySelector('form');
const ul = document.querySelector('ul');

function handleFormSubmit(event) {
    event.preventDefault();
    const category = document.querySelector('#category').value;
    const expense = document.querySelector('#expense').value;
    const description = document.querySelector('#description').value;
    let User_details = {
        category,
        expense,
        description
    };

    localStorage.setItem(category, JSON.stringify(User_details));


    const newLi = document.createElement('li');
    newLi.classList.add('list-group-item');
    newLi.innerHTML = `
        <div>
            <span><strong>category:</strong> ${category},</span>
            <span><strong>expense:</strong> ${expense},</span>
            <span><strong>description:</strong> ${description}</span>
             <div class="btn-group" role="group">
            <button type="button" class="btn btn-danger delete-btn">Delete</button>
            <button type="button" class="btn btn-primary edit-btn">Edit</button>
        </div>
        </div>
       
    `;

    newLi.querySelector('.delete-btn').addEventListener('click', function() {
        ul.removeChild(newLi);
        localStorage.removeItem(category);
    });

    newLi.querySelector('.edit-btn').addEventListener('click', function() {
        document.querySelector('#category').value = category;
        document.querySelector('#expense').value = expense;
        document.querySelector('#description').value = description;
        ul.removeChild(newLi);
    });

    ul.appendChild(newLi);
}
    