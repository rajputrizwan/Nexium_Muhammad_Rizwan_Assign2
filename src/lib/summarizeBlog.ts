import axios from "axios";
import toast from "react-hot-toast";

export const summarizeBlog = async (
  text: string,
  userId?: string
): Promise<string> => {
  const webhookURL = "http://localhost:5678/webhook-test/blog-summarizer";

  // Show persistent loading toast
  const toastId = toast.loading("Sending to n8n webhook...", {
    duration: Infinity,
  });

  try {
    const res = await axios.post(webhookURL, { text });

    if (!res.data?.summary || typeof res.data.summary !== "string") {
      throw new Error("Summary not found in response");
    }

    const summary = res.data.summary;

    // Save the summary in your database
    await axios.post("/api/summary", {
      text,
      summary,
      userId,
    });

    // Dismiss loading and show success
    toast.dismiss(toastId);
    toast.success("Summary received successfully!", { duration: 6000 });

    return summary;
  } catch (error) {
    console.error("Error summarizing blog:", error);

    // Dismiss loading and show error
    toast.dismiss(toastId);
    toast.error("Webhook call failed. Please try again.", { duration: 8000 });

    throw error;
  }
};
