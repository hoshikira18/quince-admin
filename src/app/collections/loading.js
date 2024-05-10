import Layout from "@/components/layout/layout";

const Loading = () => {
    return (
        <Layout>
            <div className={`flex items-center justify-center h-[80vh]`}>
                <div className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900`} />
            </div>
        </Layout>
    );
}

export default Loading;