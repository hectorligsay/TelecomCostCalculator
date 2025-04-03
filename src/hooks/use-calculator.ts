"use client"

import { useState, type ChangeEvent, useEffect } from "react"
import type { CurrentState, OfferState } from "@/types/calculator"
import { track } from "@vercel/analytics"

// Function to generate a simple user ID
const generateUserId = () => {
  const timestamp = new Date().getTime()
  const random = Math.random().toString(36).substring(2, 15)
  return `${timestamp}-${random}`
}

// Function to get device info
const getDeviceInfo = () => {
  const ua = window.navigator.userAgent
  const device = {
    type: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(ua) ? 'mobile' : 'desktop',
    browser: ua.includes('Chrome') ? 'Chrome' : 
             ua.includes('Firefox') ? 'Firefox' : 
             ua.includes('Safari') ? 'Safari' : 
             ua.includes('Edge') ? 'Edge' : 'Other',
    os: /Windows/.test(ua) ? 'Windows' :
        /Mac/.test(ua) ? 'Mac' :
        /Linux/.test(ua) ? 'Linux' :
        /Android/.test(ua) ? 'Android' :
        /iOS/.test(ua) ? 'iOS' : 'Other'
  }
  return device
}

export function useCalculator() {
  const [userId, setUserId] = useState<string>('')
  const [deviceInfo, setDeviceInfo] = useState<any>(null)

  useEffect(() => {
    // Try to get existing user ID from localStorage
    let storedUserId = localStorage.getItem('spectrum_calculator_user_id')
    if (!storedUserId) {
      // If no existing ID, generate a new one
      storedUserId = generateUserId()
      localStorage.setItem('spectrum_calculator_user_id', storedUserId)
    }
    setUserId(storedUserId)

    // Get device info
    const device = getDeviceInfo()
    setDeviceInfo(device)

    // Track initial visit
    track('page_visit', {
      userId: storedUserId,
      ...device
    })
  }, [])

  // Helper function to add user and device info to tracking events
  const trackWithUser = (eventName: string, additionalData = {}) => {
    if (userId && deviceInfo) {
      track(eventName, {
        userId,
        ...deviceInfo,
        ...additionalData
      })
    }
  }

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
      const numValue = parseFloat(value) || 0
      setCurrent((prev) => ({ ...prev, [name]: numValue }))
      if (numValue > 0) {
        trackWithUser('current_costs_updated', {
          field: name,
          value: numValue
        })
      }
    }
  }

  const handleOfferChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target
    setOffers((prev) => {
      const newOffers = [...prev]
      if (name === "notes") {
        newOffers[index] = { ...newOffers[index], [name]: value }
      } else {
        const numValue = parseFloat(value) || 0
        newOffers[index] = { ...newOffers[index], [name]: numValue }
        // Track when a user enters a services amount
        if (name === "services" && numValue > 0) {
          trackWithUser("offer_submitted", {
            offerIndex: index,
            servicesAmount: numValue
          })
        }
      }
      return newOffers
    })
  }

  const addOffer = () => {
    setOffers((prev) => [...prev, { services: 0, mobile: 0, notes: "" }])
    trackWithUser("add_offer", {
      totalOffers: offers.length + 1
    })
  }

  const deleteLastOffer = () => {
    if (offers.length <= 3) return // Prevent deleting if only 3 offers remain
    setOffers((prev) => prev.slice(0, -1))
    trackWithUser("delete_offer", {
      remainingOffers: offers.length - 1
    })
  }

  const resetCalculator = () => {
    // Track reset event with previous state info
    trackWithUser("reset_calculator", {
      hadCurrentCosts: current.services > 0 || current.mobile > 0,
      hadOffers: offers.some(o => o.services > 0 || o.mobile > 0),
      numberOfOffers: offers.length
    })
    
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

