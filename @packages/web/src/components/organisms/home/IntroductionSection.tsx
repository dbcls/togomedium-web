import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { FC } from "react";
import { Logo } from "@/components/atoms/svg/logo.tsx";
import { basicTextLink } from "@/consts/styles.ts";

export const IntroductionSection: FC = () => {
  return (
    <section className={"font-wide flex flex-col items-start gap-6 rounded-2xl bg-white p-10"}>
      <div className={"flex justify-start gap-6"}>
        <div className={"flex w-1/3 max-w-96 shrink-0 grow-0 items-center"}>
          <figure className={"overflow-clip rounded"}>
            <img
              className={"block"}
              src="/assets/photo1.webp"
              alt=""
            />
          </figure>
        </div>
        <div className={"flex flex-col justify-center gap-2"}>
          <Logo className={"w-[240px]"} />
          <p className={"rounded p-2 text-4xl font-medium text-primary"}>
            Culture media database aggregated from various resources.{" "}
          </p>
        </div>
      </div>
      <p className={"hyphens-auto text-justify text-large font-light"}>
        TogoMedium is a comprehensive knowledge base focused on culture media for microorganisms.
        The media available in TogoMedium have been compiled from information provided by diverse
        bioresource centers and research papers. All information in TogoMedium is described as RDF
        and the composition of these media is described with Growth Medium Ontology. This enables
        users to investigate the interconnectedness between organisms, media, and their ingredients,
        facilitating a deeper understanding of their relationships.{" "}
      </p>
      <p className={"flex w-full justify-end"}>
        <Link
          to={"/about"}
          className={clsx(basicTextLink, "text-large")}
        >
          More about us &gt;
        </Link>
      </p>
    </section>
  );
};
