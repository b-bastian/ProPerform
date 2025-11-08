import Heading from "../../../components/docs/Heading";
import Text from "../../../components/docs/Text";
import CodeBlock from "../../../components/docs/CodeBlock";

export default function CreateUser() {
  return (
    <div className="px-6 py-8">
      <Heading>
        <code>POST /users/createUser</code>
      </Heading>
      <Text>
        This endpoint allows you to create a new user in the system. You need to
        provide the necessary user information in the request body.
      </Text>

      <Heading>1. Prepare the Request</Heading>
      <Text>
        To create a new user, you need to send a POST request to the{" "}
        <code>/users/createUser</code> endpoint with the user information in the
        request body.
      </Text>
      <CodeBlock
        language="json"
        code={
          'await fetch("https://api.yourdomain.com/users/createUser", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization'
        }
      />

      <Heading>2. Install Dependencies</Heading>
      <Text>
        Install all required dependencies using npm or yarn. The installation
        may take a moment depending on your connection.
      </Text>
      <CodeBlock
        language="bash"
        code={`npm install
# or
yarn install`}
      />

      <Heading>3. Start the Development Server</Heading>
      <Text>
        After installing the dependencies, start the development server.
      </Text>
      <CodeBlock
        language="bash"
        code={`npm run dev
# or
yarn dev`}
      />

      <Heading>4. Project Structure Overview</Heading>
      <Text>
        Below is a simplified version of the project folder structure to help
        you understand where the main files are located.
      </Text>
      <CodeBlock
        language="txt"
        code={`src/
 ├─ components/
 │   ├─ Heading.tsx
 │   ├─ Text.tsx
 │   └─ CodeBlock.tsx
 ├─ pages/
 │   └─ GettingStarted.tsx
 ├─ data/
 │   └─ navigation.ts
 └─ App.tsx`}
      />

      <Heading>5. Start Building</Heading>
      <Text>
        You are now ready to start building your documentation or application.
        Add new pages inside the <code>pages/</code> directory and link them
        using the navigation configuration inside <code>navigation.ts</code>.
      </Text>
    </div>
  );
}
