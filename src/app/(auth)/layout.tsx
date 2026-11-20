export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full overflow-x-auto overflow-y-auto bg-muted font-sans ">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-112 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative z-10 flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
