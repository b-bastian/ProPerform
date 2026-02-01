import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function TrainerLogin() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/trainers/login</code>
        <Label text="Public route" color="#22C55E" />
      </div>

      <Text>
        Logs in a trainer account. On success, a JWT token is returned
        containing the trainer role. This token is required for accessing
        protected trainer routes.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "trainer@example.com",
  "password": "SecurePassword123!"
}`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Login erfolgreich",
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "tid": 5
}`}
      />
    </div>
  );
}
