import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostResetPassword() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/reset-password</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Initiates the password reset process by sending a reset link via email.
        The reset token is valid for 15 minutes. Returns a generic success
        message for privacy.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "john@example.com"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock language="text" code={`email  (string, required)`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "If an account exists, a reset email has been sent."
}`}
      />

      <Heading>Error Response</Heading>
      <CodeBlock
        language="json"
        code={`// Missing email (400)
{
  "error": "email required."
}

// Server error (500)
{
  "error": "failed to send reset email.",
  "details": "error message"
}`}
      />

      <Heading>Reset Link Format</Heading>
      <Text>
        The reset link is sent in the format:
        <code>https://account.properform.app/reset-password/*token*</code>
      </Text>

      <Heading>Token Expiration</Heading>
      <Text>Reset tokens are valid for 15 minutes from creation.</Text>
    </div>
  );
}
