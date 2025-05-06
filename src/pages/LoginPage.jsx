
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Briefcase, User } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('job-seeker');

  const handleLoginAttempt = (type) => {
    // Placeholder login logic
    // In a real app, you'd validate credentials against a backend/Supabase
    const emailInput = document.getElementById(`${type}-email`);
    const passwordInput = document.getElementById(`${type}-password`);

    if (emailInput?.value && passwordInput?.value) {
      onLogin(type); // Call the function passed from App.jsx
      navigate(`/${type}-dashboard`);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please enter both email and password.",
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Tabs defaultValue="job-seeker" className="w-[400px]" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-2 bg-blue-100">
            <TabsTrigger value="job-seeker" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="mr-2 h-4 w-4" /> Job Seeker
            </TabsTrigger>
            <TabsTrigger value="employer" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase className="mr-2 h-4 w-4" /> Employer
            </TabsTrigger>
          </TabsList>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="job-seeker">
              <Card>
                <CardHeader>
                  <CardTitle>Job Seeker Login</CardTitle>
                  <CardDescription>
                    Access your dashboard to find jobs and manage your profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="job-seeker-email">Email</Label>
                    <Input id="job-seeker-email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-seeker-password">Password</Label>
                    <Input id="job-seeker-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white" onClick={() => handleLoginAttempt('job-seeker')}>
                    Login as Job Seeker
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="employer">
              <Card>
                <CardHeader>
                  <CardTitle>Employer Login</CardTitle>
                  <CardDescription>
                    Access your dashboard to post jobs and find candidates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employer-email">Company Email</Label>
                    <Input id="employer-email" type="email" placeholder="company@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer-password">Password</Label>
                    <Input id="employer-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white" onClick={() => handleLoginAttempt('employer')}>
                    Login as Employer
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default LoginPage;
  