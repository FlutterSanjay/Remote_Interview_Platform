import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { toast } from "react-toastify";

const HomePage = () => {
  return (
    <div>
      <button
        className="py-4 px-5 bg-red-500 text-white"
        onClick={() => toast.success("Welcome to Talent IQ")}
      >
        Click Me
      </button>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default HomePage;
