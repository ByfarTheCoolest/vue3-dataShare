import { Service } from "./serve";

export function getVueTableData() {
    return Service({
        url: '/vuetable.json',
        params: {},
        method: 'get'
    })
};

export function getJsonHolder() {
    return Service({
        url: 'http://jsonplaceholder.typicode.com/posts',
        method: 'get'
    })
}