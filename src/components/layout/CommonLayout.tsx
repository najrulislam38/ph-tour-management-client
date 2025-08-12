import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

// ReactElement just only represents JSX, JSX element or content and ReactNode passing all node, sting, number, boolean, Promise

interface IProps {
  //   children: ReactElement;
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
