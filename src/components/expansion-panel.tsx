import React from "react";
import { ChevronDown } from "lucide-react";

interface ExpansionPanelsProps {
  title: string;
  preIcon?: React.ReactElement;
  children: React.ReactNode;
}

export function ExpansionPanel({
  title,
  preIcon,
  children,
}: ExpansionPanelsProps): React.JSX.Element {
  const [showContent, setShowContent] = React.useState<boolean>(true);

  const buttonId = React.useId();
  const panelId = React.useId();

  return (
    <article>
      <header className="flex justify-between pt-4">
        <div className="flex items-center gap-2">
          {preIcon}
          <h3 className="font-bold text-[1.5rem] text-black-3">{title}</h3>
        </div>
        <button
          id={buttonId}
          type="button"
          aria-expanded={showContent}
          aria-controls={panelId}
          className="cursor-pointer p-2 transition-all duration-300 ease-in-out"
          onClick={() => {
            setShowContent((prev) => !prev);
          }}
        >
          <ChevronDown
            size={22}
            aria-hidden="true"
            className={`text-gray-3 transition-transform ${
              showContent ? "rotate-180" : ""
            } `}
          />
          <span className="sr-only">
            {showContent ? "Hide content" : "Show content"}
          </span>
        </button>
      </header>
      <section
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!showContent}
        className={`
      transition-all duration-300 ease-in-out overflow-hidden px-4
      ${showContent ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        {children}
      </section>
      <hr className="text-gray-5 mt-[1.2rem]" />
    </article>
  );
}
