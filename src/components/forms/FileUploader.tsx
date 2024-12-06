import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.css";
import { FilePond, FilePondProps, registerPlugin } from "react-filepond";

registerPlugin(FilePondPluginImagePreview);

const FileUploader = ({ credits, ...others }: FilePondProps) => {
    return <FilePond credits={credits || false} {...others} />;
};

export { FileUploader };
