import { supabase } from '@/supaBaseClient';
import { Loader, Plus } from 'lucide-react';
import { useState, useRef } from 'react';

const FileUploader = ({ onUpload, type }: { onUpload: (url: string) => void, type?: string }) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            await uploadFile(file);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await uploadFile(file);
        }
    };

    const uploadFile = async (file: File) => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage.from('address/Female').upload(filePath, file);
            if (error) throw error;

            const { data: urlData } = supabase.storage.from('address/Female').getPublicUrl(filePath);
            if (!urlData.publicUrl) throw new Error('Failed to get public URL');

            onUpload(urlData.publicUrl);
        } catch (error: any) {
            console.error('Error uploading file:', error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className={`border-2 border-dashed p-6 text-center rounded-md transition-all duration-300 
            ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-gray-100'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            {uploading ? (

                type === 'small' ? (
                    <Loader />
                ) : (
                    <p className="text-gray-500">Uploading...</p>
                )
            ) : type === 'small' ? (
                <div className="flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-500" />
                </div>
            ) : (
                <>
                    <p className="text-gray-600">Drag & drop an image here to upload</p>
                    <p className="text-sm text-gray-400">or click to select a file</p>
                </>
            )}

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
            />
        </div >
    );
};

export default FileUploader;
