"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import About from "./About";
import Resume from "./Resume";
import Projects from "./Projects";
import Education from "./Education";
import Skills from "./Skills";
import Certificates from "./Certificates";
import UpcomingProject from "./UpcomingProject";
import Comments from "./Comments";

import {
  UserRound,
  FolderKanban,
  Code2,
  Award,
  GraduationCap,
  Rocket,
  FileText,
  MessageCircle,
} from "lucide-react";

export default function AdminPanel() {
  const router = useRouter();

  // =========================================================
  // ACTIVE TAB
  // =========================================================

  const [activeTab, setActiveTab] = useState("education");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // =========================================================
  // DATA
  // =========================================================

  const [items, setItems] = useState([]);

  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] = useState(false);

  // =========================================================
  // EDITING ID
  // =========================================================

  const [editingId, setEditingId] = useState(null);

  // =========================================================
  // ABOUT FORM
  // =========================================================

  const [aboutForm, setAboutForm] = useState({
    name: "Md. Injamamul Hoq",
    location: "Banani BTCL Colony, Dhaka",
    email: "injamamulhoqtamim@gmail.com",
    education: "BSc in CSE",
    intro:
      "a passionate Frontend Developer who loves building modern and responsive web applications.",
    paragraph1:
      "I specialize in creating beautiful user interfaces using HTML, CSS, JavaScript, Tailwind CSS and React. I also enjoy exploring Cybersecurity and learning how to build more secure web systems.",
    paragraph2:
      "My goal is to become a professional developer who creates innovative and secure digital experiences for people around the world.",
  });

  const [aboutLoading, setAboutLoading] = useState(false);
  const [aboutMessage, setAboutMessage] = useState("");

  // =========================================================
  // UPCOMING PROJECT
  // =========================================================

  const [upcomingProjectForm, setUpcomingProjectForm] = useState({
    title: "",
    tagline: "",
    desc: "",
    image: "",
    features: [],
    tech: [],
    order: 0,
    isActive: true,
  });

  const [featureInput, setFeatureInput] = useState({
    name: "",
    icon: "Sparkles",
  });

  const [techInput, setTechInput] = useState({
    name: "",
    icon: "Code2",
  });

  // =========================================================
  // PROJECT IMAGE
  // =========================================================

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // =========================================================
  // EDUCATION FORM
  // =========================================================

  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    passingYear: "",
    description: "",
  });

  // =========================================================
  // PROJECT FORM
  // =========================================================

  const [projectForm, setProjectForm] = useState({
    title: "",
    image: "",
    shortDescription: "",
    longDescription: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    challenges: "",
    futureImprovements: "",
  });

  // =========================================================
  // SKILLS FORM
  // =========================================================

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Frontend",
    level: 80,
    color: "#00d4ff",
    icon: "",
    order: 0,
  });

  // =========================================================
  // CERTIFICATES
  // =========================================================

  const [certificates, setCertificates] = useState([]);

  const [certificateForm, setCertificateForm] = useState({
    title: "",
    organization: "",
    date: "",
    order: 0,
  });

  const [certificateImageFile, setCertificateImageFile] =
    useState(null);

  const [certificateDocumentFile, setCertificateDocumentFile] =
    useState(null);

  const [certificateImagePreview, setCertificateImagePreview] =
    useState("");

  const [certificateDocumentName, setCertificateDocumentName] =
    useState("");

  const [existingCertificateImage, setExistingCertificateImage] =
    useState("");

  const [existingCertificateDocument, setExistingCertificateDocument] =
    useState("");

  const [editingCertificate, setEditingCertificate] = useState(null);

  const [certificateLoading, setCertificateLoading] = useState(false);

  // =========================================================
  // RESUME
  // =========================================================

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeMessage, setResumeMessage] = useState("");

  // =========================================================
  // ADMIN AUTHENTICATION
  // =========================================================

  const [authChecking, setAuthChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAdminAuth = async () => {
      try {
        setAuthChecking(true);

        const response = await fetch("/api/admin/me", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) {
          if (!cancelled) {
            setAuthenticated(false);
            router.replace("/admin/login");
          }

          return;
        }

        const data = await response.json();

        if (!data.success) {
          if (!cancelled) {
            setAuthenticated(false);
            router.replace("/admin/login");
          }

          return;
        }

        if (!cancelled) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error(
          "Admin authentication check failed:",
          error
        );

        if (!cancelled) {
          setAuthenticated(false);
          router.replace("/admin/login");
        }
      } finally {
        if (!cancelled) {
          setAuthChecking(false);
        }
      }
    };

    checkAdminAuth();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // =========================================================
  // FETCH ACTIVE TAB DATA
  // =========================================================

  useEffect(() => {
    if (!authenticated || authChecking) {
      return;
    }

    const loadActiveTab = async () => {
      try {
        setLoading(true);

        // =====================================================
        // ABOUT
        // =====================================================

        if (activeTab === "about") {
          await fetchAbout();
          return;
        }

        // =====================================================
        // CERTIFICATES
        // =====================================================

        if (activeTab === "certificates") {
          await fetchCertificates();
          return;
        }

        // =====================================================
        // RESUME
        // =====================================================

        if (activeTab === "resume") {
          await fetchResume();
          return;
        }

        // =====================================================
        // COMMENTS
        // =====================================================

        if (activeTab === "comments") {
          return;
        }

        // =====================================================
        // OTHER TABS
        // =====================================================

        await fetchData(activeTab);
      } catch (error) {
        console.error("Active tab loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadActiveTab();
  }, [activeTab, authenticated, authChecking]);

  // =========================================================
  // FETCH ABOUT
  // =========================================================

  const fetchAbout = async () => {
    try {
      setAboutLoading(true);
      setAboutMessage("");

      const response = await fetch("/api/about", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch About information."
        );
      }

      if (data.data) {
        setAboutForm({
          name: data.data.name || "",
          location: data.data.location || "",
          email: data.data.email || "",
          education: data.data.education || "",
          intro: data.data.intro || "",
          paragraph1: data.data.paragraph1 || "",
          paragraph2: data.data.paragraph2 || "",
        });
      }
    } catch (error) {
      console.error("About Fetch Error:", error);

      setAboutMessage(
        error.message || "Failed to load About information."
      );
    } finally {
      setAboutLoading(false);
    }
  };

  // =========================================================
  // UPDATE ABOUT
  // =========================================================

  const handleAboutSubmit = async (e) => {
    e.preventDefault();

    if (!aboutForm.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!aboutForm.location.trim()) {
      alert("Location is required.");
      return;
    }

    if (!aboutForm.email.trim()) {
      alert("Email is required.");
      return;
    }

    if (!aboutForm.education.trim()) {
      alert("Education is required.");
      return;
    }

    if (!aboutForm.intro.trim()) {
      alert("Intro text is required.");
      return;
    }

    if (!aboutForm.paragraph1.trim()) {
      alert("First paragraph is required.");
      return;
    }

    if (!aboutForm.paragraph2.trim()) {
      alert("Second paragraph is required.");
      return;
    }

    try {
      setAboutLoading(true);
      setAboutMessage("");

      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(aboutForm),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update About information."
        );
      }

      setAboutForm({
        name: data.data?.name || aboutForm.name,
        location:
          data.data?.location || aboutForm.location,
        email: data.data?.email || aboutForm.email,
        education:
          data.data?.education || aboutForm.education,
        intro: data.data?.intro || aboutForm.intro,
        paragraph1:
          data.data?.paragraph1 || aboutForm.paragraph1,
        paragraph2:
          data.data?.paragraph2 || aboutForm.paragraph2,
      });

      setAboutMessage(
        "About information updated successfully!"
      );

      alert("About information updated successfully!");
    } catch (error) {
      console.error("About Update Error:", error);

      setAboutMessage(
        error.message ||
          "Failed to update About information."
      );
    } finally {
      setAboutLoading(false);
    }
  };

  // =========================================================
  // FETCH CERTIFICATES
  // =========================================================

  const fetchCertificates = async () => {
    try {
      setCertificateLoading(true);

      const response = await fetch("/api/certificates", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      console.log("Certificates API Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to fetch certificates."
        );
      }

      const certificateList = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.certificates)
        ? data.certificates
        : [];

      setCertificates(certificateList);
    } catch (error) {
      console.error("Certificate API Error:", error);

      setCertificates([]);

      alert(
        error.message || "Failed to load certificates."
      );
    } finally {
      setCertificateLoading(false);
    }
  };

  // =========================================================
  // RESUME
  // =========================================================

  const fetchResume = async () => {
    try {
      const response = await fetch("/api/resume?info=true", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (response.status === 404 || !data?.resume) {
        setResumeInfo(null);
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch resume."
        );
      }

      setResumeInfo(data.resume || null);
    } catch (error) {
      console.error("Resume Fetch Error:", error);
      setResumeInfo(null);
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files?.[0];

    setResumeMessage("");

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file.");

      e.target.value = "";
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Resume PDF must be less than 10MB.");

      e.target.value = "";
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setResumeMessage("Please select a PDF file first.");
      return;
    }

    try {
      setResumeLoading(true);
      setResumeMessage("");

      const formData = new FormData();

      formData.append("file", resumeFile);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to upload resume."
        );
      }

      setResumeInfo(data.resume || null);
      setResumeFile(null);

      setResumeMessage("Resume uploaded successfully!");

      const input = document.getElementById("resume-file");

      if (input) {
        input.value = "";
      }
    } catch (error) {
      console.error("Resume Upload Error:", error);

      setResumeMessage(
        error.message || "Failed to upload resume."
      );
    } finally {
      setResumeLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!resumeInfo) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete the current resume?"
    );

    if (!confirmed) return;

    try {
      setResumeLoading(true);
      setResumeMessage("");

      const response = await fetch("/api/resume", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete resume."
        );
      }

      setResumeInfo(null);

      setResumeMessage("Resume deleted successfully!");
    } catch (error) {
      console.error("Resume Delete Error:", error);

      setResumeMessage(
        error.message || "Failed to delete resume."
      );
    } finally {
      setResumeLoading(false);
    }
  };

  // =========================================================
  // RESET MAIN FORM
  // =========================================================

  const resetForm = () => {
    setEditingId(null);

    setImageFile(null);
    setImagePreview("");

    setEducationForm({
      degree: "",
      institution: "",
      passingYear: "",
      description: "",
    });

    setProjectForm({
      title: "",
      image: "",
      shortDescription: "",
      longDescription: "",
      techStack: "",
      liveLink: "",
      githubLink: "",
      challenges: "",
      futureImprovements: "",
    });

    setSkillForm({
      name: "",
      category: "Frontend",
      level: 80,
      color: "#00d4ff",
      icon: "",
      order: 0,
    });

    setUpcomingProjectForm({
      title: "",
      tagline: "",
      desc: "",
      image: "",
      features: [],
      tech: [],
      order: 0,
      isActive: true,
    });

    setFeatureInput({
      name: "",
      icon: "Sparkles",
    });

    setTechInput({
      name: "",
      icon: "Code2",
    });
  };

  // =========================================================
  // RESET CERTIFICATE FORM
  // =========================================================

  const resetCertificateForm = () => {
    setEditingCertificate(null);

    setCertificateForm({
      title: "",
      organization: "",
      date: "",
      order: 0,
    });

    setCertificateImageFile(null);
    setCertificateDocumentFile(null);

    setCertificateImagePreview("");
    setCertificateDocumentName("");

    setExistingCertificateImage("");
    setExistingCertificateDocument("");

    const imageInput = document.getElementById(
      "certificate-image"
    );

    const documentInput = document.getElementById(
      "certificate-document"
    );

    if (imageInput) {
      imageInput.value = "";
    }

    if (documentInput) {
      documentInput.value = "";
    }
  };

  // =========================================================
  // FETCH DATA
  // =========================================================

  const fetchData = async (tab = activeTab) => {
    try {
      let endpoint = "";

      if (tab === "education") {
        endpoint = "/api/education";
      } else if (tab === "projects") {
        endpoint = "/api/projects";
      } else if (tab === "skills") {
        endpoint = "/api/skills";
      } else if (tab === "upcomingProject") {
        endpoint = "/api/upcomingProject";
      } else {
        setItems([]);
        return;
      }

      const res = await fetch(endpoint, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("HTTP Error: " + res.status);
      }

      const result = await res.json();

      console.log(tab + " API Result:", result);

      if (result.success) {
        setItems(
          Array.isArray(result.data)
            ? result.data
            : []
        );
      } else {
        setItems([]);

        console.error(result.message);
      }
    } catch (error) {
      console.error(
        "Fetch " + tab + " Error:",
        error
      );

      setItems([]);
    }
  };

  // =========================================================
  // CHANGE TAB
  // =========================================================

  const changeTab = (tab) => {
    setMobileSidebarOpen(false);

    resetForm();
    resetCertificateForm();

    setItems([]);
    setActiveTab(tab);
  };

  // =========================================================
  // UPCOMING PROJECT
  // =========================================================

  const addUpcomingFeature = () => {
    if (!featureInput.name.trim()) {
      return;
    }

    setUpcomingProjectForm((prev) => ({
      ...prev,

      features: [
        ...prev.features,
        {
          name: featureInput.name.trim(),
          icon:
            featureInput.icon.trim() ||
            "Sparkles",
        },
      ],
    }));

    setFeatureInput({
      name: "",
      icon: "Sparkles",
    });
  };

  const removeUpcomingFeature = (index) => {
    setUpcomingProjectForm((prev) => ({
      ...prev,

      features: prev.features.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addUpcomingTech = () => {
    if (!techInput.name.trim()) {
      return;
    }

    setUpcomingProjectForm((prev) => ({
      ...prev,

      tech: [
        ...prev.tech,
        {
          name: techInput.name.trim(),
          icon:
            techInput.icon.trim() ||
            "Code2",
        },
      ],
    }));

    setTechInput({
      name: "",
      icon: "Code2",
    });
  };

  const removeUpcomingTech = (index) => {
    setUpcomingProjectForm((prev) => ({
      ...prev,

      tech: prev.tech.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleEditUpcomingProject = (project) => {
    if (!project) return;

    setEditingId(project._id);

    setUpcomingProjectForm({
      title: project.title || "",

      tagline: project.tagline || "",

      desc: project.desc || "",

      image: project.image || "",

      features: Array.isArray(project.features)
        ? project.features
        : [],

      tech: Array.isArray(project.tech)
        ? project.tech
        : [],

      order: Number(project.order) || 0,

      isActive:
        project.isActive !== false,
    });

    setActiveTab("upcomingProject");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteUpcomingProject = async (id) => {
    if (!id) {
      alert("Upcoming Project ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this upcoming project?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/upcomingProject/" + id,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setItems((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      if (editingId === id) {
        resetForm();
      }

      alert(
        "Upcoming Project deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Delete Upcoming Project Error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete upcoming project."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpcomingProjectSubmit = async (e) => {
    e.preventDefault();

    if (!upcomingProjectForm.title.trim()) {
      alert("Project title is required.");
      return;
    }

    try {
      setLoading(true);

      const method = editingId
        ? "PUT"
        : "POST";

      const url = editingId
        ? "/api/upcomingProject/" + editingId
        : "/api/upcomingProject";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(
          upcomingProjectForm
        ),
      });

      const data = await response.json();

      if (
        !response.ok ||
        data.success === false
      ) {
        throw new Error(
          data.message ||
            "Something went wrong"
        );
      }

      alert(
        editingId
          ? "Upcoming Project updated successfully!"
          : "Upcoming Project added successfully!"
      );

      resetForm();

      await fetchData(
        "upcomingProject"
      );
    } catch (error) {
      console.error(
        "Upcoming Project Submit Error:",
        error
      );

      alert(
        error.message ||
          "Failed to save upcoming project."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // PROJECT IMAGE UPLOAD
  // =========================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Image size must be less than 5MB."
      );

      e.target.value = "";
      return;
    }

    setImageFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;

      setImagePreview(base64Image);

      setProjectForm((prev) => ({
        ...prev,
        image: base64Image,
      }));
    };

    reader.onerror = () => {
      alert("Failed to read image.");
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // REMOVE PROJECT IMAGE
  // =========================================================

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");

    setProjectForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // =========================================================
  // EDUCATION
  // =========================================================

  const handleEditEducation = (item) => {
    setEditingId(item._id);

    setEducationForm({
      degree: item.degree || "",

      institution:
        item.institution || "",

      passingYear:
        item.passingYear || "",

      description:
        item.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteEducation = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(
        "/api/education",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setItems((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );

        alert(
          "Education deleted successfully!"
        );
      } else {
        alert(
          result.message ||
            "Delete failed!"
        );
      }
    } catch (error) {
      console.error(
        "Delete Education Error:",
        error
      );

      alert(
        "Something went wrong while deleting!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEducationSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const method = editingId
        ? "PUT"
        : "POST";

      const body = {
        ...(editingId && {
          id: editingId,
        }),

        degree:
          educationForm.degree,

        institution:
          educationForm.institution,

        passingYear:
          educationForm.passingYear,

        description:
          educationForm.description,
      };

      const res = await fetch(
        "/api/education",
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      const result = await res.json();

      if (result.success) {
        alert(
          editingId
            ? "Education updated successfully!"
            : "Education added successfully!"
        );

        resetForm();

        await fetchData(
          "education"
        );
      } else {
        alert(
          result.message ||
            "Operation failed!"
        );
      }
    } catch (error) {
      console.error(
        "Education Submit Error:",
        error
      );

      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // PROJECTS
  // =========================================================

  const handleEditProject = (item) => {
    setEditingId(item._id);

    const existingImage =
      item.image ||
      item.imageUrl ||
      "";

    setProjectForm({
      title:
        item.title || "",

      image:
        existingImage,

      shortDescription:
        item.shortDescription ||
        item.description ||
        item.desc ||
        "",

      longDescription:
        item.longDescription ||
        item.longDesc ||
        "",

      techStack:
        Array.isArray(item.techStack)
          ? item.techStack.join(", ")
          : Array.isArray(item.tech)
          ? item.tech.join(", ")
          : item.techStack ||
            item.tech ||
            "",

      liveLink:
        item.liveLink ||
        item.liveUrl ||
        item.live ||
        "",

      githubLink:
        item.githubLink ||
        item.githubUrl ||
        item.code ||
        "",

      challenges:
        Array.isArray(item.challenges)
          ? item.challenges.join("\n")
          : item.challenges || "",

      futureImprovements:
        Array.isArray(
          item.futureImprovements
        )
          ? item.futureImprovements.join(
              "\n"
            )
          : Array.isArray(
              item.improvements
            )
          ? item.improvements.join(
              "\n"
            )
          : item.futureImprovements ||
            item.improvements ||
            "",
    });

    setImagePreview(existingImage);
    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteProject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(
        "/api/projects",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setItems((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );

        alert(
          "Project deleted successfully!"
        );
      } else {
        alert(
          result.message ||
            "Project delete failed!"
        );
      }
    } catch (error) {
      console.error(
        "Delete Project Error:",
        error
      );

      alert(
        "Something went wrong while deleting project!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    if (
      !editingId &&
      !projectForm.image
    ) {
      alert(
        "Please upload a project image."
      );

      return;
    }

    try {
      setLoading(true);

      const method = editingId
        ? "PUT"
        : "POST";

      const body = {
        ...(editingId && {
          id: editingId,
        }),

        title:
          projectForm.title,

        image:
          projectForm.image,

        description:
          projectForm.shortDescription,

        shortDescription:
          projectForm.shortDescription,

        longDescription:
          projectForm.longDescription,

        techStack:
          projectForm.techStack
            .split(",")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),

        liveLink:
          projectForm.liveLink,

        githubLink:
          projectForm.githubLink,

        challenges:
          projectForm.challenges
            .split("\n")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),

        futureImprovements:
          projectForm.futureImprovements
            .split("\n")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),
      };

      const res = await fetch(
        "/api/projects",
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      const result = await res.json();

      if (result.success) {
        alert(
          editingId
            ? "Project updated successfully!"
            : "Project added successfully!"
        );

        resetForm();

        await fetchData(
          "projects"
        );
      } else {
        alert(
          result.message ||
            "Project operation failed!"
        );
      }
    } catch (error) {
      console.error(
        "Project Submit Error:",
        error
      );

      alert(
        "Something went wrong while saving project!"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SKILLS
  // =========================================================

  const handleEditSkill = (item) => {
    setEditingId(item._id);

    setSkillForm({
      name:
        item.name || "",

      category:
        item.category ||
        "Frontend",

      level:
        typeof item.level ===
        "number"
          ? item.level
          : Number(item.level) ||
            80,

      color:
        item.color ||
        "#00d4ff",

      icon:
        item.icon ||
        "",

      order:
        typeof item.order ===
        "number"
          ? item.order
          : Number(item.order) ||
            0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteSkill = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(
        "/api/skills",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        setItems((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );

        alert(
          "Skill deleted successfully!"
        );
      } else {
        alert(
          result.message ||
            "Skill delete failed!"
        );
      }
    } catch (error) {
      console.error(
        "Delete Skill Error:",
        error
      );

      alert(
        "Something went wrong while deleting skill!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();

    if (!skillForm.name.trim()) {
      alert(
        "Skill name is required."
      );

      return;
    }

    const skillLevel = Number(
      skillForm.level
    );

    if (
      Number.isNaN(skillLevel) ||
      skillLevel < 0 ||
      skillLevel > 100
    ) {
      alert(
        "Skill level must be between 0 and 100."
      );

      return;
    }

    try {
      setLoading(true);

      const method = editingId
        ? "PUT"
        : "POST";

      const body = {
        ...(editingId && {
          id: editingId,
        }),

        name:
          skillForm.name.trim(),

        category:
          skillForm.category,

        level:
          skillLevel,

        color:
          skillForm.color ||
          "#00d4ff",

        icon:
          skillForm.icon.trim(),

        order:
          Number(
            skillForm.order
          ) || 0,
      };

      const res = await fetch(
        "/api/skills",
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );

      const result = await res.json();

      if (result.success) {
        alert(
          editingId
            ? "Skill updated successfully!"
            : "Skill added successfully!"
        );

        resetForm();

        await fetchData(
          "skills"
        );
      } else {
        alert(
          result.message ||
            "Skill operation failed!"
        );
      }
    } catch (error) {
      console.error(
        "Skill Submit Error:",
        error
      );

      alert(
        "Something went wrong while saving skill!"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CERTIFICATE INPUT HANDLER
  // =========================================================

  const handleCertificateChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setCertificateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // CERTIFICATE IMAGE FILE HANDLER
  // =========================================================

  const handleCertificateImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Certificate image must be less than 5MB."
      );

      e.target.value = "";
      return;
    }

    setCertificateImageFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      setCertificateImagePreview(
        reader.result
      );
    };

    reader.onerror = () => {
      alert(
        "Failed to read certificate image."
      );
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // CERTIFICATE PDF FILE HANDLER
  // =========================================================

  const handleCertificateDocumentChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const isPDF =
      file.type ===
        "application/pdf" ||
      file.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPDF) {
      alert(
        "Please select a valid PDF document."
      );

      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(
        "Certificate PDF must be less than 10MB."
      );

      e.target.value = "";
      return;
    }

    setCertificateDocumentFile(file);

    setCertificateDocumentName(
      file.name
    );
  };

  // =========================================================
  // ADD / UPDATE CERTIFICATE
  // =========================================================

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();

    if (
      !certificateForm.title?.trim() ||
      !certificateForm.organization?.trim() ||
      !certificateForm.date?.trim()
    ) {
      alert(
        "Please fill in certificate title, organization and date."
      );

      return;
    }

    if (
      !editingCertificate &&
      !certificateDocumentFile
    ) {
      alert(
        "Please upload a certificate PDF document."
      );

      return;
    }

    if (certificateDocumentFile) {
      const fileName =
        certificateDocumentFile.name?.toLowerCase() ||
        "";

      const fileType =
        certificateDocumentFile.type ||
        "";

      const isPdf =
        fileType ===
          "application/pdf" ||
        fileName.endsWith(".pdf");

      if (!isPdf) {
        alert(
          "Please select a valid PDF certificate document."
        );

        return;
      }
    }

    try {
      setCertificateLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        certificateForm.title.trim()
      );

      formData.append(
        "organization",
        certificateForm.organization.trim()
      );

      formData.append(
        "date",
        certificateForm.date.trim()
      );

      formData.append(
        "displayOrder",
        String(
          Number(
            certificateForm.order
          ) || 0
        )
      );

      if (
        existingCertificateImage &&
        typeof existingCertificateImage ===
          "string"
      ) {
        formData.append(
          "existingImageUrl",
          existingCertificateImage
        );
      }

      if (
        existingCertificateDocument &&
        typeof existingCertificateDocument ===
          "string"
      ) {
        formData.append(
          "existingDocumentUrl",
          existingCertificateDocument
        );
      }

      if (
        certificateImageFile instanceof
        File
      ) {
        formData.append(
          "image",
          certificateImageFile
        );
      }

      if (
        certificateDocumentFile instanceof
        File
      ) {
        formData.append(
          "document",
          certificateDocumentFile
        );
      }

      console.log(
        "Certificate PDF:",
        certificateDocumentFile
      );

      console.log(
        "PDF name:",
        certificateDocumentFile?.name
      );

      console.log(
        "PDF type:",
        certificateDocumentFile?.type
      );

      console.log(
        "PDF size:",
        certificateDocumentFile?.size
      );

      for (
        const [
          key,
          value,
        ] of formData.entries()
      ) {
        if (value instanceof File) {
          console.log(
            "FormData " + key + ":",
            value.name,
            value.type,
            value.size
          );
        } else {
          console.log(
            "FormData " + key + ":",
            value
          );
        }
      }

      let response;

      if (editingCertificate) {
        formData.append(
          "id",
          editingCertificate._id
        );

        response = await fetch(
          "/api/certificates",
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        response = await fetch(
          "/api/certificates",
          {
            method: "POST",
            body: formData,
          }
        );
      }

      const data = await response.json();

      console.log(
        "Certificate Submit Result:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Something went wrong."
        );
      }

      alert(
        editingCertificate
          ? "Certificate updated successfully!"
          : "Certificate added successfully!"
      );

      resetCertificateForm();

      await fetchCertificates();
    } catch (error) {
      console.error(
        "Certificate Submit Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while saving certificate."
      );
    } finally {
      setCertificateLoading(false);
    }
  };

  // =========================================================
  // EDIT CERTIFICATE
  // =========================================================

  const handleEditCertificate = (certificate) => {
    if (!certificate) return;

    setEditingCertificate(
      certificate
    );

    setCertificateForm({
      title:
        certificate.title ||
        "",

      organization:
        certificate.organization ||
        "",

      date:
        certificate.date ||
        "",

      order:
        certificate.displayOrder ??
        certificate.order ??
        0,
    });

    const imageUrl =
      certificate.imageUrl ||
      certificate.image ||
      "";

    const documentUrl =
      certificate.documentUrl ||
      certificate.credentialLink ||
      "";

    setExistingCertificateImage(
      imageUrl
    );

    setExistingCertificateDocument(
      documentUrl
    );

    setCertificateImagePreview(
      imageUrl
    );

    setCertificateImageFile(null);

    setCertificateDocumentFile(
      null
    );

    setCertificateDocumentName(
      documentUrl
        ? "Existing certificate document"
        : ""
    );

    const imageInput =
      document.getElementById(
        "certificate-image"
      );

    const documentInput =
      document.getElementById(
        "certificate-document"
      );

    if (imageInput) {
      imageInput.value = "";
    }

    if (documentInput) {
      documentInput.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DELETE CERTIFICATE
  // =========================================================

  const handleDeleteCertificate = async (id) => {
    if (!id) {
      alert(
        "Certificate ID is missing."
      );

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this certificate?\n\nThis will permanently remove the certificate, image and PDF."
    );

    if (!confirmed) return;

    try {
      setCertificateLoading(true);

      const response = await fetch(
        "/api/certificates",
        {
          method: "DELETE",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Delete Certificate Response:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Failed to delete certificate."
        );
      }

      setCertificates((prev) =>
        prev.filter(
          (certificate) =>
            certificate._id !== id
        )
      );

      if (
        editingCertificate?._id ===
        id
      ) {
        resetCertificateForm();
      }

      alert(
        "Certificate deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Delete Certificate Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while deleting certificate."
      );
    } finally {
      setCertificateLoading(false);
    }
  };

  // =========================================================
  // CANCEL CERTIFICATE EDIT
  // =========================================================

  const cancelCertificateEdit = () => {
    resetCertificateForm();
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    try {
      await fetch(
        "/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error(
        "Admin logout error:",
        error
      );
    } finally {
      router.replace(
        "/admin/login"
      );
    }
  };

  // =========================================================
  // AUTHENTICATION GUARD
  // =========================================================

  if (authChecking) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-gray-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-teal-400" />

          <p className="text-sm text-gray-400">
            Checking admin authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  // =========================================================
  // RENDER PROPS
  // =========================================================

  const adminProps = {
    activeTab,

    // =====================================================
    // ABOUT
    // =====================================================

    aboutForm,
    aboutLoading,
    aboutMessage,
    handleAboutSubmit,
    setAboutForm,
    fetchAbout,

    // =====================================================
    // UPCOMING PROJECT
    // =====================================================

    addUpcomingFeature,
    addUpcomingTech,

    // =====================================================
    // CERTIFICATES
    // =====================================================

    cancelCertificateEdit,

    certificateDocumentFile,
    certificateDocumentName,
    certificateForm,
    certificateImageFile,
    certificateImagePreview,
    certificateLoading,
    certificates,

    editingCertificate,
    editingId,

    educationForm,

    existingCertificateImage,

    featureInput,

    fetchCertificates,
    fetchData,

    handleCertificateChange,
    handleCertificateDocumentChange,
    handleCertificateImageChange,
    handleCertificateSubmit,

    handleDeleteCertificate,
    handleDeleteEducation,
    handleDeleteProject,
    handleDeleteResume,
    handleDeleteSkill,
    handleDeleteUpcomingProject,

    handleEditCertificate,
    handleEditEducation,
    handleEditProject,
    handleEditSkill,
    handleEditUpcomingProject,

    handleEducationSubmit,
    handleImageChange,
    handleProjectSubmit,
    handleRemoveImage,

    handleResumeFileChange,
    handleResumeUpload,

    handleSkillSubmit,
    handleUpcomingProjectSubmit,

    imageFile,
    imagePreview,

    items,
    loading,

    projectForm,

    removeUpcomingFeature,
    removeUpcomingTech,

    resetForm,

    resumeFile,
    resumeInfo,
    resumeLoading,
    resumeMessage,

    setCertificateDocumentFile,
    setCertificateDocumentName,
    setCertificateImageFile,
    setCertificateImagePreview,

    setEducationForm,

    setExistingCertificateDocument,
    setExistingCertificateImage,

    setFeatureInput,

    setProjectForm,
    setSkillForm,
    setTechInput,
    setUpcomingProjectForm,

    skillForm,
    techInput,
    upcomingProjectForm,
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-dvh overflow-x-hidden bg-gray-950 text-white">
      <div className="flex min-h-dvh">

        {/* =====================================================
            MOBILE SIDEBAR BACKDROP
        ====================================================== */}

        {mobileSidebarOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          />
        )}

        {/* =====================================================
            SIDEBAR
        ====================================================== */}

        <aside
          className={`
            fixed inset-y-0 left-0 z-50
            flex w-[280px] max-w-[85vw] flex-col
            justify-between
            overflow-y-auto
            border-r border-gray-800
            bg-gray-900
            p-4
            shadow-2xl
            transition-transform duration-300 ease-in-out

            sm:w-72
            sm:p-5

            md:sticky
            md:top-0
            md:h-dvh
            md:w-64
            md:max-w-none
            md:translate-x-0
            md:overflow-y-auto
            md:p-5
            md:shadow-none

            lg:w-72
            lg:p-6

            ${
              mobileSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          {/* =================================================
              SIDEBAR TOP
          ================================================== */}

          <div className="min-w-0">

            {/* =================================================
                ADMIN PROFILE
            ================================================== */}

            <div className="mb-6 flex flex-col items-center text-center sm:mb-8">

              {/* Profile Picture */}

              <div
                className="
                  relative
                  mb-3
                  h-20
                  w-20
                  overflow-hidden
                  rounded-full
                  border-4
                  border-teal-400
                  shadow-lg
                  shadow-teal-500/20

                  sm:mb-4
                  sm:h-24
                  sm:w-24
                "
              >
                <Image
                  src="/admin-profile.jpg"
                  alt="Admin Profile"
                  fill
                  priority
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Admin Title */}

              <h1
                className="
                  text-xl
                  font-bold
                  text-teal-400
                  sm:text-2xl
                "
              >
                Injamamul Hoq
              </h1>

              {/* Welcome Text */}

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Welcome back
              </p>
            </div>

            {/* =================================================
                MOBILE CLOSE BUTTON
            ================================================== */}

            <div className="mb-5 flex justify-end md:hidden">
              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen(false)
                }
                className="
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-700
                  bg-gray-800
                  text-gray-300
                  transition
                  hover:bg-gray-700
                  hover:text-white
                  active:scale-95
                "
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>

            {/* =================================================
                NAVIGATION
            ================================================== */}

            <nav className="space-y-1.5 sm:space-y-2">

              {/* =================================================
                  ABOUT ME
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("about")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "about"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <UserRound
                  size={18}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110

                    ${
                      activeTab === "about"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-teal-400"
                    }
                  `}
                />

                <span>About Me</span>
              </button>

              {/* =================================================
                  PROJECTS
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("projects")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "projects"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <FolderKanban
                  size={18}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110

                    ${
                      activeTab === "projects"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-teal-400"
                    }
                  `}
                />

                <span>Projects</span>
              </button>

              {/* =================================================
                  SKILLS
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("skills")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "skills"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <Code2
                  size={18}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110

                    ${
                      activeTab === "skills"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-teal-400"
                    }
                  `}
                />

                <span>Skills</span>
              </button>

              {/* =================================================
                  CERTIFICATES
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("certificates")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "certificates"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <Award
                  size={18}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110

                    ${
                      activeTab === "certificates"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-teal-400"
                    }
                  `}
                />

                <span>Certificates</span>
              </button>

              {/* =================================================
                  EDUCATION
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("education")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "education"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <GraduationCap
                  size={18}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110

                    ${
                      activeTab === "education"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-teal-400"
                    }
                  `}
                />

                <span>Education</span>
              </button>

              {/* =================================================
                  UPCOMING PROJECT
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("upcomingProject")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "upcomingProject"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <Rocket
                  size={18}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110

                    ${
                      activeTab === "upcomingProject"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-teal-400"
                    }
                  `}
                />

                <span>Upcoming Project</span>
              </button>

              {/* =================================================
                  RESUME
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("resume")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "resume"
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <FileText
                  size={18}
                  strokeWidth={2}
                  className={`
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-110

                    ${
                      activeTab === "resume"
                        ? "text-white"
                        : "text-gray-400 group-hover:text-teal-400"
                    }
                  `}
                />

                <span>Resume</span>
              </button>

              {/* =================================================
                  COMMENTS
              ================================================== */}

              <button
                type="button"
                onClick={() =>
                  changeTab("comments")
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  active:scale-[0.99]

                  sm:px-4
                  sm:py-3

                  ${
                    activeTab === "comments"
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20"
                      : "text-gray-300 hover:bg-violet-600 hover:text-white"
                  }
                `}
              >
                <span className="flex items-center gap-3">

                  <MessageCircle
                    size={18}
                    strokeWidth={2}
                    className={`
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110

                      ${
                        activeTab === "comments"
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }
                    `}
                  />

                  <span>Comments</span>

                </span>

                <span
                  className={`
                    rounded-md
                    px-2
                    py-0.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    transition-all

                    ${
                      activeTab === "comments"
                        ? "bg-white/10 text-white"
                        : "bg-violet-500/10 text-violet-300"
                    }
                  `}
                >
                  Admin
                </span>
              </button>

            </nav>
          </div>

          {/* =================================================
              LOGOUT
          ================================================== */}

          <div className="mt-6 border-t border-gray-800 pt-4">
            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full
                rounded-lg
                bg-red-600
                px-4
                py-2.5
                text-center
                text-sm
                font-semibold
                text-white
                transition

                hover:bg-red-700
                active:scale-[0.98]

                sm:text-base
              "
            >
              Logout
            </button>
          </div>

        </aside>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <main
          className="
            min-w-0
            flex-1
            overflow-x-hidden
            bg-gray-950

            p-3

            sm:p-5

            md:min-h-dvh
            md:p-6

            lg:p-8

            xl:p-10
          "
        >

          {/* =================================================
              CONTENT WRAPPER
          ================================================== */}

          <div className="mx-auto w-full max-w-[1600px]">

            {/* =================================================
                MOBILE HEADER
            ================================================== */}

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
                gap-3
                rounded-xl
                border
                border-gray-800
                bg-gray-900
                p-3
                shadow-lg

                sm:mb-5
                sm:p-4

                md:hidden
              "
            >
              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-semibold text-teal-400">
                  Admin Dashboard
                </p>

                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {activeTab === "about"
                    ? "About Me"
                    : activeTab === "upcomingProject"
                    ? "Upcoming Project"
                    : activeTab === "resume"
                    ? "Resume"
                    : activeTab === "comments"
                    ? "Comments"
                    : activeTab
                        .charAt(0)
                        .toUpperCase() +
                      activeTab.slice(1)}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen(true)
                }
                className="
                  inline-flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-700
                  bg-gray-800
                  text-lg
                  text-white
                  transition
                  hover:bg-gray-700
                  active:scale-95
                "
                aria-label="Open navigation"
              >
                ☰
              </button>
            </div>

            {/* =================================================
                ADMIN SECTIONS
            ================================================== */}

            <div className="min-w-0">

              {/* =================================================
                  ABOUT
              ================================================== */}

              {activeTab === "about" && (
                <About admin={adminProps} />
              )}

              {/* =================================================
                  RESUME
              ================================================== */}

              {activeTab === "resume" && (
                <Resume admin={adminProps} />
              )}

              {/* =================================================
                  PROJECTS
              ================================================== */}

              {activeTab === "projects" && (
                <Projects admin={adminProps} />
              )}

              {/* =================================================
                  EDUCATION
              ================================================== */}

              {activeTab === "education" && (
                <Education admin={adminProps} />
              )}

              {/* =================================================
                  SKILLS
              ================================================== */}

              {activeTab === "skills" && (
                <Skills admin={adminProps} />
              )}

              {/* =================================================
                  CERTIFICATES
              ================================================== */}

              {activeTab === "certificates" && (
                <Certificates admin={adminProps} />
              )}

              {/* =================================================
                  UPCOMING PROJECT
              ================================================== */}

              {activeTab === "upcomingProject" && (
                <UpcomingProject admin={adminProps} />
              )}

              {/* =================================================
                  COMMENTS
              ================================================== */}

              {activeTab === "comments" && (
                <Comments admin={adminProps} />
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}