
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
  const [analysisDetails, setAnalysisDetails] = useState("");
  const { toast } = useToast();

  const analyzeFakeNews = async () => {
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

    try {
      // Updated Gemini API endpoint and request structure
      const API_KEY = "AIzaSyC0vsQCRfEXbATciFuY1Mjdq7D2p7GARZw";
      const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent";
      
      const prompt = `Analyze the following news content and determine if it's likely real news, potentially misleading, or likely fake news. 
      Provide a credibility assessment (high, medium, or low) and a brief explanation of your reasoning. 
      Be objective and focus on factual accuracy, source credibility, and potential bias.
      
      News content: "${newsText}"
      
      Format your response as a JSON with two fields:
      1. "credibility": either "high", "medium", or "low"
      2. "explanation": your detailed reasoning
      `;

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Gemini API response:", data);
      
      // Extract the text response from Gemini
      const responseText = data.candidates[0]?.content?.parts[0]?.text;
      
      // Try to extract JSON from the response
      let analysisResult;
      try {
        // Look for JSON pattern in the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analysisResult = JSON.parse(jsonMatch[0]);
        } else {
          // Fallback if no JSON is found
          throw new Error("No JSON found in response");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        // Fallback analysis based on keywords in the response
        if (responseText.includes("high credibility") || responseText.includes("likely real")) {
          analysisResult = { credibility: "high", explanation: responseText };
        } else if (responseText.includes("low credibility") || responseText.includes("likely fake")) {
          analysisResult = { credibility: "low", explanation: responseText };
        } else {
          analysisResult = { credibility: "medium", explanation: responseText };
        }
      }
      
      setCredibility(analysisResult.credibility as CredibilityLevel);
      setAnalysisDetails(analysisResult.explanation);
      setAnalyzed(true);
    } catch (error) {
      console.error("Error analyzing news:", error);
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the content. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
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
          Paste news content below to analyze its credibility using AI
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
            
            {analysisDetails && (
              <div className="mt-4 p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">AI Analysis:</h4>
                <p className="text-sm">{analysisDetails}</p>
              </div>
            )}
            
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
