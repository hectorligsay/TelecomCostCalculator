"use client"

import { useState, type ChangeEvent } from "react"
import type { CurrentState, OfferState } from "@/types/calculator"

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

  const handleCurrentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "notes") {
      setCurrent((prev) => ({ ...prev, [name]: value }))
    } else {
      setCurrent((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }))
    }
  }

  const handleOfferChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target
    setOffers((prev) => {
      const newOffers = [...prev]
      if (name === "notes") {
        newOffers[index] = { ...newOffers[index], [name]: value }
      } else {
        newOffers[index] = { ...newOffers[index], [name]: parseFloat(value) || 0 }
      }
      return newOffers
    })
  }

  const addOffer = () => {
    setOffers((prev) => [...prev, { services: 0, mobile: 0, notes: "" }])
  }

  const deleteLastOffer = () => {
    if (offers.length <= 3) return // Prevent deleting if only 3 offers remain
    setOffers((prev) => prev.slice(0, -1))
  }

  const resetCalculator = () => {
    // Reset current costs
    setCurrent({
      services: 0,
      mobile: 0,
      notes: "",
    })
    
    // Reset offers to initial state with three empty offers
    setOffers([
      { services: 0, mobile: 0, notes: "" },
      { services: 0, mobile: 0, notes: "" },
      { services: 0, mobile: 0, notes: "" },
    ])
  }

  // Calculate threshold (80% of services only)
  const threshold = current.services * 0.8

  // Calculate current household cost
  const currentHouseholdCost = current.services + current.mobile

  // Calculate results for each offer
  const offerResults = offers.map(offer => {
    const householdCost = offer.services + offer.mobile
    const monthlySavings = currentHouseholdCost - householdCost
    const annualSavings = monthlySavings * 12
    return { householdCost, monthlySavings, annualSavings }
  })

  const calculations = {
    threshold,
    currentHouseholdCost,
    offerResults,
  }

  return {
    current,
    offers,
    calculations,
    handleCurrentChange,
    handleOfferChange,
    addOffer,
    deleteLastOffer,
    resetCalculator,
  }
}

