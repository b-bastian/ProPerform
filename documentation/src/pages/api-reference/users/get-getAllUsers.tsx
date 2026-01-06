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
          <code>GET /users/:role?</code>
          <Label text="Protected route" color="#F87171" />
        </div>
      </div>

      <Text>
        This endpoint returns users from the system. The optional{" "}
        <ItalicText>role</ItalicText> parameter can be used to filter users by
        role. If the parameter is omitted, users of all roles are returned.
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
            label: "(omitted)",
            description: "Returns users of all roles",
          },
        ]}
      />

      <Heading>Example Requests</Heading>
      <CodeBlock
        language="javascript"
        code={`const token = localStorage.getItem("token");

// all users
fetch("https://api.properform.app/users", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});

// only trainers
fetch("https://api.properform.app/users/trainers", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});`}
      />

      <Heading>Example Response</Heading>
      <CodeBlock
        language="json"
        code={`{
  "count": 3,
  "users": [
    {
      "uid": 7,
      "firstname": "Lena",
      "birthdate": "1996-04-18",
      "email": "lena@gmail.com",
      "role_id": 2,
      "type": "user"
    },
    {
      "tid": 4,
      "firstname": "Mark",
      "lastname": "Huber",
      "birthdate": "1990-11-02",
      "email": "mark@gmail.com",
      "phone_number": "+436641234567",
      "type": "trainer",
      "source": "trainers"
    }
  ]
}`}
      />
    </div>
  );
}
