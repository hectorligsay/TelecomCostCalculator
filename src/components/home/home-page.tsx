"use client"
import { Plus, Minus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import CurrentCostsCard from "@/components/costs/current-costs-card"
import OfferCard from "@/components/costs/offer-card"
import { useCalculator } from "@/hooks/use-calculator"

export default function HomePage() {
  const {
    current,
    offers,
    calculations,
    addOffer,
    deleteLastOffer,
    handleCurrentChange,
    handleOfferChange,
    resetCalculator,
  } = useCalculator()

  // Find the offer with the highest annual savings, excluding zero-value offers
  const bestOfferIndex = calculations.offerResults.reduce(
    (bestIdx, curr, idx) => {
      // Safely check if the offer exists and has values
      const offer = offers[idx]
      if (!offer) return bestIdx
      
      const hasValues = offer.services > 0 || offer.mobile > 0
      if (!hasValues) return bestIdx

      const bestSavings = calculations.offerResults[bestIdx]?.annualSavings ?? 0
      if (curr.annualSavings > bestSavings) {
        return idx
      }
      return bestIdx
    },
    -1 // Start with no best offer
  )

  return (
    <main className="container mx-auto p-4 max-w-4xl space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span role="img" aria-label="calculator" className="text-2xl">🧮</span>
          Cost Calculator
        </h1>
        <Button
          onClick={resetCalculator}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          title="New Customer"
        >
          <RefreshCw className="w-5 h-5" />
        </Button>
      </div>

      <CurrentCostsCard
        current={current}
        calculations={calculations}
        handleCurrentChange={handleCurrentChange}
      />

      <div className="space-y-4">
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            index={index}
            offer={offer}
            calculations={calculations.offerResults[index]}
            isBestOffer={bestOfferIndex === index}
            handleOfferChange={(e) => handleOfferChange(e, index)}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={addOffer}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Offer
        </Button>
        <Button
          onClick={deleteLastOffer}
          className="w-full bg-red-400 hover:bg-red-500 text-white transition-colors"
          disabled={offers.length <= 3}
        >
          <Minus className="w-4 h-4 mr-2" />
          Delete Last Offer
        </Button>
      </div>
    </main>
  )
}

