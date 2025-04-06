
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";

const Report = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    category: "",
    description: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url || !formData.category || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields in the form.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      toast({
        title: "Report submitted",
        description: "Thank you for helping us combat misinformation.",
      });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  if (submitted) {
    return (
      <div className="container max-w-2xl py-12 px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Report Submitted</CardTitle>
            <CardDescription>
              Thank you for helping combat misinformation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our team will review your report and take appropriate action. Your
              contribution helps make the internet a more trustworthy place.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  url: "",
                  category: "",
                  description: "",
                });
              }}
            >
              Submit Another Report
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Report Fake News</h1>
        <p className="text-muted-foreground">
          Help us combat misinformation by reporting suspicious content
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>
              Please provide information about the suspicious content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Content URL</label>
              <Input
                name="url"
                placeholder="https://example.com/article"
                value={formData.url}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                Enter the web address where you found the suspicious content
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="political">Political Misinformation</SelectItem>
                  <SelectItem value="health">Health Misinformation</SelectItem>
                  <SelectItem value="financial">Financial Scam</SelectItem>
                  <SelectItem value="scientific">Scientific Misinformation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                placeholder="Describe why you believe this content contains misinformation..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Report
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Report;
