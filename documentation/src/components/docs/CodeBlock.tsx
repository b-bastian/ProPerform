import { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";

type CodeBlockProps = {
  code: string;
  language?: string;
};

export default function CodeBlock({ code, language = "txt" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative bg-gray-900 border border-gray-700 rounded-lg p-4 my-4 shadow-lg">
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 text-gray-400 hover:text-white transition cursor-pointer"
      >
        {copied ? <Check size={18} /> : <ClipboardCopy size={18} />}
      </button>

      <pre className="overflow-x-auto text-sm text-gray-200">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
