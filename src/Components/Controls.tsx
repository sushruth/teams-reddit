import { Checkbox, CheckboxProps, ComponentEventHandler, Dropdown, Flex } from "@fluentui/react-northstar";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { previewState } from "../state/preview.state";
import { subRedditState } from "../state/subreddit.state";

type ControlsProps = {};

export const Controls: React.FC<ControlsProps> = () => {
  const onDropdownChange = React.useCallback((_e, d) => {
    subRedditState.setSubRedditName(
      (d?.value) || 'ProgrammerHumor'
    );
  }, []);

  const onCheckboxClick: ComponentEventHandler<CheckboxProps> = React.useCallback(() => {
    previewState.togglePreview();
  }, []);

  return useObserver(() => (
    <Flex hAlign="end" vAlign="center">
      <Dropdown
        inline
        items={subRedditState.subredditNames}
        defaultValue={subRedditState.subredditNames[0]}
        onChange={onDropdownChange}
      />
      <Checkbox
        label="Previews"
        onClick={onCheckboxClick}
        checked={previewState.enablePreview}
        toggle
      />
    </Flex>
  ));
};
