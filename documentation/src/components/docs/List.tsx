type ListProps = {
  ordered?: boolean; // true = listed | false = not listed
  items: string[];
};

export default function List({ ordered = false, items }: ListProps) {
  if (ordered) {
    return (
      <ol className="list-decimal list-inside text-sm text-gray-300 mb-4 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    );
  }

  return (
    <ul className="list-disc list-inside text-sm text-gray-300 mb-4 space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
