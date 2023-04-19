import { ReactElement } from "react";

export default function Page() {
  return (
    <div>
      <h1>No Layout Page</h1>
    </div>
  );
}

Page.getLayout = (page: ReactElement) => page;
