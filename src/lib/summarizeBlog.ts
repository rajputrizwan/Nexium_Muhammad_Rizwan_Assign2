import axios from "axios";
import toast from "react-hot-toast";

export const summarizeBlog = async (text: string): Promise<string> => {
  // Show loading toast while description is being generated
  const toastId = toast.loading("Generating production description...", {
    duration: Infinity,
  });

  try {
    // Send request to your backend API route
    const res = await axios.post("/api/summary", { text });

    // Check for valid response
    if (!res.data?.summary || typeof res.data.summary !== "string") {
      throw new Error("No description returned");
    }

    // Success: dismiss loading toast and show success
    toast.dismiss(toastId);
    toast.success("Description generated successfully");

    return res.data.summary;
  } catch (error) {
    // Error: dismiss loading toast and show error toast
    console.error("Error generating description:", error);
    toast.dismiss(toastId);
    toast.error("Failed to generate description");
    throw error;
  }
};
