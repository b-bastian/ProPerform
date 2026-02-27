import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import ItalicText from "../../../components/docs/ItalicText";
import Label from "../../../components/Label";

export default function GetMe() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>GET users/me</code>
          <Label text="Protected route" color="#F87171" />
          <Label text="Rate limited" color="#F59E0B" />
        </div>
      </div>

      <Text>
        Returns the authenticated user's complete profile information. Requires
        a valid JWT token in the <ItalicText>Authorization</ItalicText> header.
        This endpoint is limited to 10 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Example Request</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

fetch("https://api.properform.app/me", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "uid": 12,
  "firstname": "Max",
  "birthdate": "1998-05-14",
  "email": "user@example.com",
  "weight": 82,
  "height": 180,
  "gender": "male",
  "profile_image_url": "https://example.com/profile.jpg",
  "onboarding_completed": true,
  "fitness_level": "intermediate",
  "training_frequency": 3,
  "primary_goal": "muscle_gain",
  "role_id": 2,
  "last_login": "2026-02-20T18:25:43.000Z",
  "created_at": "2026-01-10T12:00:00.000Z",
  "updated_at": "2026-02-20T18:25:43.000Z",
  "email_verified": true
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// 401 – Unauthorized (missing or invalid token)
{
  "error": "Unauthorized"
}

// 404 – User not found
{
  "error": "User nicht gefunden"
}

// 429 – Too many requests (rate limit exceeded)
{
  "error": "Too many requests"
}

// 500 – Server error
{
  "message": "Serverfehler",
  "error": "Detailed error message"
}`}
      />
    </div>
  );
}
