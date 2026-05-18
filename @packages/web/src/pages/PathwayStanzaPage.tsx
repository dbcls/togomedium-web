import { FC } from "react";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";

export const PathwayStanzaPage: FC = () => {
  return (
    <PageWrapper>
      <script type="module" src="http://localhost:8080/pathway-viewer.js" async></script>

      <div style={{ width: "80%", marginInline: "auto", background: "red" }}>
        <togostanza-pathway-viewer
          tax_ids="445932"
          variant_id="413.109.77"
          togostanza-menu-placement="none"
        ></togostanza-pathway-viewer>
      </div>
    </PageWrapper>
  );
};
