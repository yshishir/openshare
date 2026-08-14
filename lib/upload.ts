export type UploadedFileResult = {
    url: string;
    publicId: string;
    name: string;
    size: number;
    type: string;
};

export async function uploadToCloudinary(file: File): Promise<UploadedFileResult> {
    const res = await fetch("api/upload", { method: "POST" });
    if (!res.ok) throw new Error("Failed to get Cloudinary upload signature");

    const { signature, timestamp, apiKey, cloudName, folder } = await res.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
            method: "POST",
            body: formData,
        }
    );
    if(!cloudinaryRes.ok) {
        throw new Error("Failed to upload file(s) to Cloudinary");
    }

    const data = await cloudinaryRes.json();

    return {
        url: data.secure_url,
        publicId: data.public_id,
        name: file.name,
        size: file.size,
        type:file.type,
    };
}