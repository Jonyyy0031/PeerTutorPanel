import { useState, useMemo } from 'react';

interface UseSearchProps<T> {
  items: T[];
  searchableFields?: (keyof T)[];
}

export const useSearch = <T extends Record<string, any>>({
  items,
  searchableFields
}: UseSearchProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    return items.filter((item) => {
      if (searchableFields) {
        return searchableFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      return Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [items, searchTerm, searchableFields]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return {
    searchTerm,
    filteredItems,
    handleSearch,
  };
};