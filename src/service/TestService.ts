import { ApiObject } from "@/lib/utils";
import ApiService from "@/service/apiService";
export async function TestHealth() {

    const apiObject: ApiObject = {
        method: 'GET',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `order`,
        body: null,
    }
    return await ApiService.callApi(apiObject);
}