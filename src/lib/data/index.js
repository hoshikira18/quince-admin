import {medusaClient} from "@/lib/config";

export const uploadFile = async (file) => {
    const url = await medusaClient.admin.uploads
        .create(file)
        .then(({uploads}) => uploads[0].url)
        .catch((error) => {
            console.log(error);
        });
    return url;
};

export const uploadFiles = async (files) => {
    const urls = await Promise.all(
        Array.from(files).map(async (file) => {
            return await uploadFile(file);
        })
    );
    return urls;
};
