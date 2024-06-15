export class FileUpload {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    size: number
    filename: string
    path: string
    constructor(obj: FileUpload) {
        this.fieldname= obj?.fieldname || "";
        this.originalname = obj?.originalname || "";
        this.encoding = obj?.encoding || "";
        this.mimetype = obj?.mimetype || "";
        this.size = obj?.size || 0
        this.filename = obj?.filename || ""
        this.path = obj?.path || ""
    }
}

export class FileUploadDTO {
    public_id: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    url: string;
    original_filename: string;
  
    constructor(obj?: any) {
      this.public_id = obj?.public_id || "";
      this.width = obj?.width || 0;
      this.height = obj?.height || 0;
      this.format = obj?.format || "";
      this.resource_type = obj?.resource_type || "";
      this.created_at = obj?.created_at || "";
      this.bytes = obj?.bytes || 0;
      this.url = obj?.url || "";
      this.original_filename = obj?.original_filename || "";
    }
  }