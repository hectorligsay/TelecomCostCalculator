import type { ChangeEvent } from "react"

export interface CurrentState {
  services: number
  mobile: number
  notes: string
}

export interface OfferState {
  services: number
  mobile: number
  notes: string
}

export interface OfferResult {
  householdCost: number
  monthlySavings: number
  annualSavings: number
}

export interface CalculationsState {
  currentHouseholdCost: number
  threshold: number
  offerResults: OfferResult[]
}

export interface CalculatorContextType {
  current: CurrentState
  offers: OfferState[]
  calculations: CalculationsState
  handleCurrentChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleOfferChange: (index: number, e: ChangeEvent<HTMLInputElement>) => void
  addOffer: () => void
}

