"use client"

import { useState, type ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { OfferState, OfferResult } from "@/types/calculator"
import { LightbulbIcon } from "@/components/icons/LightbulbIcon"

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
        <div className="grid grid-cols-[120px_1fr] gap-2">
          <h3 className="font-medium flex items-center gap-2">
            <LightbulbIcon className="w-4 h-4" />
            Offer {index + 1}
          </h3>
          <Textarea 
            placeholder="Notes" 
            name="notes" 
            value={offer.notes} 
            onChange={handleOfferChange}
            rows={2}
            className="w-full min-h-[20px] px-2 py-1 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none" 
          />
        </div>

        <div className="grid grid-cols-5 gap-2">
          <div>
            <Label htmlFor={`offer-${index}-services`} className="text-sm text-blue-500 block">
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
              className="w-full h-7 rounded-md border border-input bg-background px-3 py-1 text-sm"
            />
          </div>
          <div>
            <Label htmlFor={`offer-${index}-mobile`} className="text-sm text-blue-500 block">
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
              className="w-full h-7 rounded-md border border-input bg-background px-3 py-1 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-500 block">Cost</Label>
            <Input 
              value={(offer.services > 0 || offer.mobile > 0) ? calculations?.householdCost.toFixed(2) : "0.00"} 
              readOnly 
              tabIndex={-1}
              className="w-full h-7 rounded-md border border-input bg-background px-3 py-1 text-sm text-center" 
            />
          </div>
          <div>
            <Label className="text-sm text-gray-500 block">Monthly</Label>
            <Input
              value={(offer.services > 0 || offer.mobile > 0) ? calculations?.monthlySavings.toFixed(2) : "0.00"}
              readOnly
              tabIndex={-1}
              className={`w-full h-7 rounded-md border border-input bg-background px-3 py-1 text-sm text-center ${
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
            <Label className="text-sm text-gray-500 block">Annual</Label>
            <Input
              value={(offer.services > 0 || offer.mobile > 0) ? calculations?.annualSavings.toFixed(2) : "0.00"}
              readOnly
              tabIndex={-1}
              className={`w-full h-7 rounded-md border border-input bg-background px-3 py-1 text-sm text-center ${
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

