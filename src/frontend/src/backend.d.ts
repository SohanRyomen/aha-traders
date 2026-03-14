import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    productInterest: Product;
    phone: string;
}
export enum Product {
    driedGinger = "driedGinger",
    pickles = "pickles",
    driedVegetables = "driedVegetables",
    driedGreenChillyPowder = "driedGreenChillyPowder"
}
export interface backendInterface {
    adminGetAllInquiries(): Promise<Array<Inquiry>>;
    adminGetInquiriesByProduct(product: Product): Promise<Array<Inquiry>>;
    getProductList(): Promise<Array<Product>>;
    submitInquiry(name: string, email: string, phone: string, message: string, productInterest: Product): Promise<void>;
}
