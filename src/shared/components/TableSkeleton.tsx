import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 px-6 py-4 border-b border-gray-200">
          {[...Array(columns)].map((_, colIndex) => (
            <div key={colIndex} className="flex-1">
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;