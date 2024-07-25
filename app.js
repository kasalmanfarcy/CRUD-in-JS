document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');
    const firstname = document.querySelector('#firstname');
    const lastname = document.querySelector('#lastname');
    const email = document.querySelector('#email');
    const userTable = document.querySelector('#userTable tbody');
    let users = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateInputs()) {
            addUser();
            resetForm();
        }
    });

    function validateInputs() {
        const firstnameVal = firstname.value.trim();
        const lastnameVal = lastname.value.trim();
        const emailVal = email.value.trim();
        let success = true;

        if (firstnameVal === '') {
            success = false;
            setError(firstname, 'Firstname is required');
        } else {
            setSuccess(firstname);
        }

        if (lastnameVal === '') {
            success = false;
            setError(lastname, 'Lastname is required');
        } else {
            setSuccess(lastname);
        }

        if (emailVal === '') {
            success = false;
            setError(email, 'Email is required');
        } else if (!validateEmail(emailVal)) {
            success = false;
            setError(email, 'Please enter a valid email');
        } else {
            setSuccess(email);
        }

        return success;
    }

    function setError(element, message) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = message;
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    }

    function setSuccess(element) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = '';
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function addUser() {
        const user = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value
        };
        users.push(user);
        renderTable();
    }

    function renderTable() {
        userTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td class="actions">
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    window.editUser = function (index) {
        const user = users[index];
        firstname.value = user.firstname;
        lastname.value = user.lastname;
        email.value = user.email;
        form.onsubmit = (e) => {
            e.preventDefault();
            if (validateInputs()) {
                updateUser(index);
                form.onsubmit = onFormSubmit;
                resetForm();
            }
        };
    }

    window.deleteUser = function (index) {
        users.splice(index, 1);
        renderTable();
    }

    function updateUser(index) {
        users[index] = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value
        };
        renderTable();
    }

    function resetForm() {
        firstname.value = '';
        lastname.value = '';
        email.value = '';
        form.classList.remove('success');
        form.classList.remove('error');
    }
});
