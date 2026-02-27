import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function PostTrainersLinkAthlete() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>POST /trainers/:tid/link-athlete</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Links an athlete to a trainer using the trainer's invite code. Once
        linked, the trainer can view and manage the athlete's training data.
        Rate limited to 5 requests per 15 minutes.
      </Text>

      <Heading>URL Parameters</Heading>
      <CodeBlock language="text" code={`tid: number - The trainer ID`} />

      <Heading>Request Body</Heading>
      <CodeBlock
        language="json"
        code={`{
  "invite_code": "TRN-ABC123DEF456",
  "athlete_id": 42
}`}
      />

      <Heading>Field Requirements</Heading>
      <CodeBlock
        language="text"
        code={`invite_code  (string, required, non-empty)
athlete_id   (number, required)`}
      />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "message": "Athlet erfolgreich mit Trainer verknüpft.",
  "trainer_id": 5
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// Missing fields (400)
{
  "error": "Einladungscode fehlt."
}

// Missing athlete ID (400)
{
  "error": "Athleten-ID fehlt."
}

// Invalid invite code (404)
{
  "error": "Ungültiger Einladungscode."
}

// Athlete already linked (409)
{
  "error": "Athlet ist bereits einem Trainer zugewiesen."
}

// Server error (500)
{
  "error": "Interner Serverfehler."
}`}
      />

      <Heading>Notes</Heading>
      <Text>
        An athlete can only be linked to one trainer at a time. The invite code
        must be valid and belong to an existing trainer.
      </Text>
    </div>
  );
}
