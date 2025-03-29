"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import type { CurrentState, OfferState, CalculationsState } from "@/types/calculator"

export function useCalculator() {
  const [current, setCurrent] = useState<CurrentState>({
    services: 0,
    mobile: 0,
    notes: "",
  })

  const [offers, setOffers] = useState<OfferState[]>([
    { services: 0, mobile: 0, notes: "" },
    { services: 0, mobile: 0, notes: "" },
    { services: 0, mobile: 0, notes: "" },
  ])

  const [calculations, setCalculations] = useState<CalculationsState>({
    currentHouseholdCost: 0,
    threshold: 0,
    offerResults: [
      { householdCost: 0, monthlySavings: 0, annualSavings: 0 },
      { householdCost: 0, monthlySavings: 0, annualSavings: 0 },
      { householdCost: 0, monthlySavings: 0, annualSavings: 0 },
    ],
  })

  // Calculate all values whenever inputs change
  useEffect(() => {
    const currentHouseholdCost = current.services + current.mobile
    const threshold = current.services * 0.8

    const offerResults = offers.map((offer) => {
      const householdCost = offer.services + offer.mobile
      const monthlySavings = currentHouseholdCost - householdCost
      const annualSavings = monthlySavings * 12

      return { householdCost, monthlySavings, annualSavings }
    })

    setCalculations({ currentHouseholdCost, threshold, offerResults })
  }, [current, offers])

  // Handle changes to current costs
  const handleCurrentChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (name === "notes") {
      setCurrent((prev) => ({ ...prev, notes: value }))
    } else {
      // For numeric inputs, handle empty string case
      const numericValue = value === "" ? 0 : Number.parseFloat(value)
      setCurrent((prev) => ({ ...prev, [name]: numericValue }))
    }
  }

  // Handle changes to offer costs
  const handleOfferChange = (index: number, e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (name === "notes") {
      setOffers((prev) => prev.map((offer, i) => (i === index ? { ...offer, notes: value } : offer)))
    } else {
      // For numeric inputs, handle empty string case
      const numericValue = value === "" ? 0 : Number.parseFloat(value)
      setOffers((prev) => prev.map((offer, i) => (i === index ? { ...offer, [name]: numericValue } : offer)))
    }
  }

  // Add a new offer
  const addOffer = (): void => {
    setOffers([...offers, { services: 0, mobile: 0, notes: "" }])
    setCalculations((prev) => ({
      ...prev,
      offerResults: [...prev.offerResults, { householdCost: 0, monthlySavings: 0, annualSavings: 0 }],
    }))
  }

  // Delete last offer
  const deleteLastOffer = (): void => {
    if (offers.length <= 3) return // Prevent deleting if only 3 offers remain
    setOffers((prev) => prev.slice(0, -1))
    setCalculations((prev) => ({
      ...prev,
      offerResults: prev.offerResults.slice(0, -1),
    }))
  }

  return {
    current,
    offers,
    calculations,
    handleCurrentChange,
    handleOfferChange,
    addOffer,
    deleteLastOffer,
  }
}

