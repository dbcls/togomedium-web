import { Button, Label, ListBox, Select } from "@heroui/react";
import { useState } from "react";

// Keep the integration check separate from production list UI.
export const HeroUiPreviewPanel = () => {
  const [limit, setLimit] = useState("20");
  const [pressCount, setPressCount] = useState(0);

  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="bg-surface mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-6">
        <h1 className="text-2xl font-bold">HeroUI 導入確認</h1>
        <p>開発用の表示確認です。Tab・Enter・矢印キー・Escapeで操作できます。</p>
        <Select
          className="w-64 max-w-full"
          value={limit}
          onChange={(value) => setLimit(String(value))}
        >
          <Label>表示件数</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {["20", "50", "100"].map((value) => (
                <ListBox.Item key={value} id={value} textValue={`${value}件`}>
                  {value}件
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <div className="flex flex-wrap gap-3">
          <Button onPress={() => setPressCount((count) => count + 1)}>動作確認</Button>
          <Button isDisabled>無効状態</Button>
        </div>
        <p role="status">
          選択: {limit}件／ボタン操作: {pressCount}回
        </p>
      </div>
    </main>
  );
};
