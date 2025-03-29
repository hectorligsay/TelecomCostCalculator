"use client"

import { useState, type ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { CurrentState, CalculationsState } from "@/types/calculator"

interface CurrentCostsCardProps {
  current: CurrentState
  calculations: CalculationsState
  handleCurrentChange: (e: ChangeEvent<HTMLInputElement>) => void
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
    <Card className="p-6 bg-white rounded-lg border border-gray-200">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-600">Current Costs</h2>
          <Input
            placeholder="Notes"
            name="notes"
            value={current.notes}
            onChange={handleCurrentChange}
            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-services" className="text-sm font-medium text-blue-600">
              Current Services
            </Label>
            <Input
              id="current-services"
              name="services"
              type="number"
              step="0.01"
              value={formatValue(current.services, "current-services")}
              onChange={handleCurrentChange}
              onFocus={() => setFocusedInput("current-services")}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="threshold" className="text-sm font-medium text-blue-600">
              Threshold
            </Label>
            <Input 
              id="threshold" 
              value={calculations.threshold.toFixed(2)} 
              readOnly 
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-500" 
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="current-mobile" className="text-sm font-medium text-blue-600">
              Current Mobile
            </Label>
            <Input
              id="current-mobile"
              name="mobile"
              type="number"
              step="0.01"
              value={formatValue(current.mobile, "current-mobile")}
              onChange={handleCurrentChange}
              onFocus={() => setFocusedInput("current-mobile")}
              onBlur={() => setFocusedInput(null)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="current-household-cost" className="text-sm font-medium text-blue-600">
              Current Household Cost
            </Label>
            <Input
              id="current-household-cost"
              value={calculations.currentHouseholdCost.toFixed(2)}
              readOnly
              className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-500"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

