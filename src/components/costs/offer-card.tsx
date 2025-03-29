"use client"

import { useState, type ChangeEvent } from "react"
import { Input, Label, Card, Textarea } from "@/components/ui"
import type { OfferState, OfferResult } from "@/types/calculator"

interface OfferCardProps {
  index: number
  offer: OfferState
  calculations: OfferResult
  isBestOffer?: boolean
  handleOfferChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function OfferCard({ index, offer, calculations, isBestOffer, handleOfferChange }: OfferCardProps) {
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
    <Card className={`p-2 bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
      isBestOffer ? 'border-green-500 bg-green-50/50 ring-1 ring-green-500/20' : 'border-gray-200'
    }`}>
      <div className="space-y-1.5">
        <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
          <h2 className={`text-base font-semibold pt-1 flex items-center ${
            isBestOffer ? 'text-green-600' : 'text-blue-500'
          }`}>
            <span role="img" aria-label="offer" className="text-lg w-5 mr-2">💡</span>
            <span className="min-w-[60px]">Offer {index + 1}</span>
          </h2>
          <Textarea 
            placeholder="Notes" 
            name="notes" 
            value={offer.notes} 
            onChange={handleOfferChange}
            rows={2}
            className="w-full min-h-[20px] px-2 py-1 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none" 
          />
        </div>

        <div className="grid grid-cols-[1fr_1fr_repeat(3,_minmax(90px,_1fr))] gap-2 items-end">
          <div>
            <Label htmlFor={`offer-${index}-services`} className="text-xs font-medium text-blue-500 mb-0.5 block">
              Services
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
              className="w-full h-7 px-2 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <Label htmlFor={`offer-${index}-mobile`} className="text-xs font-medium text-blue-500 mb-0.5 block">
              Mobile
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
              className="w-full h-7 px-2 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-500 mb-0.5 block text-center">Cost</Label>
            <Input 
              value={(offer.services > 0 || offer.mobile > 0) ? calculations?.householdCost.toFixed(2) : "0.00"} 
              readOnly 
              tabIndex={-1}
              className="w-full h-7 px-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm text-center" 
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-500 mb-0.5 block text-center">Monthly</Label>
            <Input
              value={(offer.services > 0 || offer.mobile > 0) ? calculations?.monthlySavings.toFixed(2) : "0.00"}
              readOnly
              tabIndex={-1}
              className={`w-full h-7 px-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-center ${
                (offer.services > 0 || offer.mobile > 0) 
                  ? calculations?.monthlySavings > 0 
                    ? 'text-green-600' 
                    : calculations?.monthlySavings < 0 
                      ? 'text-red-600'
                      : 'text-gray-500'
                  : 'text-gray-500'
              }`}
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-gray-500 mb-0.5 block text-center">Annual</Label>
            <Input
              value={(offer.services > 0 || offer.mobile > 0) ? calculations?.annualSavings.toFixed(2) : "0.00"}
              readOnly
              tabIndex={-1}
              className={`w-full h-7 px-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-center ${
                (offer.services > 0 || offer.mobile > 0)
                  ? calculations?.annualSavings > 0
                    ? 'text-green-600'
                    : calculations?.annualSavings < 0
                      ? 'text-red-600'
                      : 'text-gray-500'
                  : 'text-gray-500'
              }`}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

