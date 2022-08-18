import axios from 'axios';

// register - username, password, email
export function registerUser(userInfo) {
    return axios.post('/user/register', userInfo);
}

// login - username, password
export function login(userInfo) {
    return axios.post('/user/login', userInfo);
}

// log table data - log type, paging data
export function getLogTableData(pageInfo) {
    return axios.get('/log/table', { params: pageInfo });
}

// log chart data
export function getLogChartWidgetData() {
    return axios.get('/log/chart');
}

// metric table data - metric type, paging data
export function getMetricTableData(pageInfo) {
    return axios.get('/metric/table', { params: pageInfo });
}

// metric chart data - chart type, timestamp, metrics type
export function getMetricChartWidgetData(resourceType) {
    return axios.get('/metric/chart', {params: resourceType});
}

