import { useSelector, useDispatch } from 'react-redux';
import { toggleBookmark } from "../../store/contentSlice";
import { BookmarkBorder, Bookmark, Person } from '@mui/icons-material';
import { IconButton, Avatar } from '@mui/material';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Skeleton,
  Stack,
} from '@mui/material';
import {
  PlayCircleOutline as PlayIcon,
  Image as ImageIcon,
  MusicNote as MusicIcon,
  Schedule as ClockIcon,
} from '@mui/icons-material';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 110, damping: 15 },
  },
};
export default function ContentGrid({ 
  limit = 20, 
  featuredOnly = false,
  categoryFilter = null,  // NEW
  showBookmark = true,     // NEW
  currentPage = 1,         // NEW
  itemsPerPage = 16,       // NEW
}) {

  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.content.bookmarks);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/content', { withCredentials: true })
      .then((res) => {
        let data = res.data;
        data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        if (categoryFilter && categoryFilter !== 'all') {
          data = data.filter(item => item.category === categoryFilter);
        }

        if (featuredOnly) {
          data = data.slice(0, limit || 8);
        } else {
          const startIdx = (currentPage - 1) * itemsPerPage;
          const endIdx = startIdx + itemsPerPage;
          data = data.slice(startIdx, endIdx);
        }

        setContents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load contents:', err);
        setLoading(false);
      });
  }, [featuredOnly, limit, categoryFilter, currentPage, itemsPerPage]);

  const isBookmarked = (contentId) => bookmarks.includes(contentId);

  const getMediaIcon = (mediaType) => {
    switch (mediaType?.toLowerCase()) {
      case 'video': return <PlayIcon fontSize="small" />;
      case 'image': return <ImageIcon fontSize="small" />;
      case 'audio': return <MusicIcon fontSize="small" />;
      default: return <ClockIcon fontSize="small" />;
    }
  };

   const handleBookmarkToggle = (e, contentId) => {
    e.stopPropagation();
    dispatch(toggleBookmark(contentId));
  };



  if (loading) {
    return (
      <Box sx={{ padding: '24px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {[...Array(16)].map((_, i) => (
            <Skeleton 
              key={i} 
              variant="rectangular" 
              width="100%" 
              height={340} 
              sx={{ borderRadius: 3 }} 
            />
          ))}
        </div>
      </Box>
    );
  }

  if (contents.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="h5" gutterBottom>
          No content available yet
        </Typography>
        <Typography color="text.secondary">
          Create your first content to see it here!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '30px 40px 24px 40px' }}>
      <motion.div variants={container} initial="hidden" animate="show">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {contents.map((content) => (
            <motion.div key={content._id} variants={item}>
              <Card
                onClick={() => navigate(`/content/${content._id}`)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  backgroundColor: 'background.paper',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 12,
                  },
                  cursor: 'pointer',
                }}
              >

{showBookmark && (
                  <IconButton
                    onClick={(e) => handleBookmarkToggle(e, content._id)}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 2,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(8px)',
                      color: isBookmarked(content._id) ? '#f5a623' : 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isBookmarked(content._id) ? <Bookmark /> : <BookmarkBorder />}
                  </IconButton>
                )}



                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  {content.mediaUrl && content.mediaType?.toLowerCase() === 'image' ? (
                    <CardMedia
                      component="img"
                      image={content.mediaUrl}
                      alt={content.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.8s ease',
                        '&:hover': { transform: 'scale(1.08)' },
                      }}
                      onError={(e) => (e.target.src = '/image/content-placeholder.jpg')}
                    />
                  ) : (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'grey.900',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'grey.500',
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        {getMediaIcon(content.mediaType)}
                        <Typography variant="subtitle2">
                          {content.mediaType || 'Media'}
                        </Typography>
                      </Stack>
                    </Box>
                  )}

                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      mb: 1.5,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {content.title || 'Untitled Content'}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {content.description || 'No description available'}
                  </Typography>


                   {content.author && (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>
        <Person fontSize="small" />
      </Avatar>
      <Typography variant="caption" color="text.secondary">
        {content.author.fullName || content.author.userName || 'Anonymous'}
      </Typography>
    </Box>
  )}

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={1}
                    mt="auto"
                  >
                    <Chip
                      label={content.category || 'Uncategorized'}
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                    />
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {getMediaIcon(content.mediaType)}
                      <Typography variant="caption" color="text.secondary">
                        {content.mediaType || 'unknown'}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Box>
  );
}