"use client";
import React from "react";
import Layout from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadFiles } from "@/lib/data";

const FileUpload = () => {
  const [files, setFiles] = React.useState([]); // [1
  const handleUpload = async () => {
    const url = await uploadFiles(files);
    console.log(url);
  };
  return (
    <Layout>
      <div className="space-y-3">
        <Input
          onChange={(e) => {
            setFiles(e.target.files);
          }}
          label="Upload Image"
          type="file"
          multiple
        />
        <Button onClick={handleUpload}>Upload</Button>
      </div>
    </Layout>
  );
};

export default FileUpload;
