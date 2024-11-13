import { ArrowUpRight } from 'lucide-react';

interface CardStatProps {
  title: string;
  value: number;
  description: string;
  className?: string;
}

export function CardStat({ title, value, description, className = '' }: CardStatProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-primary-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary-700 text-sm font-medium">{title}</h3>
        <span className="p-2 bg-primary-50 rounded-xl">
          <ArrowUpRight className="w-4 h-4 text-primary-700" />
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-neutral-dark">{value}</span>
        </div>
          <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}