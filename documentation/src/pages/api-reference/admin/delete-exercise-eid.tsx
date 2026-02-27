import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function DeleteExercisesEid() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>DELETE /admin/exercises/:eid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Deletes an exercise by ID. Requires authentication and the{" "}
        <code>owner</code> role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>URL Parameters</Heading>
      <CodeBlock
        language="text"
        code={`eid: number - The exercise ID to delete`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "message": "exercise with id 42 deleted"
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Invalid exercise ID (400)
{
  "error": "invalid exercise id"
}

// Exercise not found (404)
{
  "error": "exercise not found"
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Forbidden - not owner (403)
{
  "error": "Forbidden"
}

// Server error (500)
{
  "error": "internal server error"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        The requester must be authenticated and have the <code>owner</code>{" "}
        role.
      </Text>
    </div>
  );
}
