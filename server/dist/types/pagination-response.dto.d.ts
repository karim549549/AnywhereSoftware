export declare class PaginationResponseDto<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    constructor(data: T[], total: number, page: number, limit: number);
}
