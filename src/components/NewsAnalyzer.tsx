
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type CredibilityLevel = "high" | "medium" | "low" | null;

const NewsAnalyzer = () => {
  const [newsText, setNewsText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [credibility, setCredibility] = useState<CredibilityLevel>(null);
  const [analyzed, setAnalyzed] = useState(false);
  const { toast } = useToast();

  const analyzeFakeNews = () => {
    if (newsText.trim().length < 20) {
      toast({
        title: "Not enough text",
        description: "Please enter at least 20 characters to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalyzed(false);

    // Simulate analysis with a timeout
    setTimeout(() => {
      // For demo purposes, we'll randomly assign credibility
      // In a real app, this would be replaced with actual ML analysis
      const randomValue = Math.random();
      let result: CredibilityLevel;
      
      if (randomValue < 0.33) {
        result = "low";
      } else if (randomValue < 0.66) {
        result = "medium";
      } else {
        result = "high";
      }
      
      setCredibility(result);
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const getCredibilityInfo = () => {
    switch (credibility) {
      case "high":
        return {
          icon: <Check className="h-8 w-8 text-truth-high" />,
          title: "Likely Credible",
          color: "text-truth-high",
          bgColor: "bg-truth-high",
          description: "This content appears to be from reliable sources and contains factually accurate information.",
          score: 90
        };
      case "medium":
        return {
          icon: <AlertTriangle className="h-8 w-8 text-truth-medium" />,
          title: "Potentially Misleading",
          color: "text-truth-medium",
          bgColor: "bg-truth-medium",
          description: "This content may contain some misleading information or requires further verification.",
          score: 50
        };
      case "low":
        return {
          icon: <X className="h-8 w-8 text-truth-low" />,
          title: "Likely Fake News",
          color: "text-truth-low",
          bgColor: "bg-truth-low",
          description: "This content contains information that appears to be false or highly misleading.",
          score: 15
        };
      default:
        return {
          icon: null,
          title: "",
          color: "",
          bgColor: "",
          description: "",
          score: 0
        };
    }
  };

  const info = getCredibilityInfo();

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold text-center">
          Detect Fake News
        </h1>
        <p className="text-muted-foreground text-center">
          Paste news content below to analyze its credibility
        </p>
      </div>

      <div className="space-y-4">
        <Textarea 
          placeholder="Paste news article or statement here..." 
          className="min-h-[200px] resize-none"
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
        />
        
        <Button 
          className="w-full" 
          size="lg"
          onClick={analyzeFakeNews}
          disabled={isAnalyzing || newsText.trim().length < 20}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Credibility"}
        </Button>
      </div>

      {isAnalyzing && (
        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle>Analyzing Content</CardTitle>
            <CardDescription>
              Our AI system is checking the credibility...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress 
              value={100} 
              className="animate-pulse-slow transition-all" 
            />
          </CardContent>
        </Card>
      )}

      {analyzed && !isAnalyzing && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {info.icon}
                <CardTitle className={info.color}>{info.title}</CardTitle>
              </div>
              <div className="text-2xl font-bold">{info.score}%</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{info.description}</p>
            <Progress value={info.score} className={info.bgColor} />
            <div className="pt-4">
              <h4 className="font-medium mb-2">Verification Tips:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Check if other reputable sources are reporting the same information</li>
                <li>Verify the author or publisher's credentials</li>
                <li>Look for cited sources within the article</li>
                <li>Consider if the content seems emotionally manipulative</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewsAnalyzer;
