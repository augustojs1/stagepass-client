import localFont from "next/font/local";

export const font_logo = localFont({
  src: "./fonts/poppins/Poppins-Bold.ttf",
  weight: "700",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const font_display = localFont({
  src: "./fonts/archivo/Archivo-Bold.ttf",
  weight: "700",
  style: "normal",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const font_body = localFont({
  src: [
    {
      path: "./fonts/inter/Inter-VariableFont_opsz,wght.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/inter/Inter-VariableFont_opsz,wght.ttf",
      weight: "700",
    },
  ],
});
