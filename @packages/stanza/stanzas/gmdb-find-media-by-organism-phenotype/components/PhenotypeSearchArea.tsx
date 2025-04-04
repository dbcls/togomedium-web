import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%core/theme";
import { RangeSlider } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/RangeSlider";
import { SelectBox } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/SelectBox";
import { usePhenotypeQueryMutators } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/phenotypeQuery";

type Props = {};

export const PhenotypeSearchArea: FC<Props> = () => {
  const { updatePhenotypeQuery, removePhenotypeQuery } = usePhenotypeQueryMutators();
  const handleEnabledChange = (key: string, enabled: boolean) => {
    !enabled && removePhenotypeQuery(key);
  };
  const handleValueChange = (key: string, value: string) => {
    updatePhenotypeQuery(key, value);
  };

  return (
    <Wrapper>
      <Sliders>
        <RangeSlider
          min={0}
          max={110}
          label={"Growth temperature"}
          marks={[
            { value: 0, label: "0°C" },
            { value: 37, label: "37°C" },
            { value: 55, label: "55°C" },
            { value: 75, label: "75°C" },
            { value: 90, label: "90°C" },
            { value: 110, label: "110°C" },
          ]}
          queryKey={"growth_temp"}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <RangeSlider
          min={0}
          max={14}
          label={"Growth pH"}
          marks={[
            { value: 0, label: "0" },
            { value: 14, label: "14" },
          ]}
          queryKey={"growth_ph"}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <RangeSlider
          min={0}
          max={25}
          label={"Growth salinity"}
          marks={[
            { value: 0, label: "0%" },
            { value: 25, label: "25%" },
          ]}
          queryKey={"growth_salinity"}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <RangeSlider
          min={0}
          max={50}
          label={"Cell length"}
          marks={[
            { value: 0, label: "0µm" },
            { value: 50, label: "50µm" },
          ]}
          queryKey={"cell_length"}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <RangeSlider
          min={0}
          max={25}
          label={"Cell diameter"}
          marks={[
            { value: 0, label: "0µm" },
            { value: 25, label: "25µm" },
          ]}
          queryKey={"cell_diameter"}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
      </Sliders>
      <SelectBoxWrapper>
        <SelectBox
          label={"Oxygen requirement"}
          items={[
            ["MPO_04002", "Aerobe"],
            ["MPO_04003", "Anaerobe"],
            ["MPO_04004", "Obligate aerobe"],
            ["MPO_04005", "Facultative aerobe"],
            ["MPO_04006", "Obligate anaerobe"],
            ["MPO_04007", "Facultative anaerobe"],
            ["MPO_04009", "Microaerophilic"],
          ]}
          queryKey={"MPO_10002"}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <SelectBox
          label={"Gram Strain"}
          queryKey={"MPO_07001"}
          items={[
            ["MPO_07002", "Gram+"],
            ["MPO_07003", "Gram-"],
          ]}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <SelectBox
          label={"Motility"}
          queryKey={"MPO_02000"}
          items={[
            ["MPO_02001", "Motile"],
            ["MPO_02002", "Nonmotile"],
            ["MPO_02007", "Chemotactic"],
          ]}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <SelectBox
          label={"Cell shape"}
          queryKey={"MPO_01001"}
          items={[
            ["MPO_01015", "Rod-shaped"],
            ["MPO_01003", "Coccus-shaped"],
            ["MPO_01005", "Curved-shaped"],
            ["MPO_01014", "Pleomorphic-shaped"],
            ["MPO_01007", "Filament-shaped"],
            // ["MPO_01003", "Sphere-shaped"],
            ["MPO_01022", "Vibrio-shaped"],
            ["MPO_01021", "Star-shaped"],
            ["MPO_01026", "Triangular"],
            ["MPO_01018", "Spiral-shaped"],
            ["MPO_01010", "Helical-shaped"],
            // ["MPO_01003", "Coccoid"],
            ["MPO_01013", "Ovoid-shaped"],
            ["MPO_01012", "Oval-shaped"],
            ["MPO_01017", "Spindle-shaped"],
            ["MPO_01004", "Crescent-shaped"],
            ["MPO_01009", "Fusiform"],
            ["MPO_01020", "Square-shaped"],
            ["MPO_01019", "Spore-shaped"],
            ["MPO_01006", "Disc-shaped"],
            ["MPO_01008", "Flask-shaped"],
          ]}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <SelectBox
          label={"Salinity"}
          queryKey={"MPO_03006"}
          items={[
            ["MPO_03007", "Halophile"],
            ["MPO_03008", "Halotolerant"],
          ]}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
        <SelectBox
          label={"Energy metabolism"}
          queryKey={"MPO_04053"}
          items={[["MPO_04153", "Carbon fixation"]]}
          handleEnabledChange={handleEnabledChange}
          handleValueChange={handleValueChange}
        />
      </SelectBoxWrapper>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  backgroundColor: THEME.COLOR.WHITE,
  paddingInline: 20,
  paddingBlock: `${THEME.SIZE.S1}px ${THEME.SIZE.S4}px`,
  flexGrow: 1,
  containerName: "wrapper",
  containerType: "inline-size",
});

const Sliders = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const SelectBoxWrapper = styled("div")({
  display: "grid",
  marginTop: THEME.SIZE.S3,
  rowGap: THEME.SIZE.S2,
  ["@container wrapper (min-width: 500px)"]: {
    gridTemplateColumns: "275px 275px",
  },
});
