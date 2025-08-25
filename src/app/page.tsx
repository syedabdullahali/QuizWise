import MultiStepForm from "@/components/MultiStepForm";
import { ToastContainer } from "react-toastify"
export default function HomePage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-semibold">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      <p className="text-sm text-gray-600">
        Answer 5 quick questions to get your personalized recommendation.
      </p>
      <MultiStepForm />
      <ToastContainer position="top-center" />
    </div>
  );
}