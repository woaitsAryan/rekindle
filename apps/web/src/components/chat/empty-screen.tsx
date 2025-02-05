import type { UseChatHelpers } from 'ai/react';

import { Button } from '../ui/button';
import { AlignRightIcon } from 'lucide-react';

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`,
  },
  {
    heading: 'Explain superconductors',
    message: "Explain superconductors like I'm five years old.",
  },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="bg-background rounded-lg border p-8">
        <h1 className="mb-2 text-lg font-semibold">Welcome to Preternatural&apos;s chatbot.</h1>
        <p className="text-muted-foreground leading-normal">
          You can start a conversation here or try the following examples:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <AlignRightIcon className="text-muted-foreground mr-2" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
