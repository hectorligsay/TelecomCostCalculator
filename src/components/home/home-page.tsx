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
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Offer
            </Button>
            <Button
              onClick={deleteLastOffer}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={offers.length <= 3}
            >
              <Minus className="mr-2 h-4 w-4" />
              Delete Last Offer
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

