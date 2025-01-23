import { Check } from 'lucide-react'
import { Button } from '../ui/button'

interface UploadSuccessProps {
  onReset: () => void;
}

export default function UploadSuccess({ onReset }: UploadSuccessProps) {
  return (
    <div className="mx-auto max-w-md text-center py-12 p-4">
      <div className="mb-14 flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <Check className="h-20 w-20 text-green-600" />
        </div>
      </div>
      <h2 className="mb-2 text-xl font-semibold">
        Yey !! Documents are uploaded successfully and are under review !!
      </h2>
      <p className="mb-8 text-sm text-muted-foreground">
        It takes 3-5 business days to review your documents
      </p>
      <div className="space-y-2">
        <Button onClick={onReset} className="w-full py-3 bg-[#3B016B] hover:bg-[#300057] ">
          Upload More Documents
        </Button>
        <Button variant="outline" className="w-full py-3">
          See Uploaded Documents
        </Button>
      </div>
    </div>
  )
}

