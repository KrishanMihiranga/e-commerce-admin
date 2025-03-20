import { ProductProps } from "@/common/interfaces";
import { ApiObject } from "@/lib/utils";
import ApiService from "@/service/apiService";

export async function GetSizes() {

    const apiObject: ApiObject = {
        method: 'GET',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `size`,
        body: null,
    }
    return await ApiService.callApi(apiObject);
}

export async function GetColors() {

    const apiObject: ApiObject = {
        method: 'GET',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `colors`,
        body: null,
    }
    return await ApiService.callApi(apiObject);
}
export async function GetMainCategories() {

    const apiObject: ApiObject = {
        method: 'GET',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `categories/main`,
        body: null,
    }
    return await ApiService.callApi(apiObject);
}
export async function GetSubCategories() {

    const apiObject: ApiObject = {
        method: 'GET',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `categories/sub`,
        body: null,
    }
    return await ApiService.callApi(apiObject);
}

export async function CreateNewProduct({ data }: { data: ProductProps }) {

    const apiObject: ApiObject = {
        method: 'POST',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `stock`,
        body: data,
    }
    return await ApiService.callApi(apiObject);
}

export async function GetAllProducts() {

    const apiObject: ApiObject = {
        method: 'GET',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `stock`,
        body: null,
    }
    return await ApiService.callApi(apiObject);
}