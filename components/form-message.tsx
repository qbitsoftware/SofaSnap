export type Message =
  | { error: string }

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      <div className="text-destructive border-l-2 border-destructive-foreground px-4">
        {message.error}
      </div>
    </div>
  );
}