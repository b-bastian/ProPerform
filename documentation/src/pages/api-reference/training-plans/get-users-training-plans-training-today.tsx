import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetUsersTrainingPlansTrainingToday() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /users/training-plans/training/today</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Returns today's training exercises for the authenticated user's active
        and selected training plan. Automatically calculates the current week
        and day based on the training plan start date and returns all exercises
        scheduled for today. Requires authentication.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "plan": {
    "tpid": 12,
    "start_date": "2024-03-01"
  },
  "current_week": 4,
  "current_day": 2,
  "exercises": [
    {
      "id": 1,
      "tpid": 12,
      "eid": 5,
      "week_number": 4,
      "day_number": 2,
      "exercise_order": 1,
      "sets": 3,
      "reps": 10,
      "duration_minutes": null,
      "rest_seconds": 60,
      "notes": "keep form tight",
      "name": "Bench Press",
      "description": "Upper body pressing exercise"
    },
    {
      "id": 2,
      "tpid": 12,
      "eid": 8,
      "week_number": 4,
      "day_number": 2,
      "exercise_order": 2,
      "sets": 4,
      "reps": 8,
      "duration_minutes": null,
      "rest_seconds": 90,
      "notes": "heavy weight",
      "name": "Barbell Squat",
      "description": "Lower body compound movement"
    }
  ]
}`}
      />

      <Heading>Error Responses</Heading>
      <CodeBlock
        language="json"
        code={`// No active training plan (404)
{
  "message": "no active training plan found"
}

// Server error (500)
{
  "message": "failed to fetch today's training",
  "error": "error details"
}

// Unauthorized (401)
{
  "error": "Unauthorized"
}`}
      />

      <Heading>Key Information</Heading>
      <Text>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            Calculates current week and day automatically based on training plan
            start date
          </li>
          <li>Only returns exercises from the active and selected plan</li>
          <li>Exercises are ordered by exercise_order</li>
          <li>
            Returns null for duration_minutes if rest time is used instead
          </li>
          <li>Useful for daily workout tracking and workout history</li>
        </ul>
      </Text>
    </div>
  );
}
