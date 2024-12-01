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

export const validateGroup = (group: string): boolean => {
    const re = /^[0-9]{2}[A-Z]{2}$/;
    return re.test(group);
}

const validateDepartment = (department: string): boolean => {
    const re = /^[a-zA-Z0-9\s]+$/;
    return re.test(department);
}

export { validateEmail, validatePhone, validateName, validateNameWithNumbers, validateDepartment };