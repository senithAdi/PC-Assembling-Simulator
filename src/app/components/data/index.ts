import { ComponentMetadata } from "./types";
import { cpuComponents } from "./cpu";
import { gpuComponents } from "./gpu";
import { motherboardComponents } from "./motherboard";
import { ramComponents } from "./ram";
import { storageComponents } from "./storage";
import { psuComponents } from "./psu";
import { coolerComponents } from "./cooler";
import { caseComponents } from "./case";
import { fanComponents, miscComponents } from "./misc";

export const componentsRegistry: ComponentMetadata[] = [
  ...cpuComponents,
  ...motherboardComponents,
  ...ramComponents,
  ...gpuComponents,
  ...storageComponents,
  ...psuComponents,
  ...coolerComponents,
  ...fanComponents,
  ...caseComponents,
  ...miscComponents
];

export * from "./types";
export { buildScenarios } from "./scenarios";
