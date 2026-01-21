import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  Skeleton,
  Chip,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  Person,
  Category,
  CalendarToday,
  PlayCircleOutline,
  Image as ImageIcon,
  MusicNote,
} from "@mui/icons-material";

const ContentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/content/${id}`, {
          withCredentials: true,
        });
        setContent(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        navigate("/content", { replace: true });
      }
    };
    fetchContent();
  }, [id, navigate]);

  const getMediaIcon = (mediaType) => {
    switch (mediaType?.toLowerCase()) {
      case 'video': return <PlayCircleOutline />;
      case 'image': return <ImageIcon />;
      case 'audio': return <MusicNote />;
      default: return <ImageIcon />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid Date",e;
    }
  };

  if (loading) {
    return (
      <Box style={{ 
        width: '100vw', 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
        paddingTop: '96px',
        paddingBottom: '48px'
      }}>
        <Container maxWidth="lg">
          <Skeleton variant="rectangular" height={400} style={{ borderRadius: '16px', marginBottom: '24px' }} />
          <Skeleton height={60} width="60%" style={{ marginBottom: '16px' }} />
          <Skeleton height={100} />
        </Container>
      </Box>
    );
  }

  if (!content) return null;

  return (
    <Box style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      paddingTop: '96px',
      paddingBottom: '48px'
    }}>
      <Container maxWidth="lg">
      
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
          style={{ marginBottom: '24px' }}
          variant="outlined"
        >
          Back to Content
        </Button>

  
        <Box style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
      
          {content.mediaUrl && content.mediaType === 'image' ? (
            <Box style={{ 
              width: '100%', 
              height: '500px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={content.mediaUrl}
                alt={content.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = '/image/content-placeholder.jpg';
                }}
              />
              <Box style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                padding: '40px',
              }}>
                <Chip
                  icon={getMediaIcon(content.mediaType)}
                  label={content.mediaType}
                  style={{ 
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Box style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '16px',
              color: 'white'
            }}>
              {getMediaIcon(content.mediaType)}
              <Typography variant="h5">
                {content.mediaType || 'Media'} Content
              </Typography>
            </Box>
          )}

     
          <Box style={{ padding: '40px' }}>
   
            <Box style={{ marginBottom: '24px' }}>
              <Typography variant="h3" style={{ 
                fontWeight: 700, 
                color: '#1e293b',
                marginBottom: '16px'
              }}>
                {content.title || "Untitled Content"}
              </Typography>
              
              <Box style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {content.category && (
                  <Chip
                    icon={<Category />}
                    label={content.category.charAt(0).toUpperCase() + content.category.slice(1)}
                    color="primary"
                    variant="outlined"
                  />
                )}
                {content.mediaType && (
                  <Chip
                    icon={getMediaIcon(content.mediaType)}
                    label={content.mediaType}
                    color="secondary"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>

            <Box style={{ 
              marginBottom: '32px',
              padding: '24px',
              background: '#f8fafc',
              borderRadius: '12px',
              borderLeft: '4px solid #3b82f6'
            }}>
              <Typography variant="h6" style={{ 
                marginBottom: '12px', 
                fontWeight: 600,
                color: '#475569'
              }}>
                Description
              </Typography>
              <Typography variant="body1" style={{ 
                color: '#64748b',
                lineHeight: 1.8,
                whiteSpace: 'pre-line'
              }}>
                {content.description || "No description available"}
              </Typography>
            </Box>

         
            <Box style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
             
              {content.author && (
                <Box style={{
                  padding: '20px',
                  background: '#f1f5f9',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Avatar style={{ background: '#3b82f6' }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" style={{ color: '#64748b' }}>
                      Author
                    </Typography>
                    <Typography variant="body1" style={{ fontWeight: 600, color: '#1e293b' }}>
                      {content.author.fullName || content.author.userName || 'Unknown Author'}
                    </Typography>
                  </Box>
                </Box>
              )}

           
              <Box style={{
                padding: '20px',
                background: '#fef3c7',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Avatar style={{ background: '#f59e0b' }}>
                  <CalendarToday />
                </Avatar>
                <Box>
                  <Typography variant="caption" style={{ color: '#92400e' }}>
                    Published
                  </Typography>
                  <Typography variant="body1" style={{ fontWeight: 600, color: '#78350f' }}>
                    {formatDate(content.createdAt)}
                  </Typography>
                </Box>
              </Box>

              {content.updatedAt && content.updatedAt !== content.createdAt && (
                <Box style={{
                  padding: '20px',
                  background: '#dbeafe',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Avatar style={{ background: '#2563eb' }}>
                    <CalendarToday />
                  </Avatar>
                  <Box>
                    <Typography variant="caption" style={{ color: '#1e3a8a' }}>
                      Last Updated
                    </Typography>
                    <Typography variant="body1" style={{ fontWeight: 600, color: '#1e40af' }}>
                      {formatDate(content.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

          
            {content.mediaUrl && content.mediaType !== 'image' && (
              <Box style={{
                padding: '20px',
                background: '#f0fdf4',
                borderRadius: '12px',
                border: '1px solid #86efac'
              }}>
                <Typography variant="body2" style={{ color: '#166534', marginBottom: '8px' }}>
                  Media File Available
                </Typography>
                <Button
                  variant="contained"
                  href={content.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: '#16a34a' }}
                >
                  View/Download Media
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContentDetails;