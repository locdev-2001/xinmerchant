export interface IDataPaginate<T>{
    data: T[];
    paginate: {
        page: number;
        limit: number;
        totalRecords: number;
        totalPages: number;
    }
}