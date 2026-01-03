import { FunctionCategory } from "../model/types";

export const functionCategories: FunctionCategory[] = [
  {
    id: "aim",
    name: "AIM",
    features: [
      "Aim on vehicles",
      "Visibility check",
      "Control radius",
      "Draw FOV circle",
      "FOV adjustment",
      "Distance settings",
      "Draw prediction circle",
      "Advanced settings",
      "Velocity modifier",
      "Bone selection (Head, Neck, Body)",
    ],
  },
  {
    id: "esp",
    name: "ESP",
    features: [
      "Player ESP",
      "Vehicle ESP",
      "Distance display",
      "Health bar",
      "Name tags",
      "Skeleton ESP",
      "Box ESP",
      "Line ESP",
      "Custom colors",
      "Visibility check",
    ],
  },
  {
    id: "radar",
    name: "RADAR",
    features: [
      "Mini map radar",
      "Player positions",
      "Vehicle positions",
      "Distance indicators",
      "Direction arrows",
      "Customizable size",
      "Zoom controls",
      "Filter options",
    ],
  },
  {
    id: "misc",
    name: "MISC",
    features: [
      "No recoil",
      "No spread",
      "Rapid fire",
      "Auto reload",
      "Unlimited ammo",
      "Speed hack",
      "Jump hack",
      "God mode",
      "Teleport",
      "Custom settings",
    ],
  },
];

