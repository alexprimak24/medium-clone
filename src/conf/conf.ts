const conf = {
  appwriteUrl: process.env.REACT_APP_APPWRITE_URL as string,
  appwriteProjectId: process.env.REACT_APP_APPWRITE_PROJECT_ID as string,
  appwriteDatabaseId: process.env.REACT_APP_APPWRITE_DATABASE_ID as string,
  appwriteCollectionIdPublication: process.env
    .REACT_APP_APPWRITE_COLLECTION_PUBLICATION as string,
  appwriteBucketId: process.env.REACT_APP_APPWRITE_BUCKET_ID as string,
};

export default conf;
