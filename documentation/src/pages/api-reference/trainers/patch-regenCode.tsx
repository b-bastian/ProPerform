import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function RegenerateCode() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>PATCH /trainers/:id/regenerateCode</code>
          <Label text="Public route" color="#60A5FA" />
        </div>
      </div>

      <Text>
        This endpoint regenerates a new invite code for a specific trainer ID.
      </Text>

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`fetch("https://api.properform.app/trainers/12/regenerateCode", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Einladungscode erfolgreich aktualisiert.",
  "newCode": "TRN-12940"
}`}
      />
    </div>
  );
}
