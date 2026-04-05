export const AgeGroup = {
  Ages12AndUp: "Ages 12 and up",
  Ages12To18: "Ages 12 to 18",
  Ages14AndUp: "Ages 14 and up",
  Ages3To6: "Ages 3 to 6",
  Ages4To8: "Ages 4 to 8",
  Ages6To9: "Ages 6 to 9",
  Ages9To12: "Ages 9 to 12",
  Empty: ""
} as const

export type AgeGroup = (typeof AgeGroup)[keyof typeof AgeGroup]