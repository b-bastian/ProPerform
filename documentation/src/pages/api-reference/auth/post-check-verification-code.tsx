import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostCheckVerificationCode() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /auth/check-verification-code</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Validates the verification code sent to the user's email during
        registration. Marks the email as verified if the code is correct and not
        expired.
      </Text>

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "email": "john@example.com",
  "code": "123456"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`email  (string, required)
code   (string, required, 6-digit code from email)`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "verification code valid."
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing fields (400)
{
  "error": "email and code are required."
}

// User not found (404)
{
  "error": "user not found."
}

// Email already verified (400)
{
  "error": "email already verified."
}

// Code expired (401)
{
  "error": "verification code expired."
}

// Invalid code (401)
{
  "error": "invalid or expired verification code."
}

// Server error (500)
{
  "message": "verification check failed.",
  "error": "error details"
}`}
      />

      <Heading>Code Expiration</Heading>
      <Text>
        Verification codes are valid for 15 minutes after account creation or
        resend.
      </Text>
    </div>
  );
}
