// app/head.tsx
export default function Head() {
  return (
    <>
      <meta name="theme-color" content="#fb923c" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#fb923c"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
    </>
  );
}
