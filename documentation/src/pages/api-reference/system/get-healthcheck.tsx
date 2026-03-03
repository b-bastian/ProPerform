import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import Label from "../../../components/Label";

export default function GetHealthcheck() {
  return (
    <div className="px-6 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <code>GET /system/healthcheck</code>
        <Label text="Protected route" color="#F59E0B" />
      </div>

      <Text>
        Comprehensive system health check endpoint. Returns detailed information
        about CPU, RAM, disk space, database status, and Node.js process
        metrics. Requires authentication and the <code>owner</code> role.
      </Text>

      <Heading>Authorization Header</Heading>
      <CodeBlock language="http" code={`Authorization: Bearer <JWT_TOKEN>`} />

      <Heading>Success Response (200)</Heading>
      <CodeBlock
        language="json"
        code={`{
  "status": "ok",
  "response_time_ms": 42,
  "timestamp": "2024-02-27T10:30:00.000Z",
  "database": "connected",
  "system": {
    "platform": "linux",
    "arch": "x64",
    "hostname": "server-01",
    "uptime_s": 864000,
    "cpu_cores": 8,
    "cpu_load": "2.45",
    "memory": {
      "total_gb": "16.00",
      "used_percent": "45.3"
    },
    "disk": {
      "root": "/",
      "total_gb": "100.50",
      "available_gb": "45.20",
      "used_percent": "55%"
    }
  },
  "process": {
    "pid": 1234,
    "node_version": "v18.17.0",
    "memory_mb": "256.5",
    "uptime_s": 432000
  }
}`}
      />

      <Heading>Error Response</Heading>
      <CodeBlock
        language="json"
        code={`// Database disconnected
{
  "status": "error",
  "response_time_ms": 15,
  "timestamp": "2024-02-27T10:30:00.000Z",
  "database": "error",
  "system": {...},
  "process": {...}
}`}
      />

      <Heading>Requirements</Heading>
      <Text>
        The requester must be authenticated and have the <code>owner</code> role
        (role_id: 1).
      </Text>
    </div>
  );
}
