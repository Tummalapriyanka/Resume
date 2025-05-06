
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Users, PlusCircle } from 'lucide-react';


const EmployerDashboard = ({ onLogout }) => {
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
        <h1 className="text-3xl font-bold text-primary">Employer Dashboard</h1>
        <Button variant="outline" onClick={onLogout}>Logout</Button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Placeholder Cards for Employer Features */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Post a New Job
              </CardTitle>
              <PlusCircle className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Get Started</div>
              <p className="text-xs text-muted-foreground pt-1">
                Create a new job listing to find candidates.
              </p>
              <Button size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Create Job Post</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Manage Job Postings
              </CardTitle>
              <Briefcase className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">5 Active</div> {/* Example Data */}
              <p className="text-xs text-muted-foreground pt-1">
                View, edit, or deactivate your current job listings.
              </p>
               <Button size="sm" variant="outline" className="mt-4">View Postings</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Review Candidates
              </CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12 New</div> {/* Example Data */}
              <p className="text-xs text-muted-foreground pt-1">
                Review applications for your active jobs.
              </p>
               <Button size="sm" variant="outline" className="mt-4">View Applicants</Button>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>

       <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <Card className="mt-8 bg-white">
             <CardHeader>
                 <CardTitle className="text-blue-800">Welcome!</CardTitle>
                 <CardDescription>This is your central hub for managing job postings and finding the right talent for your company.</CardDescription>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground">More features coming soon!</p>
             </CardContent>
         </Card>
        </motion.div>
    </div>
  );
};

export default EmployerDashboard;
  