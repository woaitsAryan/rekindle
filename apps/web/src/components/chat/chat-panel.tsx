import type { UseChatHelpers } from "ai/react";

import { ButtonScrollToBottom } from './button-scroll-to-bottom';
import { PromptForm } from './prompt-form';
import { Button } from "../ui/button";
import { RefreshCcwIcon, StopCircleIcon } from "lucide-react";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    'append' | 'isLoading' | 'reload' | 'messages' | 'stop' | 'input' | 'setInput'
  > {
  id?: string;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  return (
    <div
      className="fixed left-0 w-full md:w-2/3 bottom-0 bg-background"
    >
      <ButtonScrollToBottom />
      <div className="w-full mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button variant="outline" onClick={() => stop()} className="bg-background">
              <StopCircleIcon className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button variant="outline" onClick={() => reload()} className="bg-background">
                <RefreshCcwIcon className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="bg-background space-y-4 border-t px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user',
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
