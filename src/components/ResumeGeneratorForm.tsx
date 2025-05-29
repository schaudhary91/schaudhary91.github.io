"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { generateResumeSummaryAction } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters.").max(100, "Role must be at most 100 characters."),
  keywords: z.string().min(2, "Keywords must be at least 2 characters.").max(200, "Keywords must be at most 200 characters."),
  experienceSummary: z.string().min(50, "Experience summary must be at least 50 characters.").max(1500, "Experience summary must be at most 1500 characters."),
});

export type ResumeGeneratorFormValues = z.infer<typeof formSchema>;

export function ResumeGeneratorForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);

  const form = useForm<ResumeGeneratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      keywords: "",
      experienceSummary: "",
    },
  });

  function onSubmit(values: ResumeGeneratorFormValues) {
    setGeneratedSummary(null); 
    startTransition(async () => {
      try {
        const result = await generateResumeSummaryAction(values);
        if (result.summary) {
          setGeneratedSummary(result.summary);
          toast({
            title: "Summary Generated!",
            description: "Your AI-powered resume summary is ready.",
          });
        } else {
          throw new Error("Failed to generate summary.");
        }
      } catch (error) {
        console.error("Error generating summary:", error);
        toast({
          title: "Error",
          description: (error as Error).message || "Could not generate resume summary. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">AI Resume Summary Generator</CardTitle>
        <CardDescription>
          Enter details about the desired role, keywords, and your experience to generate a tailored resume summary using AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Node.js, Team Leadership" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Experience Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a summary of your relevant experience, skills, and achievements..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Summary"
              )}
            </Button>
          </form>
        </Form>

        {generatedSummary && (
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold text-primary mb-2">Generated Summary:</h3>
            <p className="text-foreground/90 whitespace-pre-line">{generatedSummary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
