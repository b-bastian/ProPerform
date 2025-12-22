import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";
import ItalicText from "../../../components/docs/ItalicText";
import Label from "../../../components/Label";
import ListBlock from "../../../components/docs/ListBlock";

export default function GetUsers() {
  return (
    <div className="px-6 py-8">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <code>GET /users/get/:role?</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>

      <Text>
        This endpoint returns users from the system. The optional{" "}
        <ItalicText>role</ItalicText> parameter can be used to filter users by
        role. If no role or <ItalicText>all</ItalicText> is provided, all users
        are returned.
      </Text>

      <Heading>Available Roles</Heading>

      <ListBlock
        items={[
          {
            label: "owners",
            description: "Returns only users with the owner role",
          },
          {
            label: "users",
            description: "Returns only users with the user role",
          },
          {
            label: "trainers",
            description: "Returns only users with the trainer role",
          },
          {
            label: "left empty",
            description: "Returns all users without role filtering",
          },
        ]}
      />

      <Heading>Example Requests</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

// all users
fetch("https://api.properform.app/users/get", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});

// only trainers
fetch("https://api.properform.app/users/get/trainers", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "counts": {
    "owners": 3,
    "users": 12,
    "trainers": 4,
    "all": 19
  },
  "users": [
    {
      "uid": 7,
      "firstname": "Lena",
      "birthdate": "1996-04-18",
      "email": "lena@gmail.com",
      "role_id": 3
    }
  ]
}`}
      />
    </div>
  );
}
