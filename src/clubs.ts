export type ClubConfig = {
  slug: string
  name: string
  shortName: string
  strapline: string
  accent: string
  productIds: string[]
}

export const clubs: Record<string, ClubConfig> = {
  merseyvalley: {
    slug: 'merseyvalley',
    name: 'Mersey Valley FC',
    shortName: 'MVFC',
    strapline: 'OFFICIAL CLUB SHOP',
    accent: '#d6ff00',
    productIds: [
      'onxi-home-black',
      'onxi-away-white',
      'onxi-training-black',
      'onxi-grip-black',
      'onxi-grip-white',
    ],
  },
}
