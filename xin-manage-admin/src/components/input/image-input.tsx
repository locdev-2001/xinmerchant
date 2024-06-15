import { Button, Image as ImageAntd, Upload } from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";

interface Props {
  onChange: (file: File) => void;
  src?: string;
  onRemove?: () => void;
  aspect: number;
  width: number;
  imageFile: File;
}

export default function ImageInput(props: Props) {
  const [imagePreview, setImagePreview] = useState(props.src);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [onModalCancel, setOnModalCancel] = useState(false);

  const onChange: UploadProps["onChange"] = async ({ file, fileList }) => {
    if (file?.status == "uploading" || file?.status == "done") {
      let src: string = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
      setImagePreview(src);
      props.onChange(file.originFileObj);
      setFiles(fileList);
    }
  };

  useEffect(() => {
    if (!props.imageFile) {
      setImagePreview("");
    }
  }, [props.imageFile]);

  useEffect(() => {
    if (props.src && !props.imageFile) {
      setImagePreview(props.src);
    } else if (props.imageFile) {
      (async () => {
        let src: string = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(props.imageFile);
          reader.onload = () => resolve(reader?.result as string);
        });
        setImagePreview(src);
      })();
    }else{
      setImagePreview("");
    }
  }, [props.src, props.imageFile]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const clear = async () => {
    setImagePreview("");
    props.onChange(null);
    setFiles([]);
  };

  useEffect(() => {
    if (onModalCancel) {
      clear();
    }
  }, [onModalCancel, imagePreview]);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div
            className=""
            style={{
              position: "relative",
            }}
          >
            <ImgCrop
              quality={1}
              aspect={props.aspect || 1 / 1}
              onModalCancel={() => {
                setOnModalCancel(true);
              }}
            >
              <Upload
                accept="image/*"
                customRequest={(res) => {
                  setTimeout(() => {
                    res.onSuccess("ok");
                  }, 300);
                }}
                fileList={files}
                onChange={onChange}
                onPreview={onPreview}
                maxCount={1}
                disabled={!!imagePreview}
              >
                {imagePreview ? (
                  <ImageAntd
                    preview={false}
                    style={{
                      aspectRatio: props.aspect || 1 / 1,
                      // width: props.width
                    }}
                    src={imagePreview}
                    width={props.width}
                  />
                ) : (
                  <div
                    className="bg-gray-100 border flex justify-center items-center"
                    style={{ aspectRatio: props.aspect, width: props.width }}
                  >
                    <span
                      className="text-gray-400"
                      style={{ transform: "scale(6)" }}
                    >
                      <i className="fa-light fa-image"></i>
                    </span>
                  </div>
                )}
              </Upload>
            </ImgCrop>

            {imagePreview && (
              <div className="mt-2">
                <Button danger onClick={clear}>
                  Xoá
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ant-upload.ant-upload-select-picture-card {
          width: 100%;
          height: 300px;
        }
        // .reactEasyCrop_CropArea{
        //     width: 100% !important;
        // }
      `}</style>
    </>
  );
}
