// FileUpload.js

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import fileService from '../../services/fileService'; // Adjust the path as necessary

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }
    try {
      const response = await fileService.uploadFile(file);
      setMessage(`File uploaded successfully: ${response.data.fileUrl}`);
    } catch (err) {
      console.error(err);
      setMessage('Failed to upload file');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Upload File</h1>
          {/* <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.File
                id="fileUpload"
                label="Choose file"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Form> */}
          {message && <p>{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload; 
