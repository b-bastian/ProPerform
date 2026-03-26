import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostTrainersConnect() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /trainers/connect</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Connects an authenticated user to a trainer using an invite code. Only
        users (role_id: 2) can use this endpoint. Each user can only connect to
        one trainer at a time. Rate limited to 5 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "invite_code": "ABC123XYZ"
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`invite_code (string, required) - trainer invite code`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "trainer connected successfully.",
  "trainer": {
    "tid": 5,
    "firstname": "Jane",
    "lastname": "Smith"
  }
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing invite code (400)
{
  "error": "invite code is required."
}

// Invalid invite code (400)
{
  "error": "invalid invite code."
}

// User already connected (409)
{
  "error": "user already connected to a trainer."
}

// Server error (500)
{
  "error": "internal server error."
}`}
      />

      <Heading>Important Notes</Heading>
      <Text>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            Invite codes are provided by trainers and are unique to each trainer
          </li>
          <li>A user can only be connected to one trainer at a time</li>
          <li>The trainer must have generated an invite code first</li>
          <li>Rate limited to 5 requests per 15 minutes to prevent abuse</li>
          <li>Only available to users; trainers cannot use this endpoint</li>
        </ul>
      </Text>
    </div>
  );
}
