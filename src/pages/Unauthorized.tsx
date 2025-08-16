import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1>Your are Not Authorized person.</h1>
      <Button>
        <Link to="/">Go To Home</Link>
      </Button>
    </div>
  );
}
