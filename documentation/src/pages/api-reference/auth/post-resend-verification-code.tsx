import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostResendVerificationCode() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/resend-verification-code</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Resends the email verification code if the original email was not
        received or the code expired. Can only be used for unverified accounts.
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
  "message": "verification code resent."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing email (400)
{
  "error": "email is required."
}

// Email already verified (400)
{
  "error": "email already verified."
}

// Account doesn't exist - returns success for privacy (200)
{
  "message": "if the account exists, a verification email was sent."
}

// Server error (500)
{
  "error": "failed to resend verification code."
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        Returns a success response even if the account doesn't exist for
        security/privacy reasons. This prevents email enumeration attacks.
      </Text>
    </div>
  );
}
