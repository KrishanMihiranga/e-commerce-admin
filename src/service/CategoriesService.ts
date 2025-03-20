import { CategoryProps } from "@/common/interfaces";
import { ApiObject } from "@/lib/utils";
import ApiService from "@/service/apiService";

export async function GetCategoryByType({ type }: { type: string }) {

    const apiObject: ApiObject = {
        method: 'GET',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `categories/${type}`,
        body: null,
    }
    return await ApiService.callApi(apiObject);
}

export async function CreateCategory({ data, type }: { data: CategoryProps, type: string }) {

    const apiObject: ApiObject = {
        method: 'POST',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `categories/${type}`,
        body: data,
    }
    return await ApiService.callApi(apiObject);
}
