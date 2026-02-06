import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function DeleteExercise() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>DELETE /exercises/:eid</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Deletes an exercise by its ID. Requires authentication and the
        <code>owner</code> role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="http"
        code={`DELETE /exercises/12
Authorization: Bearer <JWT_TOKEN>`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "message": "exercise with id 12 deleted"
}`}
      />
    </div>
  );
}
