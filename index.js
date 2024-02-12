

    const form=document.querySelector('form')
    const ul=document.createElement('ul')
    function handleFormSubmit(event){
        event.preventDefault();
        const username=document.querySelector('#username').value
        const email=document.querySelector('#email').value
        const phone=document.querySelector('#phone').value
        let User_details={
          username,email,phone
        }

        localStorage.setItem(User_details.username,JSON.stringify(User_details))

        const newLi=document.createElement('li')
        newLi.textContent = `Username: ${username}, Email: ${email}, Phone: ${phone}`;
        const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        ul.removeChild(newLi);
        localStorage.removeItem('User_details')
    });
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        document.querySelector('#username').value = username;
        document.querySelector('#email').value = email;
        document.querySelector('#phone').value = phone;
        ul.removeChild(newLi);
    });
    
    newLi.appendChild(editButton);
    
    newLi.appendChild(deleteButton);
        ul.appendChild(newLi)
        document.body.appendChild(ul)
       
    }