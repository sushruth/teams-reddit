import * as React from "react";
import {
  Dropdown,
  Flex,
  Checkbox,
  DropdownProps
} from "@fluentui/react-northstar";
import { view } from "@risingstack/react-easy-state";
import { state } from "../state";

type ControlsProps = {
  dropdownProps: DropdownProps;
};

export const Controls: React.FC<ControlsProps> = view(({ dropdownProps }) => {
  return (
    <Flex hAlign="end" vAlign="center">
      <Dropdown inline {...dropdownProps} />
      <Checkbox
        label="Previews"
        onClick={state.togglePreview}
        checked={state.previews}
        toggle
      />
    </Flex>
  );
});
