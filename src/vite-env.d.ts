/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_NYT_API: string;
  VITE_NYT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
