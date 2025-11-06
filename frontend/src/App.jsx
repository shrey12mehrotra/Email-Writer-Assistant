
import { useState } from 'react'
import './App.css'
import { Container, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion'; 

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try{
      // const response = await axios.post("http://localhost:8080/api/email/generate", {
      const response = await axios.post("https://email-writer-assistant-s3kc.onrender.com/api/email/generate", {
        emailContent, tone
      });
      setGeneratedResponse(response.data); 
      // setGeneratedResponse(typeof response === 'string' ? response.data : JSON.stringify(response.data));
    } catch(error) {
        setError('Failed to generate e-mail reply. Please try again. ');
        console.error(error); 
    } finally{
      setLoading(false);
    }
  };

  return (
    <Container 
    maxWidth="md"
      sx={{
        py: 3, 
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
      }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
      <Typography variant='h3' component="h1" gutterBottom align="center" className="gradient-text">
        E-mail Reply Generator 
      </Typography>
      </motion.div>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 700,
          borderRadius: 4,
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.9)',
          mx: 'auto'
        }}
      >
        {/* Fade animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
      
        <TextField
          fullWidth
          multiline
          minRows={5}
          rows={8}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb:3}}
        />

        <FormControl fullWidth sx={{mb:3}}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="crisp">Crisp</MenuItem>
              <MenuItem value="sarcastic">Sarcastic</MenuItem>

          </Select>
        </FormControl>

        <motion.div whileHover={{ scale: 1.03 }}> 
        <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={!emailContent || loading}
        fullWidth
         sx={{
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: '12px', 
              }}>
          {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" /> {/* spinner visible */}
                Generating Reply...
              </Box>
            ) : "Generate Reply"}
        </Button>
         </motion.div>
        </motion.div>

     

      {error && (
        <Typography 
        color="error"
            sx={{
              mt: 2,
              textAlign: 'center',
              fontWeight: 'medium',
            }}>
          {error}
        </Typography>

      )}

      {generatedResponse && (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
        <Box sx={{mt:4}}>
          <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
            Generated Reply:
          </Typography>

          <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                }}
              >
          <TextField
            fullWidth
            multiline
            rows={8}
            variant='outlined'
            value={generatedResponse || ''}
            InputProps={{
              readOnly:true, 
              disableUnderline: true,
              style: { whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#333' }}}
          />
          </Paper>
          <Box sx={{  display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Button
          variant='outlined'
          sx={{
                  mt: 2,
                  borderRadius: 2,
                  fontWeight: '600',
                  textTransform: 'none',
                }}
          onClick={
            () => {navigator.clipboard.writeText(generatedResponse);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            }}>
            Copy to Clipboard
          </Button>
          
          {/* Smooth fading 'Copied!' text */}
          <motion.div
             initial={{ opacity: 0, y: 10 }} // starts slightly below
             animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : 10 }} // moves up to align
             transition={{ duration: 0.4, ease: 'easeOut' }} //  upward motion
             style={{
                color: '#5276eaff',
                fontWeight: 600,
                fontSize: '0.9rem',
                position: 'relative',
                marginTop: '2px', 
            }}
          >
            Copied!
          </motion.div>
          </Box>
        </Box>
          </motion.div>
      )}
       </Paper>
    </Container>
  )
}

export default App
