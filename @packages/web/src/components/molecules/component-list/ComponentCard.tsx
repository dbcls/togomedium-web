import type { SearchComponentsListResponse } from "%api/searchComponentsList/definitions";
import { Card } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { decodeLabelEntities } from "@/utils/decodeLabelEntities";

type Props = {
  component: SearchComponentsListResponse["contents"][number];
  className?: string;
};

export const ComponentCard = ({ component, className }: Props) => {
  const { id, name, aliases, medium_count: mediumCount, roles, properties } = component;
  const displayName = decodeLabelEntities(name) || "Unnamed component";
  const classifications = [
    { label: "Role", items: roles, tagClassName: "border-transparent bg-primary/15 text-gray-800" },
    {
      label: "Property",
      items: properties,
      tagClassName: "border-gray-300 bg-white text-gray-700",
    },
  ];

  return (
    <Card<"a">
      render={(props) => (
        <Link
          {...props}
          to="/component/$gmoId"
          params={{ gmoId: id }}
          aria-label={`${displayName} (${id})`}
          draggable={false}
        />
      )}
      className={clsx(
        "group hover:border-primary focus-visible:outline-primary-dark min-w-0 gap-3 border-2 border-gray-200 bg-white p-2 text-sm shadow-none transition-colors duration-200 select-text hover:border-2 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
        className,
      )}
    >
      <Card.Header className="flex flex-col items-start gap-1 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-xs text-gray-500">{id}</p>
          <Card.Title className="text-primary text-2xl leading-tight font-medium [overflow-wrap:anywhere]">
            {displayName}
          </Card.Title>
          {aliases.length > 0 && (
            <p aria-label="Aliases" className="min-w-0 [overflow-wrap:anywhere] text-gray-700">
              {aliases.map(decodeLabelEntities).join("; ")}
            </p>
          )}
        </div>
        <p className="shrink-0 text-sm text-gray-600">
          <span className="mr-1.5 text-lg font-medium text-black">
            {mediumCount.toLocaleString("en-US")}
          </span>{" "}
          {mediumCount === 1 ? "medium" : "media"}
        </p>
      </Card.Header>
      <Card.Content className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap gap-1">
          {classifications.map(
            ({ label, items, tagClassName }) =>
              items.length > 0 && (
                <ul key={label} className="flex max-w-full flex-wrap gap-1" aria-label={label}>
                  {items.map((item) => (
                    <li
                      key={item.gmo_id}
                      className={clsx(
                        "max-w-full rounded-[var(--heroui-radius)] border px-2 py-0.5 text-xs [overflow-wrap:anywhere]",
                        tagClassName,
                      )}
                    >
                      {item.label_en || item.gmo_id}
                    </li>
                  ))}
                </ul>
              ),
          )}
        </div>
      </Card.Content>
    </Card>
  );
};
