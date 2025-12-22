type ListBlockItem = {
  label: string;
  description?: string;
};

type ListBlockProps = {
  title?: string;
  items: ListBlockItem[];
};

export default function ListBlock({ title, items }: ListBlockProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 my-4 shadow-lg">
      {title && (
        <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
          {title}
        </h3>
      )}

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span className="text-indigo-400 font-mono text-sm select-none">
              {index + 1}.
            </span>

            <div>
              <span className="text-gray-100 font-medium">{item.label}</span>
              {item.description && (
                <p className="text-gray-400 text-sm">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
