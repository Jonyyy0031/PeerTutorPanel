import React from "react";

type CardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
};

export function Card({ title, value, description, icon: Icon }: CardProps) {
  return (
    <div className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-primary-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-text-dark">{title}</h3>
        <span className="p-3 bg-primary-50 rounded-lg">
          <Icon className="h-6 w-6 text-primary-600" />
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-bold text-primary-600">{value}</div>
        <p className="text-text-light text-sm">{description}</p>
      </div>
    </div>
  );
}
