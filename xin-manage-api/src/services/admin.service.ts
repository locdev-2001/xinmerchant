import { Admin, AdminDTO, AdminModel, IAdmin } from "@models/admin.model";
import bcrypt from "bcrypt";
import JwtService from "./vendors/jwt.service";
import { AppError } from "@models/error";
import { StatusCodes } from "http-status-codes";
import ManageLogService from "./mange-log.service";
import { RolePermission } from "@utils/role-permission";

export default class AdminService {
  private jwtService = new JwtService();
  private manageLogService = new ManageLogService();

  async createSuperAdmin(admin: IAdmin) {
    let newAdmin = new Admin(admin);
    newAdmin.preCreate();

    newAdmin.password = bcrypt.hashSync(
      newAdmin.password,
      bcrypt.genSaltSync(10)
    );
    newAdmin.role = "super_admin";

    let result = await AdminModel.create(newAdmin);
    return new AdminDTO(result);
  }

  async login(params: { email: string; password: string }) {
    let admin = await AdminModel.findOne({
      email: params.email,
    });

    if (!admin) {
      throw new AppError({
        message: "Invalid password",
        statusCode: StatusCodes.BAD_REQUEST,
        detail: "",
        where: "AdminService.login",
      });
    }

    if (!bcrypt.compareSync(params.password, admin.password)) {
      throw new AppError({
        message: "Invalid password",
        statusCode: StatusCodes.BAD_REQUEST,
        detail: "",
        where: "AdminService.login",
      });
    }

    let data = new AdminDTO(admin);

    return {
      data,
      accessToken: this.jwtService.generateAccessToken({
        id: data?.id || "",
        email: data.email,
      }),
    };
  }

  async create({ data, adminId }: { data: IAdmin; adminId: string }) {
    let newAdmin = new Admin(data);
    newAdmin.preCreate();

    newAdmin.password = bcrypt.hashSync(
      newAdmin.password,
      bcrypt.genSaltSync(10)
    );

    let result = await AdminModel.create(newAdmin);

    await this.manageLogService.create({
      adminId,
      data: {},
      newData: new AdminDTO(result),
      action: "create_admin_account",
    });

    return new AdminDTO(result);
  }

  async updateById({
    adminId,
    id,
    data,
  }: {
    id: string;
    data: any;
    adminId: string;
  }) {
    let admin = await AdminModel.findById(id);
    if (!admin) {
      throw new AppError({
        message: "ID không tồn tại",
        statusCode: StatusCodes.NOT_FOUND,
        detail: "",
        where: "AdminService.updateById",
      });
    }

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
    }

    let result = await AdminModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    await this.manageLogService.create({
      adminId,
      data: new AdminDTO(admin as any),
      newData: new AdminDTO(result as any),
      action: "update_admin_account",
    });

    return new AdminDTO(result as any);
  }

  async deleteById({ id, adminId }: { id: string; adminId: string }) {
    let admin = await AdminModel.findById(id);
    if (!admin) {
      throw new AppError({
        message: "ID không tồn tại",
        statusCode: StatusCodes.NOT_FOUND,
        detail: "",
        where: "AdminService.deleteById",
      });
    }

    let result = await AdminModel.findByIdAndDelete(id);

    await this.manageLogService.create({
      adminId,
      data: new AdminDTO(admin as any),
      newData: new AdminDTO(result as any),
      action: "delete_admin_account",
    });

    return new AdminDTO(result as any);
  }

  async list({
    paginate,
  }: {
    paginate: {
      page: number;
      limit: number;
    };
  }) {
    let data = await AdminModel.find({
      role: { $ne: "super_admin" },
    })
      .sort({ createdAt: -1 })
      .skip(paginate.limit * (paginate.page - 1))
      .limit(paginate.limit);

    let totalRecords = await AdminModel.countDocuments()

    return {
      data: data.map((item) => new AdminDTO(item)),
      paginate:{
        page: paginate.page,
        limit: paginate.limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / paginate.limit)
      }
    }
  }

  async getById({ id }: { id: string }) {
    let admin = await AdminModel.findById(id);
    if (!admin) {
      throw new AppError({
        message: "ID không tồn tại",
        statusCode: StatusCodes.NOT_FOUND,
        detail: "",
        where: "AdminService.getById",
      });
    }

    return new AdminDTO(admin);
  }

  async getProfile(admin: IAdmin){
    let permissions = RolePermission[admin.role]
    return {...new AdminDTO(admin), permissions}
  }
}
