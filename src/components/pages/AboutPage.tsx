import { H2 } from "@/components/atoms/H2.tsx";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";

export const AboutPage = () => {
  return (
    <PageWrapper>
      <div className={"mx-auto flex max-w-[1200px] grow flex-col gap-2"}>
        <H2>About TogoMedium</H2>
        <div
          className={
            "font-wide flex flex-col gap-6 hyphens-auto rounded-xl bg-white p-12 text-justify text-large font-light leading-relaxed"
          }
        >
          <p className={"text-left text-2xl font-medium text-primary"}>
            TogoMedium is a database of microbial culture media that is based solely on Semantic Web
            technology.
          </p>
          <p>
            There exist hundreds of microbial culture collections that are maintained by biological
            resource centers (BRCs) around the world. Currently, 787 culture collections are listed
            in Culture Collections Information Worldwide (CCINFO) provided by the World Data Centre
            for Microorganisms (WDCM). These culture collections are not only essential
            infrastructure for conducting microbial research but also serve as valuable sources of
            rich information, including microbial physiological and phenotypic information that is
            described in the accompanying metadata of each microorganism. Through our collaborative
            efforts with BioResource Research Center, Riken, and Biological Resource Center,
            National Institute of Technology and Evaluation (NITE), the metadata of their culture
            collections, namely JCM and NBRC, have been converted into RDF datasets. Both datasets
            are available on the NBDC RDF portal.
          </p>
          <p>
            Each metadata record includes the minimum data set description defined by the World
            Federation of Culture Collections (WFCC) Global Catalogue of Microorganisms (GCM), which
            includes one or more links to web documents that describe how to prepare growth media
            for the corresponding microorganism. Along with the development of the RDF datasets
            mentioned above, we have also independently developed an RDF dataset that focuses on the
            ingredients of microbial growth media whose recipes are provided by JCM and NBRC.
          </p>
          <p>
            Initially, we developed RDF data of growth media provided by JCM and NBRC, and then we
            started to collect media recipes for microorganisms whose genome sequences are available
            but not included in either JCM or NBRC. As of March 2023, our database contains 2,834
            growth media (of which 749 are from NBRC, 1,376 from JCM, and 709 from manual collection
            from research papers and the web). The database system is implemented using the OpenLink
            Virtuoso triple store, SPARQList API, and TogoStanza. One characteristic feature of the
            RDF data is that all ingredients are described using the Growth Medium Ontology (GMO).
            Different BRCs, or even a single BRC, sometimes use different names for the same
            ingredients, which hinders the integrated use of growth media data. The TogoMeidum RDF
            will enable us to carry out integrated analyses, such as aligning ingredients and
            designing a similarity measure between growth media.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};
