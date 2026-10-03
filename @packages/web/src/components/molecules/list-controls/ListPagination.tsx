import { Button } from "@heroui/react";
import clsx from "clsx";
import type { FC } from "react";

type Props = {
  /** Pages are one-based; zero results have no selectable page. */
  page: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isDisabled?: boolean;
  className?: string;
};

export const ListPagination: FC<Props> = ({
  page,
  totalItems,
  pageSize,
  onPageChange,
  isDisabled = false,
  className,
}) => {
  const totalPages = pageSize > 0 ? Math.ceil(Math.max(0, totalItems) / pageSize) : 0;
  const current = totalPages === 0 ? 0 : Math.min(totalPages, Math.max(1, page));
  const pages = [...new Set([1, current - 1, current, current + 1, totalPages])]
    .filter((number) => number >= 1 && number <= totalPages)
    .sort((a, b) => a - b);

  return (
    <nav aria-label="Pagination" className={clsx("flex flex-col gap-3", className)}>
      <p className="text-muted text-sm" role="status">
        {totalItems === 0
          ? "No results"
          : `Page ${current} of ${totalPages} · ${totalItems} results`}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          isDisabled={isDisabled || current <= 1}
          onPress={() => onPageChange(current - 1)}
        >
          Previous
        </Button>
        {pages.map((number, index) => (
          <span key={number} className="contents">
            {index > 0 && number - pages[index - 1] > 1 && (
              <span className="text-muted px-1" aria-hidden="true">
                …
              </span>
            )}
            <Button
              type="button"
              className="min-w-9 px-2"
              variant={number === current ? "primary" : "outline"}
              aria-label={`Page ${number}`}
              aria-current={number === current ? "page" : undefined}
              isDisabled={isDisabled}
              onPress={() => {
                if (number !== current) onPageChange(number);
              }}
            >
              {number}
            </Button>
          </span>
        ))}
        <Button
          type="button"
          variant="outline"
          isDisabled={isDisabled || current === 0 || current >= totalPages}
          onPress={() => onPageChange(current + 1)}
        >
          Next
        </Button>
      </div>
    </nav>
  );
};
