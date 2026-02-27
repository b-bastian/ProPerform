import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetUsersMe() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /users/me</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns the authenticated user's complete profile information. Requires
        authentication. Rate limited to 10 requests per 15 minutes.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "uid": 42,
  "firstname": "John",
  "birthdate": "1990-05-15",
  "email": "john@example.com",
  "weight": 75,
  "height": 180,
  "gender": "male",
  "profile_image_url": "https://media.properform.app/images/profile.jpg",
  "onboarding_completed": true,
  "fitness_level": "intermediate",
  "training_frequency": 4,
  "primary_goal": "muscle_gain",
  "role_id": 2,
  "last_login": "2024-02-27T10:30:00Z",
  "created_at": "2024-01-15T08:00:00Z",
  "updated_at": "2024-02-20T14:45:00Z",
  "email_verified": true
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// User not found (404)
{
  "error": "User nicht gefunden"
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}

// Server error (500)
{
  "message": "Serverfehler",
  "error": "error details"
}`}
      />

      <Heading>Requirements</Heading>
      <Text>Requires authentication.</Text>
    </div>
  );
}
