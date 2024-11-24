const validatePhone = (phone: string) => {
    const re = /^\d{3}-\d{3}-\d{4}$/;
    return re.test(phone);
};

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateName = (name: string): boolean => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
}

const validateNameWithNumbers = (name: string): boolean => {
    const re = /^[a-zA-Z0-9\s]+$/;
    return re.test(name);
}

const validateDepartment = (department: string): boolean => {
    const re = /^[a-zA-Z0-9\s]+$/;
    return re.test(department);
}

export { validateEmail, validatePhone, validateName, validateNameWithNumbers, validateDepartment };