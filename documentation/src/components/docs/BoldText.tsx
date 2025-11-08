type TextProps = {
  children: React.ReactNode;
};

export default function Text({ children }: TextProps) {
  return (
    <p className="text-base leading-relaxed text-gray-300 mb-3 font-bold">
      {children}
    </p>
  );
}
