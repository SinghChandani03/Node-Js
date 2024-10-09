// login form Validation function

export const login_validation = (name, value) => {
    const emailInput = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const passwordInput = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (name === 'email') {
        return (!value.match(emailInput) ? 'Enter a valid email' : '');
    } else if (name === 'password') {
        return (!value.match(passwordInput) ? 'Password must be at least 8 characters long' : '');
    } else {
        return '';
    }
};

 // sign up form Validation function

 export const signup_validation = (name, value) => {

    const emailInput = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const passwordInput = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameInput = /^\s*(.{5,10})\s*$/;

    if (name === 'name') {
        return (!value.match(nameInput) ? 'First Name must be at least 5 characters long' : '');
    }
    else if (name === 'email') {
        return (!value.match(emailInput) ? 'Enter a valid email' : '');
    }
    else if (name === 'password') {
        return (!value.match(passwordInput) ? 'Password must be at least 8 characters long like - Abc@1214455' : '');
    }
    return '';
};

//Project form validation function

export const isValidDate = (dateString) => {
    // Regular expression to match YYYY-MM-DD format
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(dateFormat)) {
        return false;
    }
    // Parse the date and check if it's valid
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
        return false;
    }
    return true;
};

export const isDateInPast = (dateString) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    return selectedDate < currentDate;
};

export const project_validation = (name, value) => {
    const idInput = /^(\d{6})$/;
    const titleInput = /^\s*(.{5,30})\s*$/;
    const descInput = /^\s*(.{10,100})\s*$/;

    if (name === 'pid') {
        return (!String(value).match(idInput)) ? 'Enter a 6-digit valid ID' : '';
    } 
    else if (name === 'title') 
    {
        return (!value.match(titleInput)) ? 'Title must be between 5 to 30 characters' : '';
    } 
    else if (name === 'status') 
    {
        return (!value) ? 'Select at least one status value' : '';
    } 
    else if (name === 'description') 
    {
        return (!value.match(descInput)) ? 'Enter description between 10 to 100 characters' : '';
    } 
    else if (name === 'due_date') 
    {
        if (!isValidDate(value)) {
            return 'Select a valid date';
        }
        if (isDateInPast(value)) {
            return 'Please select an end date that is not in the past';
        }
    }
    return '';
};


