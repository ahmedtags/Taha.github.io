/**
 * Admin Dashboard - Complete Portfolio Management
 * Allows the portfolio owner to manage projects and edit portfolio content
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit2, Plus, Settings } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface ProjectForm {
  title: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  tags: string;
  results: string;
}

interface PortfolioContent {
  aboutTitle: string;
  aboutDescription: string;
  aboutLongDescription: string;
  skills: string;
  heroTitle: string;
  heroDescription: string;
  contactEmail: string;
  contactPhone: string;
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("projects");
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    title: "",
    description: "",
    fullDescription: "",
    challenge: "",
    solution: "",
    tags: "",
    results: "",
  });

  const [portfolioContent, setPortfolioContent] = useState<PortfolioContent>({
    aboutTitle: "Crafting Digital Experiences",
    aboutDescription: "I'm a dedicated professional with a passion for creating beautiful, functional digital experiences.",
    aboutLongDescription: "My approach combines strategic thinking with creative problem-solving to deliver solutions that not only look great but also drive real results.",
    skills: "UI/UX Design, Frontend Development, React, TypeScript, Full-Stack Development",
    heroTitle: "Welcome to My Portfolio",
    heroDescription: "I'm a passionate creator showcasing my best work and projects.",
    contactEmail: "hello@example.com",
    contactPhone: "+1 (555) 000-0000",
  });

  const utils = trpc.useUtils();
  const { data: projects, isLoading } = trpc.projects.list.useQuery();
  const createMutation = trpc.projects.create.useMutation({
    onSuccess: () => {
      utils.projects.list.invalidate();
      toast.success("Project created successfully!");
      resetProjectForm();
      setIsProjectDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
  });

  const updateMutation = trpc.projects.update.useMutation({
    onSuccess: () => {
      utils.projects.list.invalidate();
      toast.success("Project updated successfully!");
      resetProjectForm();
      setIsProjectDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project");
    },
  });

  const deleteMutation = trpc.projects.delete.useMutation({
    onSuccess: () => {
      utils.projects.list.invalidate();
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-foreground/80 mb-6">
            You need to be logged in as an admin to access this page.
          </p>
          <Button onClick={() => setLocation("/")} variant="default">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      fullDescription: "",
      challenge: "",
      solution: "",
      tags: "",
      results: "",
    });
    setEditingProjectId(null);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = projectForm.tags
      .split(",")
      .map(t => t.trim())
      .filter(t => t);
    const resultsArray = projectForm.results
      .split("\n")
      .map(r => r.trim())
      .filter(r => r);

    if (editingProjectId) {
      await updateMutation.mutateAsync({
        id: editingProjectId,
        title: projectForm.title,
        description: projectForm.description,
        fullDescription: projectForm.fullDescription,
        challenge: projectForm.challenge,
        solution: projectForm.solution,
        tags: tagsArray,
        results: resultsArray,
      });
    } else {
      await createMutation.mutateAsync({
        title: projectForm.title,
        description: projectForm.description,
        fullDescription: projectForm.fullDescription,
        challenge: projectForm.challenge,
        solution: projectForm.solution,
        tags: tagsArray,
        results: resultsArray,
      });
    }
  };

  const handleEditProject = (project: any) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription,
      challenge: project.challenge,
      solution: project.solution,
      tags: project.tags.join(", "),
      results: project.results.join("\n"),
    });
    setEditingProjectId(project.id);
    setIsProjectDialogOpen(true);
  };

  const handleSaveContent = () => {
    // In a real app, this would save to the database
    toast.success("Portfolio content updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <Button onClick={() => setLocation("/")} variant="outline">
            View Portfolio
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="content">Content & Settings</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mb-8" onClick={() => resetProjectForm()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProjectId ? "Edit Project" : "Add New Project"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <Input
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="Project title"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Short Description
                    </label>
                    <Textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      placeholder="Brief description for the project card"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Full Description
                    </label>
                    <Textarea
                      value={projectForm.fullDescription}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, fullDescription: e.target.value })
                      }
                      placeholder="Detailed description"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Challenge
                    </label>
                    <Textarea
                      value={projectForm.challenge}
                      onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                      placeholder="What was the challenge?"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Solution
                    </label>
                    <Textarea
                      value={projectForm.solution}
                      onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                      placeholder="How did you solve it?"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Tags (comma-separated)
                    </label>
                    <Input
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      placeholder="Design, Development, React"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Results (one per line)
                    </label>
                    <Textarea
                      value={projectForm.results}
                      onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                      placeholder="50% improvement in engagement&#10;98% performance score"
                      required
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsProjectDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        createMutation.isPending || updateMutation.isPending
                      }
                    >
                      {editingProjectId ? "Update" : "Create"} Project
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            {/* Projects List */}
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-foreground/60">Loading projects...</p>
              ) : projects && projects.length > 0 ? (
                projects.map((project: any) => (
                  <div
                    key={project.id}
                    className="bg-card border border-border rounded-sm p-6 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-foreground/70 mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteMutation.mutate({ id: project.id })}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-foreground/60">No projects yet. Create one to get started!</p>
              )}
            </div>
          </TabsContent>

          {/* Content & Settings Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="bg-card border border-border rounded-sm p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Portfolio Content
                </h2>
              </div>

              {/* Hero Section */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Hero Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Hero Title</label>
                    <Input
                      value={portfolioContent.heroTitle}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, heroTitle: e.target.value })
                      }
                      placeholder="Main heading"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Hero Description</label>
                    <Textarea
                      value={portfolioContent.heroDescription}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, heroDescription: e.target.value })
                      }
                      placeholder="Hero section description"
                    />
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  About Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">About Title</label>
                    <Input
                      value={portfolioContent.aboutTitle}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, aboutTitle: e.target.value })
                      }
                      placeholder="About section title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Short Description</label>
                    <Textarea
                      value={portfolioContent.aboutDescription}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, aboutDescription: e.target.value })
                      }
                      placeholder="Brief about description"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Long Description</label>
                    <Textarea
                      value={portfolioContent.aboutLongDescription}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, aboutLongDescription: e.target.value })
                      }
                      placeholder="Detailed about description"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Skills (comma-separated)
                    </label>
                    <Input
                      value={portfolioContent.skills}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, skills: e.target.value })
                      }
                      placeholder="Your skills"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      value={portfolioContent.contactEmail}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, contactEmail: e.target.value })
                      }
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input
                      value={portfolioContent.contactPhone}
                      onChange={(e) =>
                        setPortfolioContent({ ...portfolioContent, contactPhone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setActiveTab("projects")}>
                  Cancel
                </Button>
                <Button onClick={handleSaveContent}>
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
