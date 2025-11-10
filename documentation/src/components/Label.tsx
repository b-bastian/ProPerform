interface LabelProps {
  text: string;
  color?: string;
}

export default function Label({ text, color = "#3B82F6" }: LabelProps) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {text}
    </span>
  );
}
