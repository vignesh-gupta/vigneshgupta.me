"use client";

import RecommendationForm from "@/components/pages/recommendation-form";
import { useState } from "react";
import { Button } from "../ui/button";

type RecommendationScreen = "intro" | "form" | "success" | "error";

const RecommendationSection = () => {
  const [screen, setScreen] = useState<RecommendationScreen>("intro");

  if (screen === "intro") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-muted/10 p-6">
        <p className="text-center text-sm text-muted-foreground">
          If you have worked with me and would like to share your experience, I
          would greatly appreciate it if you could take a moment to write a
          recommendation. Your feedback is invaluable and will help me continue
          to grow and improve.
        </p>
        <Button onClick={() => setScreen("form")}>
          Write a Recommendation
        </Button>
      </div>
    );
  }

  if (screen === "success" || screen === "error") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-muted/10 p-6">
        {screen === "success" ? (
          <div className="text-center">
            <p className="font-semibold">Thank you!</p>
            <p className="text-sm text-muted-foreground">
              I really appreciate your recommendation and thank you for taking
              the time to share your thoughts. It means a lot to me!
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-center">
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm text-muted-foreground">
              Please try again later.
            </p>
            <Button onClick={() => setScreen("form")}>Try again</Button>
          </div>
        )}
      </div>
    );
  }

  if (screen === "form")
    return (
      <RecommendationForm
        setResult={(success) => setScreen(success ? "success" : "error")}
      />
    );

  return null;
};

export default RecommendationSection;
