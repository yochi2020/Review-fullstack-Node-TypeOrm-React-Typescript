import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  action?: ReactNode;
};

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="d-flex flex-column align-items-start gap-2 pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2 mb-0">{title}</h1>
      {action}
    </div>
  );
}
