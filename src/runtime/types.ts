import type { LenisOptions } from "lenis";
import type { ScrollState } from "./plugin";

// Import the default Lenis class
import type Lenis from "lenis";

// Extend Nuxt's RuntimeNuxtHooks to include our custom Lenis hooks
declare module "@nuxt/schema" {
   interface RuntimeNuxtHooks {
      "lenis:created": (payload: {
         lenis: Lenis;
         id: string;
         options: LenisOptions;
      }) => void;
      "lenis:initiated": (payload: {
         lenis: Lenis;
         id: string;
         isDefault: boolean;
      }) => void;
      "lenis:scroll": (payload: {
         lenis: Lenis;
         id: string;
         state: ScrollState;
      }) => void;
      "lenis:destroy": (payload: {
         lenis: Lenis | undefined;
         id: string;
      }) => void;
   }
}

// Re-export for convenience
export type { ScrollState };
