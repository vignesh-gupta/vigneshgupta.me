"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as motion from "motion/react-client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  company: z.string().optional(),
  relationship: z.string().optional(),
  profileUrl: z.string().optional().refine((v) => !v || v === "" || /^https?:\/\//.test(v), { message: "Invalid URL" }),
  quote: z.string().min(1, "Please enter your recommendation").max(1000),
});

type RecommendationFormProps = {
  setResult: (success: boolean) => void;
};

const RecommendationForm = ({ setResult }: RecommendationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      relationship: "",
      profileUrl: "",
      quote: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const res = await fetch("/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      form.reset();
      setResult(true);
    } else {
      setResult(false);
    }

    setIsLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-muted/10 pb-3"
    >
      <div className="relative flex flex-col items-center justify-center py-4">
        <div className="hidden absolute left-4 top-5.5 md:flex gap-2">
          <div className="size-4 rounded-full bg-[#FF6057]" />
          <div className="size-4 rounded-full bg-[#FDBC2E]" />
          <div className="size-4 rounded-full bg-[#27C840]" />
        </div>
        <p className="mb-4 font-medium text-onyx dark:text-white">Share a Recommendation</p>
        <div className="h-px w-full bg-black/10 dark:bg-white/10" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 px-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 my-4">
                <FormLabel className="md:text-lg">Name:</FormLabel>
                <FormControl className="flex">
                  <input
                    className="flex-1 ml-2 text-onyx caret-fuchsia-400 placeholder:text-muted focus:outline-none focus:ring-0 dark:text-muted-foreground dark:placeholder:text-muted/50 bg-transparent"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="select-none" />
              </FormItem>
            )}
          />

          <div className="h-px w-full bg-black/10 dark:bg-white/10" />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 my-4">
                <FormLabel className="md:text-lg">Role:</FormLabel>
                <FormControl className="flex">
                  <input
                    className="flex-1 ml-2 text-onyx caret-fuchsia-400 placeholder:text-muted focus:outline-none focus:ring-0 dark:text-muted-foreground dark:placeholder:text-muted/50 bg-transparent"
                    placeholder="e.g., Senior Engineer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-px w-full bg-black/10 dark:bg-white/10" />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 my-4">
                <FormLabel className="md:text-lg">Company:</FormLabel>
                <FormControl className="flex">
                  <input
                    className="flex-1 ml-2 text-onyx caret-fuchsia-400 placeholder:text-muted focus:outline-none focus:ring-0 dark:text-muted-foreground dark:placeholder:text-muted/50 bg-transparent"
                    placeholder="Company (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-px w-full bg-black/10 dark:bg-white/10" />

          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 my-4">
                <FormLabel className="md:text-lg">Relationship:</FormLabel>
                <FormControl className="flex">
                  <input
                    className="flex-1 ml-2 text-onyx caret-fuchsia-400 placeholder:text-muted focus:outline-none focus:ring-0 dark:text-muted-foreground dark:placeholder:text-muted/50 bg-transparent"
                    placeholder="How you worked together"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-px w-full bg-black/10 dark:bg-white/10" />

          <FormField
            control={form.control}
            name="profileUrl"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 my-4">
                <FormLabel className="md:text-lg">Profile URL:</FormLabel>
                <FormControl className="flex">
                  <input
                    className="flex-1 ml-2 text-onyx caret-fuchsia-400 placeholder:text-muted focus:outline-none focus:ring-0 dark:text-muted-foreground dark:placeholder:text-muted/50 bg-transparent"
                    placeholder="LinkedIn or public profile (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="h-px w-full bg-black/10 dark:bg-white/10" />

          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0 my-4 relative">
                <FormControl className="flex">
                  <textarea
                    placeholder="Write your recommendation here"
                    maxLength={1000}
                    className="min-h-50 md:min-h-80 w-full resize-none rounded-lg  bg-white/40 dark:bg-black/40 p-4 text-onyx dark:text-muted-foreground caret-fuchsia-400 placeholder:text-muted focus:outline-none focus:ring-0 border border-muted/20"
                    {...field}
                  />
                </FormControl>
                <div className="absolute right-2 bottom-2 text-muted text-sm flex">
                  <FormMessage />
                  <p>{field.value?.length || 0}/1000</p>
                </div>
              </FormItem>
            )}
          />

          <Button
            className="ml-auto py-6 bg-gradient hover:bg-gradient primary-button dark:text-muted text-white dark:hover:text-white font-medium transition duration-300 w-full md:w-auto"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="w-6 h-6 mr-2 animate-spin" /> Sending
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default RecommendationForm;
