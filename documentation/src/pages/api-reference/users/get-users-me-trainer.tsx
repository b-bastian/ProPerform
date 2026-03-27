import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetUsersMeTrainer() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /users/me/trainer</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns information about the authenticated user's assigned trainer.
        Only returns data if the user is currently connected to a trainer.
        Requires authentication.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "tid": 5,
  "firstname": "Jane",
  "lastname": "Smith",
  "phone_number": "+1234567890"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// No trainer assigned (404)
{
  "message": "no trainer found for this user."
}

// Server error (500)
{
  "message": "failed to fetch trainer."
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        This endpoint returns the trainer associated with the authenticated
        user. If the user has not connected to a trainer, a 404 response is
        returned. Only trainer profile information is returned, not training
        plan or athlete data.
      </Text>
    </div>
  );
}
