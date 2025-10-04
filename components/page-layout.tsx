import { PropsWithChildren } from "react";

const PageLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col p-4 gap-4 max-w-md mx-auto min-h-full border-x">
      {props.children}
    </div>
  );
};

export default PageLayout;
