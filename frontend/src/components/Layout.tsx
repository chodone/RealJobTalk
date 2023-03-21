import React from "react";
import NavBar from "@components/Navbar";
import Mobilenavbar from "@components/Mobilenavbar"

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <div className="w-full p-0">
      <NavBar />
      {props.children}
      <Mobilenavbar />
    </div>
  );
}

