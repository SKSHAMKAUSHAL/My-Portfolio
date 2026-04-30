import { useState, useEffect, useCallback } from "react";
import { loginWithSecret, db } from "../../firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, setDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import Cropper from 'react-easy-crop';

// Helper to crop image and return base64
const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 800; // Force 800x800 for high quality profile pic
      canvas.height = 800;
      const ctx = canvas.getContext("2d");
      
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        800,
        800
      );
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    image.onerror = (error) => reject(error);
  });
};

// Helper function to compress image and convert to Base64 (used for projects)
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
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

  // Forms & Edit States
  const [editingProject, setEditingProject] = useState(null);
  const [draggedProjectIndex, setDraggedProjectIndex] = useState(null);
  
  const [editingJourney, setEditingJourney] = useState(null);

  const [newProject, setNewProject] = useState({ title: "", description: "", tech: "", github: "", live: "" });
  const [projImage, setProjImage] = useState(null);
  const [newJourney, setNewJourney] = useState({ title: "", description: "", icon: "🎓" });
  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch Projects (Sort in memory to support old projects without 'order' field)
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      let p = [];
      snapshot.forEach(doc => p.push({ id: doc.id, ...doc.data() }));
      p.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
        return (b.createdAt || 0) - (a.createdAt || 0); // fallback to newest first
      });
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
    setUploadingProj(true);
    try {
      let imageUrl = null;
      if (projImage) {
        imageUrl = await compressImage(projImage);
      } else if (!editingProject) {
        alert("Please select an image for the project");
        setUploadingProj(false);
        return;
      }

      if (editingProject) {
        // Update existing project
        const updateData = {
          ...newProject,
          tech: newProject.tech.split(",").map(t => t.trim()),
        };
        if (imageUrl) updateData.image = imageUrl;
        await updateDoc(doc(db, "projects", editingProject), updateData);
        setEditingProject(null);
      } else {
        // Add new project
        await addDoc(collection(db, "projects"), {
          ...newProject,
          tech: newProject.tech.split(",").map(t => t.trim()),
          image: imageUrl,
          order: projects.length, // Assign order at the end
          createdAt: new Date().getTime()
        });
      }

      setNewProject({ title: "", description: "", tech: "", github: "", live: "" });
      setProjImage(null);
      e.target.reset(); // reset file input
    } catch (err) {
      console.error(err);
      alert("Error saving project");
    }
    setUploadingProj(false);
  };

  const handleEditClick = (proj) => {
    setEditingProject(proj.id);
    setNewProject({
      title: proj.title,
      description: proj.description,
      tech: proj.tech.join(", "),
      github: proj.github,
      live: proj.live || ""
    });
    setProjImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (index) => {
    setDraggedProjectIndex(index);
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    if (draggedProjectIndex === null || draggedProjectIndex === index) return;
    
    const newProjects = [...projects];
    const draggedItem = newProjects.splice(draggedProjectIndex, 1)[0];
    newProjects.splice(index, 0, draggedItem);
    
    // Optimistically update UI
    setProjects(newProjects);
    setDraggedProjectIndex(null);
    
    // Save new order to Firebase
    try {
      for (let i = 0; i < newProjects.length; i++) {
        if (newProjects[i].order !== i) {
           await updateDoc(doc(db, "projects", newProjects[i].id), { order: i });
        }
      }
    } catch(err) {
      console.error("Error saving new order", err);
    }
  };

  const handleEditJourneyClick = (j) => {
    setEditingJourney(j.id);
    setNewJourney({
      title: j.title,
      description: j.description,
      icon: j.icon
    });
  };

  const handleAddJourney = async (e) => {
    e.preventDefault();
    try {
      if (editingJourney) {
        await updateDoc(doc(db, "journeys", editingJourney), {
          ...newJourney
        });
        setEditingJourney(null);
      } else {
        await addDoc(collection(db, "journeys"), {
          ...newJourney,
          createdAt: new Date().getTime()
        });
      }
      setNewJourney({ title: "", description: "", icon: "🎓" });
    } catch (err) {
      console.error(err);
      alert("Error saving journey");
    }
  };

  const handleDeleteJourney = async (id) => {
    if (window.confirm("Delete this milestone?")) {
      await deleteDoc(doc(db, "journeys", id));
    }
  };

  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setCropImageSrc(reader.result));
      reader.readAsDataURL(file);
      e.target.value = null; // reset input
    }
  };

  const handleSaveCrop = async () => {
    if (!cropImageSrc || !croppedAreaPixels) return;
    setUploadingPic(true);
    try {
      const croppedImageBase64 = await getCroppedImg(cropImageSrc, croppedAreaPixels);
      try {
        await updateDoc(doc(db, "settings", "profile"), { proPicUrl: croppedImageBase64 });
      } catch (err) {
        await setDoc(doc(db, "settings", "profile"), { proPicUrl: croppedImageBase64 });
      }
      alert("Profile picture updated!");
      setCropImageSrc(null);
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
          
          {cropImageSrc ? (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full max-w-sm h-80 bg-black rounded-xl overflow-hidden border border-white/20">
                <Cropper
                  image={cropImageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              
              <div className="w-full max-w-sm px-4">
                <p className="text-xs text-gray-400 mb-2 text-center">Zoom</p>
                <input 
                  type="range" 
                  value={zoom} 
                  min={1} 
                  max={3} 
                  step={0.1} 
                  onChange={(e) => setZoom(e.target.value)} 
                  className="w-full accent-blue-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex w-full max-w-sm gap-4 mt-2">
                <button 
                  onClick={handleSaveCrop} 
                  disabled={uploadingPic} 
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 transition-colors"
                >
                  {uploadingPic ? "Saving..." : "Set new profile picture"}
                </button>
                <button 
                  onClick={() => setCropImageSrc(null)} 
                  disabled={uploadingPic} 
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-6">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-lg" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border border-dashed border-white/20 text-xs text-gray-500">No Image</div>
              )}
              <div className="flex-1 w-full">
                <input 
                  type="file" 
                  accept="image/*" 
                  id="proPicInput"
                  className="hidden"
                  onChange={onFileChange} 
                />
                <label 
                  htmlFor="proPicInput" 
                  className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-xl transition-colors shadow-lg"
                >
                  Choose New Picture
                </label>
                <p className="text-xs text-gray-400 mt-2">You will be able to crop the image before saving.</p>
              </div>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Projects Manager */}
          <section className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-white/5 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Projects</h2>
              {editingProject && (
                <button onClick={() => { setEditingProject(null); setNewProject({ title: "", description: "", tech: "", github: "", live: "" }); }} className="text-sm text-gray-400 hover:text-white">
                  Cancel Edit
                </button>
              )}
            </div>
            
            <form onSubmit={handleAddProject} className="space-y-4 mb-8">
              <input type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" rows="2" required />
              <input type="text" placeholder="Tech Stack (comma separated: React, Firebase, Tailwind)" value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <input type="url" placeholder="GitHub URL" value={newProject.github} onChange={e => setNewProject({...newProject, github: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <input type="url" placeholder="Live Site URL (optional)" value={newProject.live} onChange={e => setNewProject({...newProject, live: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" />
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">{editingProject ? "Update Image (optional)" : "Project Image"}</label>
                <input type="file" accept="image/*" onChange={e => setProjImage(e.target.files[0])} className="text-sm" required={!editingProject} />
              </div>
              <button type="submit" disabled={uploadingProj} className={`w-full font-bold py-2 rounded-xl disabled:opacity-50 text-white transition-colors ${editingProject ? 'bg-orange-500 hover:bg-orange-400' : 'bg-blue-500 hover:bg-blue-400'}`}>
                {uploadingProj ? "Saving..." : editingProject ? "Save Changes" : "+ Add Project"}
              </button>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              <p className="text-xs text-gray-400 mb-2">Drag and drop to reorder projects</p>
              {projects.length === 0 ? <p className="text-gray-500 text-sm text-center italic">No projects yet.</p> : null}
              {projects.map((proj, index) => (
                <div 
                  key={proj.id} 
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, index)}
                  className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 cursor-grab active:cursor-grabbing hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-gray-500 text-lg cursor-grab">⋮⋮</span>
                    <img src={proj.image} className="w-12 h-12 rounded-lg object-cover" alt="proj" />
                    <div className="flex-1">
                      <h4 className="font-bold">{proj.title}</h4>
                      <p className="text-xs text-gray-400">{proj.tech?.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(proj)} className="text-orange-400 hover:text-orange-300 bg-orange-500/10 px-3 py-1 rounded text-sm whitespace-nowrap">Edit</button>
                    <button onClick={() => handleDeleteProject(proj.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1 rounded text-sm whitespace-nowrap">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Journey Manager */}
          <section className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-white/5 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Journey Timeline</h2>
              {editingJourney && (
                <button onClick={() => { setEditingJourney(null); setNewJourney({ title: "", description: "", icon: "🎓" }); }} className="text-sm text-gray-400 hover:text-white">
                  Cancel Edit
                </button>
              )}
            </div>
            <form onSubmit={handleAddJourney} className="space-y-4 mb-8">
              <input type="text" placeholder="Title (e.g. MERN Developer)" value={newJourney.title} onChange={e => setNewJourney({...newJourney, title: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <textarea placeholder="Description" value={newJourney.description} onChange={e => setNewJourney({...newJourney, description: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" rows="3" required />
              <input type="text" placeholder="Icon Emoji (e.g. 🎓, 💻, 🚀)" value={newJourney.icon} onChange={e => setNewJourney({...newJourney, icon: e.target.value})} className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2" required />
              <button type="submit" className={`w-full font-bold py-2 rounded-xl text-white transition-colors ${editingJourney ? 'bg-orange-500 hover:bg-orange-400' : 'bg-cyan-500 hover:bg-cyan-400'}`}>
                {editingJourney ? "Save Changes" : "+ Add Milestone"}
              </button>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {journeys.length === 0 ? <p className="text-gray-500 text-sm text-center italic">No milestones yet.</p> : null}
              {journeys.map(j => (
                <div key={j.id} className="bg-zinc-800/50 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-2xl">{j.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold">{j.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-1">{j.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditJourneyClick(j)} className="text-orange-400 hover:text-orange-300 bg-orange-500/10 px-3 py-1 rounded text-sm whitespace-nowrap">Edit</button>
                    <button onClick={() => handleDeleteJourney(j.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1 rounded text-sm whitespace-nowrap">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
