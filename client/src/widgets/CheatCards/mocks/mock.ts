export type CheatStatus = "undetected" | "maintenance" | "detected" | "new";

export interface CheatCard {
  id: string;
  name: string;
  version: string;
  description: string;
  image: string;
  status: CheatStatus;
  updated: string;
  isUnsafe?: boolean;
}

export const cheatCards: CheatCard[] = [
  {
    id: "1",
    name: "Valorant Prime",
    version: "v2.4.1",
    description: "Premium aimbot with customizable smoothing, ESP, and inventory manager. Safe for competitive play.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoYOWK_vJKmTq2_0-hV7OkFG_hcvD9z-s7ck5QWWqO-CkuO_CTqxgzp4_kS_Pkm4i7e-9BtuzpHCSa6oR-9kRyWHNEIeVSqAzsu6l49e_-6K3_p1tXV6FNK8NL94N5CrH6vmPEjHbk9WdqYob4Vt6j7HQDN3Mb3sZRdIcSh3EsqoXSdMmwr99VBiqwDS09FlYSd0txtfKp4cc2ohQxpr97249fZOsz23GkgOXHFhnofCG1f-lXfVsS-sRU6shevpwm1qc5hJbDQg",
    status: "undetected",
    updated: "2h",
  },
  {
    id: "2",
    name: "Apex Legends Master",
    version: "v1.0.9",
    description: "Includes glow ESP, trigger bot, and recoil control system. Designed for high ranks.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8I_oPUOfDocMNEd8GEKcobPRfuI_5e4niaV0c06usVInhGUqh3bVVPXNhUXgpq3x_tkxbW0J5WnnRZVCVuKY84Ri9Nrk_Ki5WQkbQ_izP8WVKP37A0AFXX5RXxtAXZTUSTL5CBLx9RgbTfF1rYWTAz-N5t8rhxHzdIRDXKPxawr0l-LHPBzxBJQA4ddUSrhTlUOrKY3wVnIX-ynqyjwHqNO1aWqGM6btnf2tO3sS-1JuwIBNh17clAGj3KEGlXGtKGXiCgZLLkw",
    status: "undetected",
    updated: "12m",
  },
  {
    id: "3",
    name: "CS2 Global Elite",
    version: "v5.2",
    description: "Classic legit cheat with sound ESP and skin changer. Currently under maintenance for latest patch.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfbCp4Gcmo4VZoOIjdZOH4aF2khljntf_a_K-V6gaFvxuNYDd31QHQhffoBbez4COQZt6t-Q2hZ7EtZt9cb58Dossu-KIoiwU8I2ronADPT1oRJg6-MOWzkFWG5N00kmVScsAsLg4K9XlL62mQtPfebb73M52B3E5eWI9DoLRiHIhFTx9YTCFOPOyUtl32YyAtotZyg4ghjaJKKdmsAmqIA0Y7D_mSnjIlZalZeVOK0hNTdLMNRJvpM19Mf_mtCzQJuLiuEOnXDA",
    status: "maintenance",
    updated: "1d",
  },
  {
    id: "4",
    name: "Overwatch 2 Flex",
    version: "v3.0.1",
    description: "Advanced projectile prediction and auto-ult logic. Perfect for DPS mains.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe9YVWr_6JwBRfoZLJLSdEOy26OfaCqxDxEV4G17M3kqWdM7ClfFkwCXRvFVPCJApqyIVs3GFHi7tAHPhYSZdIIptq0iRHNumfKSMEChTm2I95QtUUfJq3Yfqz8Ofm5bR3azIctFv03oBZixdcTQGBLAchoAN5tUpTEF4xWW93RBixK-hPL-6TKtGYQ06fuTUEcNkJDR9y8PISbrC8NQdS9HOKhjyADd1TGtUOPOjnefljru2ze6JoKeSpdx9vVfvxet-F5Ue0xQ",
    status: "undetected",
    updated: "5h",
  },
  {
    id: "5",
    name: "Elden Ring EasyMode",
    version: "v1.1",
    description: "Infinite health, stamina, and item spawner. Explore the Lands Between without fear.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeXSxoNGw2JlERoIHcZpRw_vthiu7gjTg52hOacSX7FhOmc78UStJvYounNvoC88UCsjSPEmv0yyBXDhT3j4oew_wQKCNDvE2TMEYl7tVpcT8DSkLRPBDKwAm4mnl_7c-ziLNVRzhmtwVJDcGdCkUHxMZEmRyQeKbYkxvOUWZgi2RQWNy6fOqGvf5c0aDoIJ5isB6IskEZFJDDrp8NDhBmHDKM1v6FVi9nsuJKIfhN4ovMaZUCBtNB31GE3GFBAPcXO6PwS7F2GQ",
    status: "new",
    updated: "2d",
  },
  {
    id: "6",
    name: "Rust Dominator",
    version: "v4.0",
    description: "Full map ESP, auto-farm bot, and recoil scripts. Use at your own risk.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmFS952hJqtv2wzXNOHSILFLfTiVFV-LnracyDidyK8F2z8flFxnBIZZO2Vt9St9Q5B9XBmrMDVz_gt1uCz8LuCb9hVGs1mYjfK9Zi6OPvMWq2RFsZywwFr_5XCAgdwfUZ10__yQf4YGYpd93FlcYfzom5tQGh7-X8C_7oatMwyNyAge5i4AsEEj3t7AAPoX8FEEvk7jmvjKreP8ndnQ2uifmsyz2EX7h56G7ysP_UYpiWvFrQmY4ZYoL90pO2wA8TST7a3v__tQ",
    status: "detected",
    updated: "1 week",
    isUnsafe: true,
  },
];

