import { SignInButton } from "@clerk/clerk-react";

const App = () => {
  return (
    <>
      <h1>Welcome to App</h1>
      <SignInButton mode="modal" />
    </>
  );
};

export default App;
