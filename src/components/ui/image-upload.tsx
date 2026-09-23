import React, { useState } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  multiple?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

export function ImageUpload({ value, onChange, multiple = false, onUploadingChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    onUploadingChange?.(true);
    setProgress(0);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary setup is incomplete.");
      setIsUploading(false);
      onUploadingChange?.(false);
      return;
    }
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, true);
          
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const currentProgress = (event.loaded / event.total) * 100;
              // For multiple files, this progress is per-file, but it's okay for basic UI feedback
              setProgress(currentProgress);
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              try {
                const response = JSON.parse(xhr.responseText);
                if (typeof response.secure_url !== "string" || !response.secure_url.startsWith("https://")) throw new Error("Invalid upload URL");
                uploadedUrls.push(response.secure_url);
                resolve();
              } catch (error) { reject(error); }
            } else {
              reject(new Error("Upload failed"));
            }
          };

          xhr.timeout = 60000;
          xhr.ontimeout = () => reject(new Error("Upload timed out"));
          xhr.onerror = () => reject(new Error("Network error"));
          xhr.send(formData);
        });
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    if (uploadedUrls.length > 0) {
      if (multiple) {
        const newValue = value ? `${value}\n${uploadedUrls.join('\n')}` : uploadedUrls.join('\n');
        onChange(newValue);
      } else {
        onChange(uploadedUrls[0]);
      }
      toast.success("Image(s) uploaded successfully");
    }

    setIsUploading(false);
    onUploadingChange?.(false);
    setProgress(0);
    // Reset file input
    e.target.value = '';
  };

  const urls = value ? value.split('\n').filter(Boolean) : [];

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center gap-4">
        <label className="relative inline-flex cursor-pointer rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
          <div className="inline-flex min-h-10 items-center justify-center px-3 py-2 transition bg-white border border-neutral-300 rounded-md hover:border-primary hover:bg-neutral-50">
            <div className="flex items-center gap-2 text-sm">
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="font-medium text-neutral-600">Uploading {Math.round(progress)}%...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-neutral-500" />
                  <span className="font-medium text-neutral-600">
                    {multiple ? "Upload images" : value ? "Change image" : "Upload image"}
                  </span>
                </>
              )}
            </div>
          </div>
          <input 
            type="file" 
            name="file_upload" 
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-wait" 
            accept="image/*" 
            multiple={multiple} 
            onChange={handleUpload} 
            disabled={isUploading}
          />
        </label>
      </div>

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {urls.map((url, index) => (
            <div key={index} className="relative group w-32 sm:w-40 shrink-0 rounded-md overflow-hidden border border-neutral-200 aspect-video">
              <img src={url} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                disabled={isUploading}
                aria-label={`Remove image ${index + 1}`}
                onClick={() => {
                  const newUrls = urls.filter((_, i) => i !== index);
                  onChange(newUrls.join('\n'));
                }}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
