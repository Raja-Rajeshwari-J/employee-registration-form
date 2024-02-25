const form = document.querySelector('form');

const showError = (field, errorMsg) =>{
    field.classList.add('error');
    const errorElement = document.createElement('small');
    errorElement.classList.add('error-text');
    errorElement.innerHTML = errorMsg;
    field.closest('.input-box').appendChild(errorElement);
}

const handleFormData = (e) =>{
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const idInput = document.getElementById('empID');
    const deptInput = document.getElementById('dept');
    const dobInput = document.getElementById('dob');
    const genderInput = document.querySelectorAll('input[name="gender"]');
    const designationInput = document.getElementById('designation');
    const salaryInput = document.getElementById('salary');

    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    const dept = deptInput.value;
    const dob = dobInput.value;
    let gender = '';
    genderInput.forEach(input =>{
        if(input.checked){
            gender = input.value;
        }
    });
    const designation = designationInput.value.trim();
    const salary = salaryInput.value.trim();

    document.querySelectorAll('.input-box .error').forEach(field => field.classList.remove('error'));
    document.querySelectorAll('.error-text').forEach(errorMsg => errorMsg.remove());

    if(name === ""){
        showError(nameInput, "Enter your full name");
    } else if(name.length > 30){
        showError(nameInput, "name should be maximum of 30 characters");
    }
    if(id === ""){
        showError(idInput, "Enter your ID");
    }
    if(dept === "" || dept === "Select your department"){
        showError(deptInput, "Select your department");
    }
    if(dob === ""){
        showError(dobInput, "Select your date of birth");
    }
    if(gender === "" || gender == null ){
        showError(document.getElementById('gender'), "Select your gender");
    }
    if(designation === ""){
        showError(designationInput, "Enter your designation");
    }
    if(salary === ""){
        showError(salaryInput, "Enter your salary");
    } else if(salary.length > 8){
        showError(salaryInput, "salary should be maximum of 8 digits");
    }

    const errorInputs = document.querySelectorAll('.input-box .error');
    if(errorInputs.length > 0) return;
    form.submit();
}
form.addEventListener('submit', handleFormData);