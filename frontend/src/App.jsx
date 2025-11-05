
import { useState } from 'react'
import './App.css'
import { Container, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import axios from 'axios';


function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        E-mail Reply Generator 
      </Typography>

      <Box sx={{mx:3}}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb:2}}
        />

        <FormControl fullWidth sx={{mb:2}}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label={"Tone (Optional)"}
            onChange={(e) => setTone(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>

          </Select>
        </FormControl>

        <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={!emailContent || loading}
        fullWidth>
          {loading ? <CircularProgress size={24}/> : "Generate Reply"}
        </Button>

      </Box>

      {error && (
        <Typography color='error'sx={{mb:2}}>
          {error}
        </Typography>

      )}

      {generatedResponse && (
        <Box sx={{mt:2}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply:
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={8}
            variant='outlined'
            value={generatedResponse || ''}
            InputProps={{
              readOnly:true, 
              style: { whiteSpace: 'pre-wrap', lineHeight: 1.6 }}}
          />

          <Button
          variant='outlined'
          sx={{mt:2}}
          onClick={() => navigator.clipboard.writeText(generatedResponse)}>
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default App
