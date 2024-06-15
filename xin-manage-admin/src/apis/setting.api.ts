import { IRate } from "src/models/rate.model"
import { axiosClient } from "./axios-client"

const path = {
    updateRateByName: '/v1/rate/name',
    getRateByName: '/v1/rate/name',
}

const getRateByName = (name: string) => {
    return axiosClient<IRate>({
        url: path.getRateByName,
        method: 'GET',
        params: {
            name
        }
    })
}

const updateRateByName = (name: string, rate: number) => {
    return axiosClient<IRate>({
        url: path.updateRateByName,
        method: 'PUT',
        data: {
            name,
            rate
        }
    })
}

export const settingApi = {
    getRateByName,
    updateRateByName,
}