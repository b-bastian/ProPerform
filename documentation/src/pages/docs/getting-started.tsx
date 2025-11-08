import Heading from "../../components/docs/Heading";
import Text from "../../components/docs/Text";
import CodeBlock from "../../components/docs/CodeBlock";

export default function GettingStarted() {
  return (
    <div className="px-6 py-8">
      <Heading>Getting Started</Heading>
      <Text>
        This guide helps you set up the project locally and explains the basic
        requirements. Make sure that Node.js and Git are installed on your
        system before continuing.
      </Text>

      <Heading>1. Clone the Repository</Heading>
      <Text>
        First, clone the main project repository to your local machine.
      </Text>
      <CodeBlock
        language="bash"
        code={`git clone https://github.com/your-username/your-repository.git
cd your-repository`}
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
