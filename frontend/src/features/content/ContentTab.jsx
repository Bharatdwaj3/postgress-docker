import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Snackbar,
  Alert,
  TextareaAutosize,
  Pagination,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Tooltip,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  CloudUpload,
  Search,
  MoreVert,
  PlayCircleOutline,
  Image as ImageIcon,
  MusicNote,
  CalendarToday,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const API_BASE = "http://localhost:5001/api/content";

const CATEGORIES = ["fiction", "science", "art", "daily", "history"];
const MEDIA_TYPES = ["video", "image", "audio"];

const ContentTab = () => {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const itemsPerPage = 12;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    mediaType: "",
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const fetchContents = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_BASE, { withCredentials: true });
      const sorted = data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setContents(sorted);
      setFilteredContents(sorted);
    } catch (err) {
      console.error("Load error:", err);
      showToast("Failed to load content", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = contents.filter(
      (item) =>
        item.title?.toLowerCase().includes(lowerTerm) ||
        item.description?.toLowerCase().includes(lowerTerm) ||
        item.category?.toLowerCase().includes(lowerTerm)
    );
    setFilteredContents(filtered);
    setPage(1);
  }, [searchTerm, contents]);

  const paginatedContents = useMemo(() => {
    const startIdx = (page - 1) * itemsPerPage;
    return filteredContents.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredContents, page, itemsPerPage]);

  const totalPages = Math.ceil(filteredContents.length / itemsPerPage);

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleOpen = (item = null) => {
    setEditingItem(item);
    setForm(
      item
        ? {
            title: item.title || "",
            description: item.description || "",
            category: item.category || "",
            mediaType: item.mediaType || "",
          }
        : { title: "", description: "", category: "", mediaType: "" }
    );
    setMediaFile(null);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setMediaFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const isFormValid = () => {
    return form.title.trim() && form.description.trim() && form.category && form.mediaType;
  };

  const handleSave = async () => {
    if (!isFormValid()) {
      showToast("Please fill all required fields", "warning");
      return;
    }

    setSaving(true);

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("description", form.description.trim());
      payload.append("category", form.category);
      payload.append("mediaType", form.mediaType);

      if (mediaFile) {
        payload.append("media", mediaFile);
      }

      const config = {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      };

      if (editingItem) {
        await axios.put(`${API_BASE}/${editingItem._id}`, payload, config);
        showToast("Content updated successfully");
      } else {
        await axios.post(API_BASE, payload, config);
        showToast("Content created successfully");
      }

      await fetchContents();
      handleClose();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to save content";
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    handleMenuClose();
    if (!window.confirm("Delete this content permanently?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
      setContents((prev) => prev.filter((c) => c._id !== id));
      showToast("Content deleted", "success");
    } catch (err) {
      showToast("Failed to delete content", "error");
    }
  };

  const handleMenuOpen = (event, content) => {
    setAnchorEl(event.currentTarget);
    setSelectedContent(content);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContent(null);
  };

  const getMediaIcon = (mediaType) => {
    switch (mediaType?.toLowerCase()) {
      case "video":
        return <PlayCircleOutline sx={{ fontSize: 40, color: "#8b5cf6" }} />;
      case "image":
        return <ImageIcon sx={{ fontSize: 40, color: "#8b5cf6" }} />;
      case "audio":
        return <MusicNote sx={{ fontSize: 40, color: "#8b5cf6" }} />;
      default:
        return <ImageIcon sx={{ fontSize: 40, color: "#8b5cf6" }} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: "#8b5cf6" }} />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen" sx={{ bgcolor: "transparent", p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: "white" }}>
            Your Content
            {contents.length > 0 && (
              <Chip
                label={contents.length}
                size="small"
                sx={{
                  ml: 2,
                  bgcolor: "#8b5cf6",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            )}
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            sx={{
              bgcolor: "#8b5cf6",
              "&:hover": { bgcolor: "#7c3aed" },
              px: 3,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            Create New Content
          </Button>
        </Box>

        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Search sx={{ color: "#9ca3af" }} />
          <TextField
            placeholder="Search by title, description, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              bgcolor: "rgba(31, 41, 55, 0.8)",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "#374151" },
                "&:hover fieldset": { borderColor: "#8b5cf6" },
                "&.Mui-focused fieldset": { borderColor: "#8b5cf6" },
              },
            }}
          />
        </Box>
      </Box>

      {/* Content Grid */}
      {paginatedContents.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 12,
            px: 4,
            borderRadius: 4,
            bgcolor: "rgba(31, 41, 55, 0.5)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#9ca3af", mb: 2 }}>
            {searchTerm ? "No matching content found" : "No content created yet"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            {!searchTerm && "Create your first content to get started!"}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
              mb: 4,
            }}
          >
            {paginatedContents.map((content, idx) => (
              <motion.div
                key={content._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "rgba(31, 41, 55, 0.8)",
                    border: "1px solid #374151",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                      borderColor: "#8b5cf6",
                    },
                  }}
                >
                  {/* Card Header - Media */}
                  <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                    {content.mediaUrl && content.mediaType === "image" ? (
                      <CardMedia
                        component="img"
                        image={content.mediaUrl}
                        alt={content.title}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {getMediaIcon(content.mediaType)}
                      </Box>
                    )}

                    {/* Actions Menu Button */}
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, content)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(8px)",
                        color: "white",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.9)",
                        },
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "white",
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {content.title || "Untitled"}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9ca3af",
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.6,
                      }}
                    >
                      {content.description || "No description"}
                    </Typography>

                    {/* Category & Media Type */}
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                      <Chip
                        label={content.category || "Uncategorized"}
                        size="small"
                        sx={{
                          bgcolor: "#8b5cf6",
                          color: "white",
                          textTransform: "capitalize",
                          fontWeight: 500,
                        }}
                      />
                      <Chip
                        label={content.mediaType || "unknown"}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "#6b7280",
                          color: "#9ca3af",
                          textTransform: "capitalize",
                        }}
                      />
                    </Box>

                    {/* Date */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 14, color: "#6b7280" }} />
                      <Typography variant="caption" sx={{ color: "#6b7280" }}>
                        {formatDate(content.createdAt)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#9ca3af",
                    borderColor: "#374151",
                    "&:hover": {
                      bgcolor: "rgba(139, 92, 246, 0.1)",
                      borderColor: "#8b5cf6",
                    },
                  },
                  "& .Mui-selected": {
                    bgcolor: "#8b5cf6 !important",
                    color: "white !important",
                    borderColor: "#8b5cf6",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: "#1f2937",
            border: "1px solid #374151",
            "& .MuiMenuItem-root": {
              color: "white",
              "&:hover": {
                bgcolor: "rgba(139, 92, 246, 0.1)",
              },
            },
          },
        }}
      >
        <MuiMenuItem
          onClick={() => {
            handleMenuClose();
            handleOpen(selectedContent);
          }}
        >
          <Edit sx={{ mr: 1, fontSize: 20 }} />
          Edit
        </MuiMenuItem>
        <MuiMenuItem
          onClick={() => handleDelete(selectedContent?._id)}
          sx={{ color: "#ef4444 !important" }}
        >
          <Delete sx={{ mr: 1, fontSize: 20 }} />
          Delete
        </MuiMenuItem>
      </Menu>

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1f2937",
            color: "white",
            border: "1px solid #374151",
          },
        }}
      >
        <DialogTitle sx={{ bgcolor: "#111827", borderBottom: "1px solid #374151" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingItem ? "Edit Content" : "Create New Content"}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#1f2937", pt: 3 }}>
          <Box sx={{ display: "grid", gap: 3 }}>
            <TextField
              name="title"
              label="Title *"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ sx: { color: "#9ca3af" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#8b5cf6" },
                  "&.Mui-focused fieldset": { borderColor: "#8b5cf6" },
                },
              }}
            />

            <FormControl fullWidth required>
              <InputLabel sx={{ color: "#9ca3af" }}>Category *</InputLabel>
              <Select
                name="category"
                value={form.category}
                label="Category *"
                onChange={handleChange}
                sx={{
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#8b5cf6" },
                  "&.Mui-focused fieldset": { borderColor: "#8b5cf6" },
                  "& .MuiSvgIcon-root": { color: "#9ca3af" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#1f2937",
                      "& .MuiMenuItem-root": {
                        color: "white",
                        "&:hover": { bgcolor: "rgba(139, 92, 246, 0.1)" },
                      },
                    },
                  },
                }}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel sx={{ color: "#9ca3af" }}>Media Type *</InputLabel>
              <Select
                name="mediaType"
                value={form.mediaType}
                label="Media Type *"
                onChange={handleChange}
                sx={{
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#8b5cf6" },
                  "&.Mui-focused fieldset": { borderColor: "#8b5cf6" },
                  "& .MuiSvgIcon-root": { color: "#9ca3af" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#1f2937",
                      "& .MuiMenuItem-root": {
                        color: "white",
                        "&:hover": { bgcolor: "rgba(139, 92, 246, 0.1)" },
                      },
                    },
                  },
                }}
              >
                {MEDIA_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <InputLabel sx={{ color: "#9ca3af", mb: 1 }}>Description *</InputLabel>
              <TextareaAutosize
                name="description"
                minRows={4}
                value={form.description}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "1px solid #374151",
                  background: "#111827",
                  color: "white",
                  resize: "vertical",
                }}
                required
              />
            </Box>

            <Box>
              <InputLabel sx={{ color: "#9ca3af", mb: 1 }}>
                Media File {editingItem && !mediaFile && "(leave empty to keep existing)"}
              </InputLabel>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{
                  justifyContent: "flex-start",
                  color: "white",
                  borderColor: "#374151",
                  "&:hover": {
                    borderColor: "#8b5cf6",
                    bgcolor: "rgba(139, 92, 246, 0.1)",
                  },
                }}
                fullWidth
              >
                {mediaFile ? mediaFile.name : "Upload Media (video/image/audio)"}
                <input
                  type="file"
                  hidden
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileChange}
                />
              </Button>
              {mediaFile && (
                <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#6b7280" }}>
                  {(mediaFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ bgcolor: "#111827", borderTop: "1px solid #374151", p: 2 }}>
          <Button onClick={handleClose} disabled={saving} sx={{ color: "#9ca3af" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || !isFormValid()}
            startIcon={saving ? <CircularProgress size={20} /> : null}
            sx={{
              bgcolor: "#8b5cf6",
              "&:hover": { bgcolor: "#7c3aed" },
              "&:disabled": { bgcolor: "#374151", color: "#6b7280" },
            }}
          >
            {saving ? "Saving..." : editingItem ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast({ ...toast, open: false })}
          sx={{
            bgcolor: toast.severity === "success" ? "#8b5cf6" : undefined,
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContentTab;