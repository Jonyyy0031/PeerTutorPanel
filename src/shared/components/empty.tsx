import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="min-h-[50dvh]  content-center py-12 px-4">
      <div className="text-center">
        <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{message}</p>
        {action && (
          <div className="mt-6">
            <button
              onClick={action.onClick}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5C0000] hover:bg-red-900"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
