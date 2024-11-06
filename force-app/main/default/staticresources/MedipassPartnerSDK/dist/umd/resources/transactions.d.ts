export declare function downloadPDF(options: Record<string, any>, requestOptions?: Record<string, any>, { suppressLocalDownload }?: {
    suppressLocalDownload?: boolean | undefined;
}): Promise<Blob>;
export declare function getPaymentReport(options: Record<string, any>, requestOptions?: Record<string, any>): Promise<Record<string, any>>;
export declare function getProcessingReport(options: any, requestOptions: any): Promise<Record<string, any>>;
export declare function getBusinessTransaction(options: Record<string, any>, requestOptions?: any): Promise<Record<string, any>>;
export declare function getTransactionDetailsURL(options: any, requestOptions: any): Promise<{
    url: string;
}>;
export declare function getPaymentLink(options: Record<string, any>, requestOptions?: Record<string, any>): Promise<any>;
export declare function cancelBusinessTransaction(options: Record<string, any>, requestOptions?: Record<string, any>): Promise<Record<string, any>>;
export declare function getTransactionCancelReasons(options: Record<string, any>, requestOptions?: Record<string, any>): Promise<import("@medipass/web-sdk").GetBusinessMessageMappingsResponse>;
