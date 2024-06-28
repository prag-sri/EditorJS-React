// src/components/EditorComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { Button, Grid, Typography, CircularProgress, Box } from '@mui/material';

interface EditorProps {
  onSave: (data: any) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ onSave }) => {
  const editorInstance = useRef<EditorJS | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeEditor = async () => {
      try {
        const editor = new EditorJS({
          holder: 'editorjs-container',
          tools: {
            header: Header,
            list: List,
            // Add other tools here as needed
          },
          onChange: () => {
            editor.save().then((outputData) => {
              onSave(outputData);
            }).catch((error) => {
              console.error('Error saving data:', error);
            });
          },
        });

        editorInstance.current = editor;
        setLoading(false);
        console.log('EditorJS initialized:', editorInstance.current);
      } catch (error) {
        setError('Error initializing EditorJS');
        console.error('Error initializing EditorJS:', error);
      }
    };

    initializeEditor();

    return () => {
      if (editorInstance.current) {
        console.log('Cleaning up EditorJS instance');
        try {
          editorInstance.current.destroy();
        } catch (error) {
          console.error('Error destroying EditorJS instance:', error);
        } finally {
          editorInstance.current = null;
        }
      }
    };
  }, [onSave]);

  const handleSaveClick = () => {
    editorInstance.current?.save().then((outputData) => {
      onSave(outputData);
    }).catch((error) => {
      console.error('Error saving data:', error);
    });
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Editor.js</Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <div id="editorjs-container" style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}></div>
        )}
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={loading}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditorComponent;
