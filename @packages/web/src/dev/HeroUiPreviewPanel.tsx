import { Button, Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";

// Keep the integration check separate from production list UI.
export const HeroUiPreviewPanel = () => {
  const [limit, setLimit] = useState("20");
  const [pressCount, setPressCount] = useState(0);

  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="bg-surface mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-6">
        <h1 className="text-2xl font-bold">HeroUI integration preview</h1>
        <p>Development preview. Use Tab, Enter, arrow keys, and Escape to navigate.</p>
        <Select
          className="w-64 max-w-full"
          value={limit}
          onChange={(value) => setLimit(String(value))}
        >
          <Label>Items per page</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["20", "50", "100"].map((value) => (
                <ListBox.Item key={value} id={value} textValue={`${value} items`}>
                  {value} items
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <div className="flex flex-wrap gap-3">
          <Button onPress={() => setPressCount((count) => count + 1)}>Test button</Button>
          <Button isDisabled>Disabled</Button>
        </div>
        <p role="status">
          Selected: {limit} items / Button presses: {pressCount}
        </p>
      </div>
    </main>
  );
};
