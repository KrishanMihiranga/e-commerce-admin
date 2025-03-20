import { ColorProps } from "@/common/interfaces";
import { ApiObject } from "@/lib/utils";
import ApiService from "@/service/apiService";

export async function CreateNewColor({data}:{data: ColorProps}) {

    const apiObject: ApiObject = {
        method: 'POST',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `colors`,
        body: data,
    }
    return await ApiService.callApi(apiObject);
}
