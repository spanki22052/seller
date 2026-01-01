export interface Game {
  name: string;
  image: string;
}

export type FilterKey = "hit" | "recommended" | "new" | "mobileCheats" | "cheaterChat";

export const games: Game[] = [
  {
    name: "Dayz",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBA-hpxKEZF7D6Iu9_uoZCFifrYjEWJEPtgAGFNm41SWakkvsHx_W8SLs3jb30QGbjauCZ2vWID5HkEhw5E_59gHKZi4rF_hwgm0zv9nnLrdBntgF5k0zoQm3yT18BqR_kwvVORE7UwJqL5p-9UsoJ9-urXJjMt65SYMTxWxZyPtnOCGGrUe6bjgarWHKMQn9FbnMfVxQgPJnETepg56sz0nfYBib_Zgy3jkJkrcs6qI2ymM31kHBasfC-ucmbbVCN0pXgFzUeWDA",
  },
  {
    name: "Rust",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI5ZaFp2yKy6whOoSMNc0qW5ugMJnxAZCGaffXHx0HI3eyguWzCgLezeNB8nWt3GNSg8s8O_5EpW5pjbLASCeFqzpQ3UYvpGu_y_8nd5liCKYptIjK34gc0ogQGUH4bOd50ENuhbCZsZI85ttauquU_QkZyaqyj5rGGvxSPJNa4HtGNfthlm7Zzmt0qpv8ZZlADIA0nfXgITDefVXdUp0CGcoYQ-VXt2h2BBYSudjL0gkuToDqHRZJUp8wRx0Nozm0JwiM3UzGTg",
  },
  {
    name: "Apex",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQmFg9qIIcze9Qzzqtd8mHjHy__9mbbtsOz8a2cVNfsKhzXJFvR2xOt2EzlRciem4l0SMLyRQLgYQVvPJuxPGtLGRUW2O8QnEB5xYOz9FLu0RWlFHZ55SNZ9vZzo6y0-A7wkykW4i0Wn9osUAh5iuVvYenDr9p7WVKspsI_niiihsdvXXsYHfVeIN19V6350KVfYvSvxixDBPfQ5d1ESi8-UtLp1Vkpawt0DpJxQb7FUeJO4RLCWP7KbrZXuMplTZin_I-A4stNg",
  },
  {
    name: "Squad",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCJRDlWyFKoo8bud_HEY44Rf53cmIisDTwEPbUfZPEAaKd_ldVwnevW555wr4PcGA6zuBwwrwa9Y4HRQJ8cOau7ogGMny-5jeTrl8XdLWNa2s54Nwihv7ENkaQ_zCUBzhhioShvXlfKodURjEvtTMEJxYKZmhQ9Sh1VwZ_6zELaYPBuooSur0JKG8IlkybYwS0z5e8vB-rlovWwl6XuXEsL04J-wVMZ_CHeIsKZ1whiUyEBSh-lQmaKdiRjx78IVIg5DfCZygV8g",
  },
];

export const filters: FilterKey[] = [
  "hit",
  "recommended",
  "new",
  "mobileCheats",
  "cheaterChat",
];

export const featuredGameImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpIndoOglpPAqAP7xHjYQWvIx1zyXl2ExV0KqjqXdBePxNEefbTjQs9S2dzsbeipKc6xHy3hc-GKjWUyI-0F0TTl9kt9kWvBH1UPMYqRChQ1Lu9pxse8o9997sESwz1KzWnfBkStWf9OSmqIWjaBaMALKs_Ekb2RzJxqaaJa6tbY54mcumaN9DrFmSaqcnaKlnuA3awZ4yVnPGVc2v_mzMoxwqxnkk_lN5niSiL2pVk0pkn_tkxdHKvCzPQhaBkhFJbgKxxLkMyw";

