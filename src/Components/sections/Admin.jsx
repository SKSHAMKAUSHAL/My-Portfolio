import { useState, useEffect } from "react";
import { loginWithSecret, db } from "../../firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, setDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// Helper function to compress image and convert to Base64
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // max width for portfolio images
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        
        // Output as WebP or JPEG for good compression
        resolve(canvas.toDataURL("image/jpeg", 0.7)); 
      };
    };
  });
};

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");

  // Data
  const [projects, setProjects] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  // Loading States
  const [uploadingProj, setUploadingProj] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);

  // Forms
  const [newProject, setNewProject] = useState({ title: "", description: "", tech: "", github: "", live: "" });
  const [projImage, setProjImage] = useState(null);
  const [newJourney, setNewJourney] = useState({ title: "", description: "", icon: "🎓" });
  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch Projects
    const qProjects = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      const p = [];
      snapshot.forEach(doc => p.push({ id: doc.id, ...doc.data() }));
      setProjects(p);
    });

    // Fetch Journeys
    const qJourneys = query(collection(db, "journeys"), orderBy("createdAt", "asc"));
    const unsubJourneys = onSnapshot(qJourneys, (snapshot) => {
      const j = [];
      snapshot.forEach(doc => j.push({ id: doc.id, ...doc.data() }));
      setJourneys(j);
    });

    // Fetch Profile Picture
    const unsubSettings = onSnapshot(doc(db, "settings", "profile"), (docSnap) => {
      if (docSnap.exists()) {
        setProfilePic(docSnap.data().proPicUrl);
      }
    });

    return () => {
      unsubProjects();
      unsubJourneys();
      unsubSettings();
    };
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginWithSecret(secretKey);
    if (success) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid Secret Key");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projImage) return alert("Please select an image for the project");
    setUploadingProj(true);
    try {
      // Compress image to base64
      const imageUrl = await compressImage(projImage);

      await addDoc(collection(db, "projects"), {
        ...newProject,
        tech: newProject.tech.split(",").map(t => t.trim()),
        image: imageUrl,
        createdAt: new Date().getTime()
      });

      setNewProject({ title: "", description: "", tech: "", github: "", live: "" });
      setProjImage(null);
      e.target.reset(); // reset file input
    } catch (err) {
      console.error(err);
      alert("Error adding project");
    }
    setUploadingProj(false);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
    }
  };

  const handleAddJourney = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "journeys"), {
        ...newJourney,
        createdAt: new Date().getTime()
      });
      setNewJourney({ title: "", description: "", icon: "🎓" });
    } catch (err) {
      console.error(err);
      alert("Error adding journey");
    }
  };

  const handleDeleteJourney = async (id) => {
    if (window.confirm("Delete this milestone?")) {
      await deleteDoc(doc(db, "journeys", id));
    }
  };

  const handleUpdateProfilePic = async (e) => {
    e.preventDefault();
    if (!newProfilePic) return alert("Please select an image");
    setUploadingPic(true);
    try {
      // Compress image to base64
      const imageUrl = await compressImage(newProfilePic);

      try {
        await updateDoc(doc(db, "settings", "profile"), { proPicUrl: imageUrl });
      } catch (e) {
        await setDoc(doc(db, "settings", "profile"), { proPicUrl: imageUrl });
      }
      
      setNewProfilePic(null);
      e.target.reset();
      alert("Profile picture updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile picture");
    }
    setUploadingPic(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <form onSubmit={handleLogin} className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 shadow-[0_0_40px_rgba(59,130,246,0.1)] max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Admin Access</h2>
            <p className="text-gray-400 mt-2 text-sm">Enter your secret key to manage your portfolio</p>
          </div>
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg mb-6 text-center text-sm">{error}</div>}
          <div className="mb-6">
            <input type="password" placeholder="Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your portfolio content via Firebase</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-5 py-2 rounded-xl transition-all font-medium text-sm">Lock & Logout</button>
        </header>

        {/* Profile Settings */}
        <section className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-white/5 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border border-white/20" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border border-dashed border-white/20 text-xs text-gray-500">No Image</div>
            )}
            <form onSubmit={handleUpdateProfilePic} className="flex-1 w-full flex flex-col sm:flex-row gap-4">
              <input type="file" accept="image/*" onChange={(e) => setNewProfilePic(e.target.files[0])} className="text-sm flex-1 bg-zinc-950 border border-white/10 rounded-xl p-2" required />
              <button type="submit" disabled={uploadingPic} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl disabled:opacity-50 whitespace-nowrap">
                {uploadingPic ? "Uploading..." : "Update Picture"}
              </button>
            </form>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Projects Manager */}
          <section className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-white/5 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
            <form onSubmit={handleAddProject} className="space-y-4 mb-8">
              <input type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" rows="2" required />
              <input type="text" placeholder="Tech Stack (comma separated: React, Firebase, Tailwind)" value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <input type="url" placeholder="GitHub URL" value={newProject.github} onChange={e => setNewProject({...newProject, github: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <input type="url" placeholder="Live Site URL (optional)" value={newProject.live} onChange={e => setNewProject({...newProject, live: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" />
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Project Image</label>
                <input type="file" accept="image/*" onChange={e => setProjImage(e.target.files[0])} className="text-sm" required />
              </div>
              <button type="submit" disabled={uploadingProj} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 rounded-xl disabled:opacity-50">
                {uploadingProj ? "Uploading Project..." : "+ Add Project"}
              </button>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {projects.length === 0 ? <p className="text-gray-500 text-sm text-center italic">No projects yet.</p> : null}
              {projects.map(proj => (
                <div key={proj.id} className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <img src={proj.image} className="w-12 h-12 rounded-lg object-cover" alt="proj" />
                    <div>
                      <h4 className="font-bold">{proj.title}</h4>
                      <p className="text-xs text-gray-400">{proj.tech?.join(", ")}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteProject(proj.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1 rounded">Delete</button>
                </div>
              ))}
            </div>
          </section>

          {/* Journey Manager */}
          <section className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-white/5 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Journey Timeline</h2>
            <form onSubmit={handleAddJourney} className="space-y-4 mb-8">
              <input type="text" placeholder="Title (e.g. MERN Developer)" value={newJourney.title} onChange={e => setNewJourney({...newJourney, title: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <textarea placeholder="Description" value={newJourney.description} onChange={e => setNewJourney({...newJourney, description: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" rows="3" required />
              <input type="text" placeholder="Icon Emoji (e.g. 🎓, 💻, 🚀)" value={newJourney.icon} onChange={e => setNewJourney({...newJourney, icon: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 rounded-xl">
                + Add Milestone
              </button>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {journeys.length === 0 ? <p className="text-gray-500 text-sm text-center italic">No milestones yet.</p> : null}
              {journeys.map(j => (
                <div key={j.id} className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{j.icon}</span>
                    <div>
                      <h4 className="font-bold">{j.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{j.description}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteJourney(j.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1 rounded">Delete</button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
