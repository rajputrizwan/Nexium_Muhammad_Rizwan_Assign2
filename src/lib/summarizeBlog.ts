// lib/summarizeBlog.ts
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const summarizeBlog = async (text: string): Promise<string> => {
  const toastId = toast.loading("Generating summary...", {
    duration: Infinity,
  });

  try {
    const res = await axios.post("/api/summary", { blogText: text });

    console.log("API Response:", res.data); // Debug log

    const responseData = res.data;

    // Check if we have a valid summary in the response
    if (
      responseData &&
      responseData.summary &&
      typeof responseData.summary === "string"
    ) {
      const summary = responseData.summary;

      toast.dismiss(toastId);
      toast.success("Summary generated successfully");

      return summary;
    } else {
      const errorMessage =
        responseData?.error || "No summary returned from API";
      throw new Error(errorMessage);
    }
  } catch (error: unknown) {
    toast.dismiss(toastId);

    // Handle AxiosError specifically
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: string }>;
      console.error("Error generating summary:", axiosError);
      if (axiosError.response?.data?.error) {
        toast.error(`Failed: ${axiosError.response.data.error}`);
      } else if (axiosError.message) {
        toast.error(`Failed: ${axiosError.message}`);
      } else {
        toast.error("Failed to generate summary");
      }
    } else if (error instanceof Error) {
      console.error("Error generating summary:", error.message);
      toast.error(`Failed: ${error.message}`);
    } else {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    }

    throw error;
  }
};
