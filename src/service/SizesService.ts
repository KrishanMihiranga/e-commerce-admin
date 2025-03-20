import { SizeProps } from "@/common/interfaces";
import { ApiObject } from "@/lib/utils";
import ApiService from "@/service/apiService";

export async function CreateNewSize({data}:{data: SizeProps}) {

    const apiObject: ApiObject = {
        method: 'POST',
        authentication: false,
        urlencoded: false,
        isWithoutPrefix: false,
        endpoint: `size`,
        body: data,
    }
    return await ApiService.callApi(apiObject);
}
