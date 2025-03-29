"use client"

import { useState, type ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import type { OfferState, OfferResult } from "@/types/calculator"

interface OfferCardProps {
  index: number
  offer: OfferState
  calculations: OfferResult
  handleOfferChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function OfferCard({ index, offer, calculations, handleOfferChange }: OfferCardProps) {
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const formatValue = (value: number, inputId: string) => {
    if (focusedInput === inputId) {
      return value === 0 ? "" : value.toString()
    }
    if (value === 0) {
      return "0.00"
    }
    return value.toString()
  }

  return (
    <Card className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-500">Offer {index + 1}</h2>
          <Input 
            placeholder="Notes" 
            name="notes" 
            value={offer.notes} 
            onChange={handleOfferChange} 
            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1.5">
            <Label htmlFor={`offer-${index}-services`} className="text-sm font-medium text-blue-500">
              Offer Services
            </Label>
            <Input
              id={`offer-${index}-services`}
              name="services"
              type="number"
              step="0.01"
              value={formatValue(offer.services, `offer-${index}-services`)}
              onChange={handleOfferChange}
              onFocus={() => setFocusedInput(`offer-${index}-services`)}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`offer-${index}-mobile`} className="text-sm font-medium text-blue-500">
              Offer Mobile
            </Label>
            <Input
              id={`offer-${index}-mobile`}
              name="mobile"
              type="number"
              step="0.01"
              value={formatValue(offer.mobile, `offer-${index}-mobile`)}
              onChange={handleOfferChange}
              onFocus={() => setFocusedInput(`offer-${index}-mobile`)}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-blue-500">Household Cost</Label>
            <Input 
              value={calculations?.householdCost.toFixed(2) || "0.00"} 
              readOnly 
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-500" 
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-blue-500">Monthly Savings</Label>
            <Input
              value={calculations?.monthlySavings.toFixed(2) || "0.00"}
              readOnly
              className={`w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md font-medium ${
                calculations?.monthlySavings > 0 ? 'text-green-600' : 'text-gray-500'
              }`}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-blue-500">Annual Savings</Label>
            <Input
              value={calculations?.annualSavings.toFixed(2) || "0.00"}
              readOnly
              className={`w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md font-medium ${
                calculations?.annualSavings > 0 ? 'text-green-600' : 'text-gray-500'
              }`}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

