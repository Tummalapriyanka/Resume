
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UploadCloud, FileText, BarChart, X } from 'lucide-react';

// Mock data for demonstration
const mockJobs = [
  { id: 1, title: 'Frontend Developer', company: 'Tech Solutions Inc.', match: 85, examPattern: 'MCQ Test (React, JS), Coding Challenge (Easy), HR Interview' },
  { id: 2, title: 'UX/UI Designer', company: 'Creative Minds Agency', match: 70, examPattern: 'Portfolio Review, Design Task, Presentation, Manager Interview' },
  { id: 3, title: 'Data Analyst', company: 'Data Insights Co.', match: 92, examPattern: 'SQL Test, Python Test (Pandas), Case Study, Technical Interview' },
];

const JobSeekerDashboard = ({ onLogout }) => {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type === "text/plain")) {
      setResumeFile(file);
      toast({
        title: "Resume Selected",
        description: `${file.name}`,
      });
      // Reset analysis on new file selection
      setAnalysisResult(null);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload a PDF, DOCX, or TXT file.",
      });
      event.target.value = null; // Clear the input
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyzeResume = () => {
    if (!resumeFile) {
      toast({
        variant: "destructive",
        title: "No Resume Selected",
        description: "Please select a resume file first.",
      });
      return;
    }

    // **Placeholder for NLP Analysis**
    // In a real app, you would send the resumeFile to a backend/API
    // that performs NLP analysis and returns skills and job matches.
    toast({
      title: "Analyzing Resume...",
      description: "This might take a moment. (Simulation)",
    });

    setTimeout(() => {
      // Simulate analysis result
      const simulatedSkills = ["React", "JavaScript", "TailwindCSS", "Problem Solving", "Communication"];
      setAnalysisResult({
        skills: simulatedSkills,
        matchedJobs: mockJobs.map(job => ({
          ...job,
          // Simulate match score based on overlap (very basic)
          match: Math.min(95, Math.floor(Math.random() * 30) + 65) // Random score between 65-95
        })).sort((a, b) => b.match - a.match) // Sort by match score
      });
      toast({
        title: "Analysis Complete",
        description: "Found potential job matches based on your resume.",
      });
    }, 1500); // Simulate network delay
  };

  const removeFile = () => {
    setResumeFile(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = null; // Clear the file input
    }
    toast({
        title: "Resume Removed",
    });
};


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-primary">Job Seeker Dashboard</h1>
        <Button variant="outline" onClick={onLogout}>Logout</Button>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resume Upload Section */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-white shadow-lg border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <FileText className="mr-2 h-5 w-5" /> Your Resume
              </CardTitle>
              <CardDescription>Upload your latest resume to get matched.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.docx,.txt"
              />
              {!resumeFile ? (
                 <motion.div
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ type: "spring", stiffness: 260, damping: 20 }}
                 className="text-center"
               >
                <Button variant="secondary" size="lg" onClick={handleUploadClick} className="bg-white border border-blue-300 hover:bg-blue-100 text-blue-700">
                  <UploadCloud className="mr-2 h-5 w-5" /> Select Resume
                </Button>
                <p className="text-xs text-muted-foreground mt-2">PDF, DOCX, or TXT files only</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-3 p-4 bg-blue-100 rounded-lg border border-blue-300 w-full"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-blue-900 truncate pr-2">{resumeFile.name}</p>
                    <Button variant="ghost" size="icon" onClick={removeFile} className="h-6 w-6 text-red-500 hover:bg-red-100">
                        <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleAnalyzeResume} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    <BarChart className="mr-2 h-4 w-4" /> Analyze & Find Jobs
                  </Button>
                </motion.div>
              )}
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                    We'll extract skills to match you with the best opportunities.
                </p>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Analysis & Matches Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-800">Analysis & Job Matches</CardTitle>
              <CardDescription>
                {!analysisResult ? "Analyze your resume to see results here." : `Showing matches based on extracted skills:`}
                {analysisResult && (
                    <span className="ml-2 text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {analysisResult.skills.slice(0, 5).join(', ')}{analysisResult.skills.length > 5 ? '...' : ''}
                    </span>
                )}
                </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisResult ? (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {analysisResult.matchedJobs.map((job) => (
                    <motion.div key={job.id} variants={itemVariants}>
                      <Card className="border-l-4 border-primary bg-blue-50/50">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg text-blue-900">{job.title}</CardTitle>
                                <CardDescription className="text-sm text-blue-700">{job.company}</CardDescription>
                            </div>
                            <div className="text-right">
                                <span className={`text-lg font-semibold ${job.match >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{job.match}%</span>
                                <p className="text-xs text-muted-foreground">Match</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs font-semibold text-blue-800 mb-1">Exam Pattern:</p>
                          <p className="text-xs text-muted-foreground">{job.examPattern}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <BarChart className="mx-auto h-12 w-12 text-blue-300 mb-2" />
                    <p>Your job matches and analysis details will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JobSeekerDashboard;
  