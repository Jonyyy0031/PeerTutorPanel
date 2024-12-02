import { useState, ChangeEvent } from 'react';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

type FormEvent = | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;

export function useForm<T extends Record<string, any>>(
  initialState: T,
  validationRules: ValidationRules<T>
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (
    e: FormEvent | { target: { name: keyof T; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (validationRules[name]) {
      const error = validationRules[name]!(value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const isValid = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validationRules[key as keyof T]!(formData[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    formData,
    errors,
    handleChange,
    setFormData,
    isValid,
  };
}