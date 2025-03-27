import { Message } from "./interface";

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm text-center">
      {"success" in message && (
        <div className="text-foreground px-4">{message.success}</div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground px-4">{message.error}</div>
      )}
      {"message" in message && (
        <div className="text-foreground px-4">{message.message}</div>
      )}
    </div>
  );
}