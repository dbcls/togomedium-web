import { Autocomplete, Chip, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { FC, SyntheticEvent, useState } from "react";
import {
  ComponentsWithComponentsResponse,
  componentsWithComponentsURL,
  ComponentWithComponentsRequest,
} from "%api/componentsWithComponents/definitions";
import { getData } from "%core/network/getData";
import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";
import { LabelInfo } from "%stanza/utils/labelInfo";

type Props = {
  onChangeSelection: (ids: string[]) => void;
};
type ComponentLabelInfo = LabelInfo & { japaneseName: string };
export const ComponentSelect: FC<Props> = ({ onChangeSelection }) => {
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState<readonly ComponentLabelInfo[]>([]);
  // todo use useQuery
  const loadComponents = async (ids: string[] = []) => {
    const response = await getData<
      ComponentsWithComponentsResponse,
      ComponentWithComponentsRequest
    >(componentsWithComponentsURL, {
      gmo_ids: ids.join(","),
    });
    if (response.body) {
      setComponents(
        response.body
          .map<ComponentLabelInfo>((item) => ({
            id: item.gmo_id,
            label: item.name.includes(";") ? decodeHTMLEntities(item.name) : item.name,
            japaneseName: item.japanese_name,
          }))
          .filter((item) => !ids.includes(item.id))
      );
    }
    setLoading(false);
  };
  const onOpen = () => {
    if (components.length) return;
    loadComponents();
  };

  const onChange = (e: SyntheticEvent, value: LabelInfo[]) => {
    const ids = value.map((v) => v.id);
    onChangeSelection(ids);
    loadComponents(ids);
  };
  //
  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      filterOptions={(options, params) => {
        return options.filter((option) => {
          const label = option.label.toLowerCase();
          const japaneseName = option.japaneseName.toLowerCase();
          const filter = params.inputValue.toLowerCase();
          return label.includes(filter) || japaneseName.includes(filter);
        });
      }}
      onChange={onChange}
      onOpen={onOpen}
      disablePortal={true}
      options={components}
      loading={loading}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Components"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            {...getTagProps({ index })}
            label={option.label}
            key={option.id}
          />
        ))
      }
    />
  );
};
