type TextProps = {
  children: React.ReactNode;
};

export default function ItalicText({ children }: TextProps) {
  return (
    <p className="text-base leading-relaxed text-gray-300 mb-3 italic inline">
      {children}
    </p>
  );
}
