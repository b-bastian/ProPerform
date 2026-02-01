import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function CheckVerificationCode() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/check-verification-code</code>
        <Label text="Public route" color="#22C55E" />
      </div>

      <Text>
        Verifies an email confirmation code that was sent to the user during
        registration. The code is time-limited and securely validated.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "user@example.com",
  "code": "123456"
}`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Verifikationscode gültig"
}`}
      />
    </div>
  );
}
