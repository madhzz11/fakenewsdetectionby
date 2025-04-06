
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertTriangle } from "lucide-react";

const About = () => {
  return (
    <div className="container max-w-4xl py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About TruthGuardian</h1>
        <p className="text-xl text-muted-foreground">
          Your first line of defense against misinformation
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Understanding our news verification process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TruthGuardian uses a combination of natural language processing and 
              machine learning algorithms to analyze news content and determine 
              its credibility. The system evaluates several factors including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Language patterns common in misleading content</li>
              <li>Sensationalist or emotionally manipulative wording</li>
              <li>Source reputation and content consistency</li>
              <li>Factual accuracy compared to verified information</li>
              <li>Context and perspective analysis</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2">
                <Check className="h-8 w-8 text-truth-high" />
              </div>
              <CardTitle>High Credibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Content that comes from reliable sources, contains verifiable 
                facts, and presents information in a balanced way.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2">
                <AlertTriangle className="h-8 w-8 text-truth-medium" />
              </div>
              <CardTitle>Medium Credibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Content that may mix facts with misleading information, use sensationalist 
                language, or come from sources with mixed reliability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2">
                <X className="h-8 w-8 text-truth-low" />
              </div>
              <CardTitle>Low Credibility</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Content that contains false information, comes from unreliable sources, 
                or uses highly manipulative or deceptive language.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
            <CardDescription>
              Understanding the boundaries of automated fact-checking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              While our system provides a helpful first assessment, it's important to understand its limitations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No automated system can replace critical thinking and personal judgment</li>
              <li>Our algorithms continue to improve but may not catch all forms of misinformation</li>
              <li>Some content requires deep domain expertise to properly evaluate</li>
              <li>The system works best with news articles and may be less effective with other content types</li>
            </ul>
            <p className="font-medium pt-2">
              For the most reliable assessment, always cross-reference information with multiple trustworthy sources.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
