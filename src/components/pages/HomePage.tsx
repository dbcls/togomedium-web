import { Link } from "@tanstack/react-router";
import { FC } from "react";
import { Logo } from "@/components/atoms/svg/logo.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { usePageTitle } from "@/hooks/usePageTitle.ts";

export const HomePage: FC = () => {
  usePageTitle("");
  return (
    <PageWrapper>
      <div className={"grow"}>
        <div
          className={
            "font-wide mx-auto flex max-w-[1200px] items-start gap-3 rounded-2xl bg-white p-10"
          }
        >
          <div className={"flex flex-col gap-6"}>
            <div className={"flex justify-start gap-6"}>
              <div className={"flex w-1/3 max-w-96 shrink-0 grow-0 items-center"}>
                <figure className={"overflow-clip rounded"}>
                  <img
                    className={"block"}
                    src="/assets/photo1.jpg"
                    alt=""
                  />
                </figure>
              </div>
              <div className={"flex flex-col justify-center gap-2"}>
                <Logo className={"w-[240px]"} />
                <p className={"rounded p-2 text-4xl font-medium text-primary"}>
                  Culture media database aggregated from various resources.
                </p>
              </div>
            </div>
            <div className={"flex flex-col items-center gap-3"}>
              <p className={"text-large font-light"}>
                TogoMedium is a comprehensive knowledge base focused on culture media for
                microorganisms. The media available in TogoMedium have been compiled from
                information provided by diverse bioresource centers and research papers. All
                information in TogoMedium is described as RDF and the composition of these media is
                described with Growth Medium Ontology. This enables users to investigate the
                interconnectedness between organisms, media, and their ingredients, facilitating a
                deeper understanding of their relationships.{" "}
              </p>
            </div>
            <p className={"flex justify-end"}>
              <Link
                to={"/about"}
                className={"text-primary-dark text-large font-light underline hover:text-primary"}
              >
                More about us &gt;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
