import { Check } from 'lucide-react'

export default function StepIndicator({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-accent text-white' : 'bg-card text-white'
            }`}>
            {index < currentStep ? (
              <Check className="w-6 h-6" />
            ) : (
              <span className="text-lg font-medium">{index + 1}</span>
            )}
          </div>
          <span className="ml-4 text-base font-medium">{step}</span>
        </div>
      ))}
    </div>
  )
}


