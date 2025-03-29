"use client"

import { useState, type ChangeEvent } from "react"
import { Input, Label, Card, Textarea } from "@/components/ui"
import type { CurrentState, CalculationsState } from "@/types/calculator"

interface CurrentCostsCardProps {
  current: CurrentState
  calculations: CalculationsState
  handleCurrentChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function CurrentCostsCard({ current, calculations, handleCurrentChange }: CurrentCostsCardProps) {
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
    <Card className="p-2 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md">
      <div className="space-y-1.5">
        <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
          <h2 className="text-base font-semibold text-blue-600 pt-1 flex items-center">
            <span role="img" aria-label="current costs" className="text-lg w-5 mr-2">📊</span>
            <span>Current</span>
          </h2>
          <Textarea
            placeholder="Notes"
            name="notes"
            value={current.notes}
            onChange={handleCurrentChange}
            rows={2}
            className="w-full min-h-[20px] px-2 py-1 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-[1fr_1fr_repeat(2,_minmax(90px,_1fr))] gap-2 items-end">
          <div>
            <Label htmlFor="current-services" className="text-xs font-medium text-blue-600 mb-0.5 block">Services</Label>
            <Input
              id="current-services"
              name="services"
              type="number"
              step="0.01"
              value={formatValue(current.services, "current-services")}
              onChange={handleCurrentChange}
              onFocus={() => setFocusedInput("current-services")}
              onBlur={() => setFocusedInput(null)}
              className="w-full h-7 px-2 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <Label htmlFor="current-mobile" className="text-xs font-medium text-blue-600 mb-0.5 block">Mobile</Label>
            <Input
              id="current-mobile"
              name="mobile"
              type="number"
              step="0.01"
              value={formatValue(current.mobile, "current-mobile")}
              onChange={handleCurrentChange}
              onFocus={() => setFocusedInput("current-mobile")}
              onBlur={() => setFocusedInput(null)}
              className="w-full h-7 px-2 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <Label htmlFor="threshold" className="text-xs font-medium text-blue-600 mb-0.5 block text-center">Threshold</Label>
            <Input 
              id="threshold" 
              value={calculations.threshold.toFixed(2)} 
              readOnly 
              tabIndex={-1}
              className="w-full h-7 px-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm text-center" 
            />
          </div>
          <div>
            <Label htmlFor="current-household-cost" className="text-xs font-medium text-blue-600 mb-0.5 block text-center">Cost</Label>
            <Input
              id="current-household-cost"
              value={calculations.currentHouseholdCost.toFixed(2)}
              readOnly
              tabIndex={-1}
              className="w-full h-7 px-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500 text-sm text-center"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

