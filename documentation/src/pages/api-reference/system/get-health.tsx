import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetHealth() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /system/health</code>
        <Label text="Public route" color="#10B981" />
      </div>

      <Text>
        Quick health check endpoint that returns a simple status response.
        Useful for monitoring and load balancers.
      </Text>

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok"
}`}
      />
    </div>
  );
}
