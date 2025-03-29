"use client"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import CurrentCostsCard from "@/components/costs/current-costs-card"
import OfferCard from "@/components/costs/offer-card"
import { useCalculator } from "@/hooks/use-calculator"

export default function HomePage() {
  const { current, offers, calculations, handleCurrentChange, handleOfferChange, addOffer, deleteLastOffer } = useCalculator()

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">Cost Calculator</h1>

        <div className="space-y-6">
          <CurrentCostsCard current={current} calculations={calculations} handleCurrentChange={handleCurrentChange} />

          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              index={index}
              offer={offer}
              calculations={calculations.offerResults[index]}
              handleOfferChange={(e) => handleOfferChange(index, e)}
            />
          ))}

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={addOffer}
              className="h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Another Offer
            </Button>
            
            <Button
              onClick={deleteLastOffer}
              className="h-12 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
              disabled={offers.length <= 2}
            >
              <Minus className="w-5 h-5" />
              Delete Last Offer
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

