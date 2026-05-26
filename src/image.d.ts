/// <reference types="vite/client" />

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.webp";
declare module "*.svg";

declare module "*.svg?react" {
  import * as React from "react";
  const component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default component;
}