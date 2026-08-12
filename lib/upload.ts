export type UploadedFileResult = {
    url: string;
    pubblicId: string;
    name: string;
    size: number;
    type: string;
};

export async function uploadToCloudinary(file: File): Promise<UploadedFileResult> {
    const res = await fetch("api/upload", { method: "POST" });
    if (!res.ok) throw new Error("Failed to get Cloudinary upload signature");

    const { signature, timestamp, apiKey, CloudName, folder } = await res.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);

    const cloudinaryRes = await fetch()
}