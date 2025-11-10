import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import List from "../../../components/docs/List";
import Label from "../../../components/Label";

export default function LinkAthlete() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>POST /trainers/link-athlete</code>
          <Label text="Public route" color="#60A5FA" />
        </div>
      </div>

      <Text>
        This endpoint links an athlete to a trainer using an invite code.
      </Text>

      <Heading>Request Body</Heading>
      <List
        items={[
          "invite_code (string): Invite code provided by the trainer. e.g. 'TRN-40234'.",
          "athlete_id (number): Unique ID of the athlete to link. e.g. 15.",
        ]}
      />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`fetch("https://api.properform.app/trainers/link-athlete", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    invite_code: "TRN-40234",
    athlete_id: 15
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Athlet erfolgreich mit Trainer verknüpft."
}`}
      />
    </div>
  );
}
