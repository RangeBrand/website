declare module "color-blind" {
  type SimulateHex = (color: string, returnRgb?: boolean) => string;

  const blinder: {
    protanomaly: SimulateHex;
    protanopia: SimulateHex;
    deuteranomaly: SimulateHex;
    deuteranopia: SimulateHex;
    tritanomaly: SimulateHex;
    tritanopia: SimulateHex;
    achromatomaly: SimulateHex;
    achromatopsia: SimulateHex;
  };

  export default blinder;
}
