/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_NYT_API: string;
  VITE_NYT_URL: string;
  VITE_OPEN_LIB_URL: string;
  VITE_OPEN_LIB_COVERS_URL: string;
  VITE_IMG_FALLBACK_URL: string;
  VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
