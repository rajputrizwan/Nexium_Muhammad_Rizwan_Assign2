import axios from "axios";
import toast from "react-hot-toast";

export const summarizeBlog = async (text: string): Promise<string> => {
  // Show loading toast while summary is being generated
  const toastId = toast.loading("Generating summary...", {
    duration: Infinity,
  });

  try {
    // Send request to your backend API route
    const res = await axios.post("/api/summary", { text });

    // Check for valid response
    if (!res.data?.summary || typeof res.data.summary !== "string") {
      throw new Error("No summary returned");
    }

    // Success: dismiss loading toast and show success
    toast.dismiss(toastId);
    toast.success("Summary generated successfully");

    return res.data.summary;
  } catch (error) {
    // Error: dismiss loading toast and show error toast
    console.error("Error generating summary:", error);
    toast.dismiss(toastId);
    toast.error("Failed to generate summary");
    throw error;
  }
};
